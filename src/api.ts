import { generateID } from './utils'
import { ApiEndpoint, ApiMessage, ApiError, VTubeStudioError } from './types'

type EndpointCall<T extends ApiEndpoint<any, any, any>> = T extends ApiEndpoint<infer _, infer Request, infer Response> ?
    ({} extends Request ?
        ({} extends Response ?
            () => Promise<void> :
            () => Promise<Response>) :
        ({} extends Response ?
            (data: Request) => Promise<void> :
            (data: Request) => Promise<Response>)) :
    never

export type MessageHandler<T extends ApiMessage<any, any> = ApiMessage<any, any>> = (msg: T) => void

export interface MessageBus {
    send: <T extends ApiMessage<any, any>>(msg: T) => void
    on: (handler: MessageHandler) => void
    off: (handler: MessageHandler) => void
}

function makeRequestMsg<T extends ApiEndpoint<any, any, any>>(type: T['Type'], requestID: string, data: T['Request']['data']): T['Request'] {
    return {
        apiName: 'VTubeStudioPublicAPI',
        apiVersion: '1.0',
        messageType: `${type}Request` as T['Request']['messageType'],
        requestID,
        data,
    }
}

function makeResponseMsg<T extends ApiEndpoint<any, any, any>>(type: T['Type'], requestID: string, data: T['Response']['data']): T['Response'] {
    return {
        apiName: 'VTubeStudioPublicAPI',
        apiVersion: '1.0',
        timestamp: Date.now(),
        messageType: `${type}Response` as T['Response']['messageType'],
        requestID,
        data,
    }
}

function makeErrorMsg(requestID: string, data: ApiError['data']): ApiError {
    return {
        apiName: 'VTubeStudioPublicAPI',
        apiVersion: '1.0',
        timestamp: Date.now(),
        messageType: 'APIError',
        requestID,
        data,
    }
}

function msgIsRequest<T extends ApiEndpoint<any, any, any>>(msg: ApiMessage<any, any>, type: T['Type']): msg is T['Request'] {
    return msg.messageType === `${type}Request`
}

function msgIsResponse<T extends ApiEndpoint<any, any, any>>(msg: ApiMessage<any, any>, type: T['Type']): msg is T['Response'] {
    return msg.messageType === `${type}Response`
}

function msgIsError(msg: ApiMessage<any, any>): msg is ApiError {
    return msg.messageType === 'APIError'
}

/** @internal */
export function createClientCall<T extends ApiEndpoint<any, any, any>>(bus: MessageBus, type: T['Type']): EndpointCall<T> {
    return ((data: T['Request']['data']) => new Promise<T['Response']['data']>((resolve, reject) => {
        const requestID = generateID(16)
        const handler = (msg: ApiMessage<any, any>) => {
            if (msg.requestID === requestID) {
                bus.off(handler)
                clearTimeout(timeout)
                if (msgIsResponse<T>(msg, type))
                    resolve(msg.data ?? {})
                else if (msgIsError(msg))
                    reject(new VTubeStudioError(msg.data ?? {}, requestID))
            }
        }
        const timeout = setTimeout(() => {
            bus.off(handler)
            reject(new VTubeStudioError({ errorID: -1, message: 'The request timed out.' }, requestID))
        }, 5000)
        bus.on(handler)
        bus.send(makeRequestMsg(type, requestID, data ?? {}))
    })) as EndpointCall<T>
}

/** @internal */
export function createServerHandler<T extends ApiEndpoint<any, any, any>>(bus: MessageBus, type: T['Type'], handler: EndpointCall<T>): MessageHandler {
    return async msg => {
        if (msgIsRequest<T>(msg, type)) {
            try {
                const response = await (handler as any)(msg.data)
                bus.send(makeResponseMsg(type, msg.requestID, response))
            } catch (e) {
                if (e instanceof VTubeStudioError) {
                    bus.send(makeErrorMsg(msg.requestID, e.data))
                } else {
                    bus.send(makeErrorMsg(msg.requestID, { errorID: -1, message: String(e) }))
                }
            }
        }
    }
}

interface IWebSocketLike {
    send(data: string): void
    addEventListener(type: 'message', handler: (event: { data: any }) => void): void
}

export function createWebsocketBus(ws: IWebSocketLike): MessageBus {
    const handlers: MessageHandler[] = []

    const bus: MessageBus = {
        on: handler => handlers.push(handler),
        off: handler => handlers.splice(handlers.findIndex(h => h === handler), 1),
        send: msg => ws.send(JSON.stringify(msg)),
    }

    ws.addEventListener('message', e => {
        const msg = JSON.parse(e.data)
        for (const handler of [...handlers]) handler(msg)
    })

    return bus
}
