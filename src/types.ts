
export class VTubeStudioError extends Error {
    constructor(public readonly data: Readonly<ApiError['data']>, public readonly requestID: string) {
        super(`${data.message} (Error Code: ${data.errorID} ${ErrorCode[data.errorID] ?? ErrorCode.Unknown}) (Request ID: ${requestID})`)
        this.name = this.constructor.name
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export enum ErrorCode {
    Unknown = NaN,

    // General
    InternalClientError = -1,
    InternalServerError = 0,
    APIAccessDeactivated = 1,
    JSONInvalid = 2,
    APINameInvalid = 3,
    APIVersionInvalid = 4,
    RequestIDInvalid = 5,
    RequestTypeMissingOrEmpty = 6,
    RequestTypeUnknown = 7,
    RequestRequiresAuthetication = 8,

    // AuthenticationToken
    TokenRequestDenied = 50,
    TokenRequestCurrentlyOngoing = 51,
    TokenRequestPluginNameInvalid = 52,
    TokenRequestDeveloperNameInvalid = 53,
    TokenRequestPluginIconInvalid = 54,

    // Authentication
    AuthenticationTokenMissing = 100,
    AuthenticationPluginNameMissing = 101,
    AuthenticationPluginDeveloperMissing = 102,

    // ModelLoad
    ModelIDMissing = 150,
    ModelIDInvalid = 151,
    ModelIDNotFound = 152,
    ModelLoadCooldownNotOver = 153,
    CannotCurrentlyChangeModel = 154,

    // HotkeyTrigger
    HotkeyQueueFull = 200,
    HotkeyExecutionFailedBecauseNoModelLoaded = 201,
    HotkeyIDNotFoundInModel = 202,
    HotkeyCooldownNotOver = 203,
    HotkeyIDFoundButHotkeyDataInvalid = 204,
    HotkeyExecutionFailedBecauseBadState = 205,
    HotkeyUnknownExecutionFailure = 206,
}

export enum HotkeyType {
    Unset = -1,
    TriggerAnimation = 0,
    ChangeIdleAnimation = 1,
    ToggleExpression = 2,
    RemoveAllExpressions = 3,
    MoveModel = 4,
    ChangeBackground = 5,
    ReloadMicrophone = 6,
    ReloadTextures = 7,
    CalibrateCam = 8,
    ChangeVTSModel = 9,
    TakeScreenshot = 10,
}

export interface BaseParameter {
    name: string
    value: number
    min: number
    max: number
    defaultValue: number
}

export interface Live2DParameter extends BaseParameter { }

export interface VTSParameter extends BaseParameter {
    addedBy: string
}

export interface ApiMessage<Type extends string, Data extends object> {
    apiName: 'VTubeStudioPublicAPI'
    apiVersion: `${number}.${number}`
    requestID: string
    messageType: Type
    data: Data
}

export interface ApiRequest<Type extends string, Data extends object> extends ApiMessage<`${Type}Request`, Data> { }

export interface ApiResponse<Type extends string, Data extends object> extends ApiMessage<`${Type}Response`, Data> {
    timestamp: number
}

export interface ApiError extends ApiMessage<'APIError', {
    errorID: ErrorCode
    message: string
}> {
    timestamp: number
}

export interface ApiEndpoint<Type extends string, Request extends object, Response extends object> {
    Type: Type
    Request: ApiRequest<Type, Request>
    Response: ApiResponse<Type, Response>
}
