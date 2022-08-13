import { ErrorCode } from './types'

export class VTubeStudioError extends Error {

    constructor(public readonly data: Readonly<IApiError['data']>, public readonly requestID: string) {
        super(`${data.message} (Error Code: ${data.errorID} ${ErrorCode[data.errorID] ?? ErrorCode.Unknown}) (Request ID: ${requestID})`)
        this.name = this.constructor.name
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export interface IApiMessage<Type extends string, Data extends object> {
    apiName: 'VTubeStudioPublicAPI'
    apiVersion: `${number}.${number}`
    timestamp: number
    requestID: string
    messageType: Type
    data: Data
}

export interface IApiRequest<Type extends string, Data extends object> extends IApiMessage<`${Type}Request`, Data> { }

export interface IApiResponse<Type extends string, Data extends object> extends IApiMessage<`${Type}Response`, Data> { }

export interface IApiEventMessage<Type extends string, Data extends object> extends IApiMessage<`${Type}`, Data> { }

export interface IApiError extends IApiMessage<'APIError', {
    errorID: ErrorCode
    message: string
}> { }

export interface IApiEndpoint<Type extends string, Request extends object, Response extends object> {
    Type: Type
    Request: IApiRequest<Type, Request>
    Response: IApiResponse<Type, Response>
}

export interface IApiEvent<Type extends string, Config extends object, EventData extends object> {
    Type: Type
    Config: Config
    Event: IApiEventMessage<Type, EventData>
}

export type EndpointCall<T extends IApiEndpoint<any, any, any>> = T extends IApiEndpoint<infer _, infer Request, infer Response>
    ? (
        {} extends Request
        ? (
            {} extends Response
            ? (data?: undefined, config?: IClientCallConfig) => Promise<void>
            : (data?: undefined, config?: IClientCallConfig) => Promise<Response>
        )
        : (
            {} extends Response
            ? (data: Request, config?: IClientCallConfig) => Promise<void>
            : (data: Request, config?: IClientCallConfig) => Promise<Response>
        )
    )
    : never

export type EventSubscribeCall<T extends IApiEvent<any, any, any>> = T extends IApiEvent<infer _, infer Config, infer EventData>
    ? (
        {} extends Config
        ? (
            {} extends EventData
            ? (callback: (data?: undefined) => void, config?: Config) => Promise<boolean>
            : (callback: (data: EventData) => void, config?: Config) => Promise<boolean>
        )
        : (
            {} extends EventData
            ? (callback: (data?: undefined) => void, config: Config) => Promise<boolean>
            : (callback: (data: EventData) => void, config: Config) => Promise<boolean>
        )
    )
    : never

export interface IEndpointHandler<T extends IApiEndpoint<any, any, any>> {
    callback: (msg: IApiMessage<any, any>) => void
    type: T['Type']
    request: T['Request']
    timeout: number
}

export type AnyEndpointHandler = IEndpointHandler<IApiEndpoint<any, any, any>>

export interface IEventHandler<T extends IApiEvent<any, any, any>> {
    callback: (msg: IApiMessage<any, any>) => void
    type: T['Type']
    config: T['Config']
}

export type AnyEventHandler = IEventHandler<IApiEvent<any, any, any>>

export function makeRequestMsg<T extends IApiEndpoint<any, any, any>>(type: T['Type'], requestID: string, data: T['Request']['data']): T['Request'] {
    return {
        apiName: 'VTubeStudioPublicAPI',
        apiVersion: '1.0',
        timestamp: Date.now(),
        messageType: `${type}Request` as T['Request']['messageType'],
        requestID,
        data,
    }
}

export function msgIsResponse<T extends IApiEndpoint<any, any, any>>(msg: IApiMessage<any, any>, type: T['Type']): msg is T['Response'] {
    return msg.messageType === `${type}Response`
}

export function msgIsEvent<T extends IApiEvent<any, any, any>>(msg: IApiMessage<any, any>, type: T['Type']): msg is T['Event'] {
    return msg.messageType === `${type}Event`
}

export function msgIsError(msg: IApiMessage<any, any>): msg is IApiError {
    return msg.messageType === 'APIError'
}

export interface IClientCallConfig {
    /** Controls the number of milliseconds allowed to elapse without a response before the API considers the call to have failed. */
    timeout?: number
}
