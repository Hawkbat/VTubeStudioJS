import { generateID } from './utils'
import { IApiEndpoint, IApiMessage, IApiError, VTubeStudioError, ErrorCode } from './types'

type EndpointCall<T extends IApiEndpoint<any, any, any>> = T extends IApiEndpoint<infer _, infer Request, infer Response> ?
    ({} extends Request ?
        ({} extends Response ?
            (data: void, config?: IClientCallConfig) => Promise<void> :
            (data: void, config?: IClientCallConfig) => Promise<Response>) :
        ({} extends Response ?
            (data: Request, config?: IClientCallConfig) => Promise<void> :
            (data: Request, config?: IClientCallConfig) => Promise<Response>)) :
    never

interface MessageHandler<T extends IApiMessage<any, any> = IApiMessage<any, any>> {
    (msg: T): void
    context?: {
        timeout: number
        reject: (reason?: any) => void
        requestID: string
    }
}

function makeRequestMsg<T extends IApiEndpoint<any, any, any>>(type: T['Type'], requestID: string, data: T['Request']['data']): T['Request'] {
    return {
        apiName: 'VTubeStudioPublicAPI',
        apiVersion: '1.0',
        messageType: `${type}Request` as T['Request']['messageType'],
        requestID,
        data,
    }
}

function msgIsResponse<T extends IApiEndpoint<any, any, any>>(msg: IApiMessage<any, any>, type: T['Type']): msg is T['Response'] {
    return msg.messageType === `${type}Response`
}

function msgIsError(msg: IApiMessage<any, any>): msg is IApiError {
    return msg.messageType === 'APIError'
}

export interface IClientCallConfig {
    /** Controls the number of milliseconds allowed to elapse without a response before the API considers the call to have failed. */
    timeout?: number
}

/** @internal */
export function createClientCall<T extends IApiEndpoint<any, any, any>>(bus: IMessageBus, type: T['Type'], defaultTimeout: number = 5000): EndpointCall<T> {
    return ((data: T['Request']['data'], config?: IClientCallConfig) => new Promise<T['Response']['data']>((resolve, reject) => {
        const requestID = generateID(16)
        const handler: MessageHandler = msg => {
            if (msg.requestID === requestID) {
                bus.off(handler)
                clearTimeout((handler.context as { timeout: number }).timeout)
                if (msgIsResponse<T>(msg, type))
                    resolve(msg.data ?? {})
                else if (msgIsError(msg))
                    reject(new VTubeStudioError(msg.data ?? {}, requestID))
            }
        }
        handler.context = {
            timeout: setTimeout(() => {
                bus.off(handler)
                reject(new VTubeStudioError({ errorID: ErrorCode.InternalClientError, message: 'The request timed out.' }, requestID))
            }, config?.timeout ?? defaultTimeout),
            reject,
            requestID,
        }
        bus.on(handler)
        bus.send(makeRequestMsg(type, requestID, data ?? {}))
    })) as EndpointCall<T>
}

export interface IMessageBus {
    send: <T extends IApiMessage<any, any>>(msg: T) => void
    receive: <T extends IApiMessage<any, any>>(msg: T) => void
    on: (handler: MessageHandler) => void
    off: (handler: MessageHandler) => void
}

/** @internal */
export interface IWebSocketLike {
    send(data: string): void
    addEventListener(type: 'message' | 'close' | 'error', handler: (event: { data: any }) => void): void
}

abstract class MessageBusBase implements IMessageBus {
    protected handlers: MessageHandler[] = []

    on(handler: MessageHandler<IApiMessage<any, any>>): void {
        this.handlers.push(handler)
    }

    off(handler: MessageHandler<IApiMessage<any, any>>): void {
        this.handlers.splice(this.handlers.findIndex(h => h === handler), 1)
    }

    receive<T extends IApiMessage<any, any>>(msg: T): void {
        for (const handler of [...this.handlers]) handler(msg)
    }

    abstract send<T extends IApiMessage<any, any>>(msg: T): void
}

export class WebSocketBus extends MessageBusBase {
    protected isClosed: boolean = false

    constructor(private webSocket: IWebSocketLike) {
        super()
        webSocket.addEventListener('message', e => {
            const msg = JSON.parse(e.data)
            this.receive(msg)
        })
        webSocket.addEventListener('close', () => {
            this.close()
        })
        webSocket.addEventListener('error', (e) => {
            this.throwException((requestID: string) => new VTubeStudioError({ errorID: ErrorCode.MessageBusError, message: `Message bus error: ${e}` }, requestID, e))
        })
    }

    override on(handler: MessageHandler<IApiMessage<any, any>>): void {
        if (this.isClosed) return
        return super.on(handler)
    }

    override off(handler: MessageHandler<IApiMessage<any, any>>): void {
        if (this.isClosed) return
        return super.off(handler)
    }

    override receive<T extends IApiMessage<any, any>>(msg: T): void {
        if (this.isClosed) return
        return super.receive(msg)
    }

    send<T extends IApiMessage<any, any>>(msg: T): void {
        if (this.isClosed) return
        this.webSocket.send(JSON.stringify(msg))
    }

    close() {
        this.throwException((requestID: string) => new VTubeStudioError({ errorID: ErrorCode.MessageBusClosed, message: 'Message bus closed.' }, requestID))
        this.isClosed = true
    }

    protected throwException(errorSupplier: (requestID: string) => unknown) {
        for (const handler of [...this.handlers]) {
            if (handler.context !== undefined) {
                clearTimeout(handler.context.timeout)
                handler.context.reject(errorSupplier(handler.context.requestID))
            }
        }
        this.handlers = []
    }
}
