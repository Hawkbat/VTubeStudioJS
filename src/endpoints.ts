import { EndpointCall, IEventHandler, IClientCallConfig, makeRequestMsg, IEndpointHandler, msgIsError, msgIsResponse, IApiEndpoint, IApiEvent, AnyEndpointHandler, AnyEventHandler, VTubeStudioError, msgIsEvent, EventSubscribeCall } from './api'
import { IVTSParameter, ILive2DParameter, HotkeyType, RestrictedRawKey, ItemType, ErrorCode } from './types'
import { findWithIndex, generateID, wait } from './utils'
import { getWebSocketImpl, IWebSocketLike, WebSocketReadyState } from './ws'

interface APIStateEndpoint extends IApiEndpoint<'APIState', {

}, {
    active: boolean
    vTubeStudioVersion: `${number}.${number}.${number}`
    currentSessionAuthenticated: boolean
}> { }

interface AuthenticationTokenEndpoint extends IApiEndpoint<'AuthenticationToken', {
    pluginName: string
    pluginDeveloper: string
    pluginIcon?: string
}, {
    authenticationToken: string
}> { }

interface AuthenticationEndpoint extends IApiEndpoint<'Authentication', {
    pluginName: string
    pluginDeveloper: string
    authenticationToken: string
}, {
    authenticated: boolean
    reason: string
}> { }

interface StatisticsEndpoint extends IApiEndpoint<'Statistics', {

}, {
    uptime: number
    framerate: number
    vTubeStudioVersion: `${number}.${number}.${number}`
    allowedPlugins: number
    connectedPlugins: number
    startedWithSteam: boolean
    windowWidth: number
    windowHeight: number
    windowIsFullscreen: boolean
}> { }

interface VTSFolderInfoEndpoint extends IApiEndpoint<'VTSFolderInfo', {

}, {
    models: string
    backgrounds: string
    items: string
    config: string
    logs: string
    backup: string
}> { }

interface CurrentModelEndpoint extends IApiEndpoint<'CurrentModel', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    vtsModelName: string
    vtsModelIconName: string
    live2DModelName: string
    modelLoadTime: number
    timeSinceModelLoaded: number
    numberOfLive2DParameters: number
    numberOfLive2DArtmeshes: number
    hasPhysicsFile: boolean
    numberOfTextures: number
    textureResolution: number
    modelPosition: {
        positionX: number
        positionY: number
        rotation: number
        size: number
    }
}> { }

interface AvailableModelsEndpoint extends IApiEndpoint<'AvailableModels', {

}, {
    numberOfModels: number
    availableModels: {
        modelLoaded: boolean
        modelName: string
        modelID: string
        vtsModelName: string
        vtsModelIconName: string
    }[]
}> { }

interface ModelLoadEndpoint extends IApiEndpoint<'ModelLoad', {
    modelID: string
}, {
    modelID: string
}> { }

interface MoveModelEndpoint extends IApiEndpoint<'MoveModel', {
    timeInSeconds: number
    valuesAreRelativeToModel: boolean
    positionX?: number
    positionY?: number
    rotation?: number
    size?: number
}, {

}> { }

interface HotkeysInCurrentModelEndpoint extends IApiEndpoint<'HotkeysInCurrentModel', {
    modelID?: string
    live2DItemFileName?: string
}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    availableHotkeys: {
        name: string
        type: keyof typeof HotkeyType
        description: string
        file: string
        hotkeyID: string
        keyCombination: RestrictedRawKey[]
        onScreenButtonID: number
    }[]
}> { }

interface HotkeyTriggerEndpoint extends IApiEndpoint<'HotkeyTrigger', {
    hotkeyID: string
    itemInstanceID?: string
}, {
    hotkeyID: string
}> { }

interface ExpressionStateEndpoint extends IApiEndpoint<'ExpressionState', {
    details: boolean
    expressionFile?: string
}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    expressions: {
        name: string
        file: string
        active: boolean
        deactivateWhenKeyIsLetGo: boolean
        autoDeactivateAfterSeconds: boolean
        secondsRemaining: boolean
        usedInHotkeys: {
            name: string
            id: string
        }[]
        parameters: {
            name: string
            value: number
        }[]
    }[]
}> { }

interface ExpressionActivationRequest extends IApiEndpoint<'ExpressionActivation', {
    expressionFile: string
    active: boolean
}, {

}> { }

interface ArtMeshListEndpoint extends IApiEndpoint<'ArtMeshList', {

}, {
    modelLoaded: boolean
    numberOfArtMeshNames: number
    numberOfArtMeshTags: number
    artMeshNames: string[]
    artMeshTags: string[]
}> { }

interface ColorTintEndpoint extends IApiEndpoint<'ColorTint', {
    colorTint: {
        colorR: number
        colorG: number
        colorB: number
        colorA: number
        mixWithSceneLightingColor?: number
        jeb_?: true
    }
    artMeshMatcher: {
        tintAll: boolean
        artMeshNumber?: number[]
        nameExact?: string[]
        nameContains?: string[]
        tagExact?: string[]
        tagContains?: string[]
    }
}, {
    matchedArtMeshes: number
}> { }

interface SceneColorOverlayInfoEndpoint extends IApiEndpoint<'SceneColorOverlayInfo', {

}, {
    active: boolean
    itemsIncluded: boolean
    isWindowCapture: boolean
    baseBrightness: number
    colorBoost: number
    smoothing: number
    colorOverlayR: number
    colorOverlayG: number
    colorOverlayB: number
    colorAvgR: number
    colorAvgG: number
    colorAvgB: number
    leftCapturePart: {
        active: boolean
        colorR: number
        colorG: number
        colorB: number
    }
    middleCapturePart: {
        active: boolean
        colorR: number
        colorG: number
        colorB: number
    }
    rightCapturePart: {
        active: boolean
        colorR: number
        colorG: number
        colorB: number
    }
}> { }

interface FaceFoundEndpoint extends IApiEndpoint<'FaceFound', {

}, {
    found: boolean
}> { }

interface InputParameterListEndpoint extends IApiEndpoint<'InputParameterList', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    customParameters: IVTSParameter[]
    defaultParameters: IVTSParameter[]
}> { }

interface ParameterValueEndpoint extends IApiEndpoint<'ParameterValue', {
    name: string
}, IVTSParameter> { }

interface Live2DParameterListEndpoint extends IApiEndpoint<'Live2DParameterList', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    parameters: ILive2DParameter[]
}> { }

interface ParameterCreationEndpoint extends IApiEndpoint<'ParameterCreation', {
    parameterName: string
    explanation: string
    min: number
    max: number
    defaultValue: number
}, {
    parameterName: string
}> { }

interface ParameterDeletionEndpoint extends IApiEndpoint<'ParameterDeletion', {
    parameterName: string
}, {
    parameterName: string
}> { }

interface InjectParameterDataEndpoint extends IApiEndpoint<'InjectParameterData', {
    faceFound?: boolean
    mode?: 'set' | 'add'
    parameterValues: {
        id: string
        weight?: number
        value: number
    }[]
}, {

}> { }

interface GetCurrentModelPhysicsEndpoint extends IApiEndpoint<'GetCurrentModelPhysics', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    modelHasPhysics: boolean
    physicsSwitchedOn: boolean
    usingLegacyPhysics: boolean
    physicsFPSSetting: 30 | 60 | 120 | -1
    baseStrength: number
    baseWind: number
    apiPhysicsOverrideActive: boolean
    apiPhysicsOverridePluginName: string
    physicsGroups: {
        groupID: string
        groupName: string
        strengthMultiplier: number
        windMultiplier: number
    }[]
}> { }

interface SetCurrentModelPhysicsEndpoint extends IApiEndpoint<'SetCurrentModelPhysics', {
    strengthOverrides: {
        id: string
        value: number
        setBaseValue: boolean
        overrideSeconds: number
    }[]
    windOverrides: {
        id: string
        value: number
        setBaseValue: boolean
        overrideSeconds: number
    }[]
}, {

}> { }

interface NDIConfigEndpoint extends IApiEndpoint<'NDIConfig', {
    setNewConfig: boolean
    ndiActive: boolean
    useNDI5: boolean
    useCustomResolution: boolean
    customWidthNDI: number
    customHeightNDI: number
}, {
    setNewConfig: boolean
    ndiActive: boolean
    useNDI5: boolean
    useCustomResolution: boolean
    customWidthNDI: number
    customHeightNDI: number
}> { }

interface ItemListEndpoint extends IApiEndpoint<'ItemList', {
    includeAvailableSpots: boolean
    includeItemInstancesInScene: boolean
    includeAvailableItemFiles: boolean
    onlyItemsWithFileName?: string
    onlyItemsWithInstanceID?: string
}, {
    itemsInSceneCount: number
    totalItemsAllowedCount: number
    canLoadItemsRightNow: boolean
    availableSpots: number[]
    itemInstancesInScene: {
        fileName: string
        instanceID: string
        order: number
        type: ItemType
        censored: boolean
        flipped: boolean
        locked: boolean
        smoothing: number
        framerate: number
        frameCount: number
        currentFrame: number
        pinnedToModel: boolean
        pinnedModelID: string
        pinnedArtMeshID: string
        groupName: string
        sceneName: string
        fromWorkshop: boolean
    }[]
    availableItemFiles: {
        fileName: string
        type: ItemType
        loadedCount: boolean
    }[]
}> { }

interface ItemLoadEndpoint extends IApiEndpoint<'ItemLoad', {
    fileName: string
    positionX: number
    positionY: number
    size: number
    rotation: number
    fadeTime: number
    order: number
    failIfOrderTaken: boolean
    smoothing: number
    censored: boolean
    flipped: boolean
    locked: boolean
    unloadWhenPluginDisconnects: boolean
}, {
    instanceID: string
}> { }

interface ItemUnloadEndpoint extends IApiEndpoint<'ItemUnload', {
    unloadAllInScene: boolean
    unloadAllLoadedByThisPlugin: boolean
    allowUnloadingItemsLoadedByUserOrOtherPlugins: boolean
    instanceIDs: string[]
    fileNames: string[]
}, {
    unloadedItems: {
        instanceID: string
        fileName: string
    }[]
}> { }

interface ItemAnimationControlEndpoint extends IApiEndpoint<'ItemAnimationControl', {
    itemInstanceID: string
    framerate: number
    frame: number
    brightness: number
    opacity: number
    setAutoStopFrames: boolean
    autoStopFrames: number[]
    setAnimationPlayState: boolean
    animationPlayState: boolean
}, {
    frame: number
    animationPlaying: boolean
}> { }

interface ItemMoveEndpoint extends IApiEndpoint<'ItemMove', {
    itemsToMove: {
        itemInstanceID: string
        timeInSeconds: number
        fadeMode: 'linear' | 'easeIn' | 'easeOut' | 'easeBoth' | 'overshoot' | 'zip'
        positionX: number
        positionY: number
        size: number
        rotation: number
        order: number
        setFlip: boolean
        flip: boolean
        userCanStop: boolean
    }[]
}, {
    movedItems: {
        itemInstanceID: string
        success: boolean
        errorID: number
    }[]
}> { }

interface EventSubscriptionEndpoint extends IApiEndpoint<'EventSubscription', {
    eventName: string
    subscribe: boolean
    config: object
}, {
    subscribedEventCount: number
    subscribedEvents: string[]
}> { }

interface TestEvent extends IApiEvent<'Test', {
    testMessageForEvent?: string
}, {
    yourTestMessage: string
    counter: number
}> { }

interface ModelLoadedEvent extends IApiEvent<'ModelLoaded', {
    modelID?: string
}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
}> { }

export interface IApiClientOptions {
    /** The URL to connect to VTube Studio with. Defaults to `ws://localhost:8001`. */
    url?: string
    /** The port to use when connecting to VTube Studio. Ignored if `url` is provided. Defaults to `8001`. */
    port?: number
    /** A user-provided factory function that creates WebSocket instances, for example `(url) => new WebSocket(url)`. Only set this if the library cannot automatically detect a WebSocket implementation in your environment. */
    webSocketFactory?: (url: string) => IWebSocketLike
}

export class ApiClient {
    private _url: string
    private _port: number
    private _webSocketFactory: (url: string) => IWebSocketLike
    private _webSocket: IWebSocketLike
    private _endpointHandlers: AnyEndpointHandler[]
    private _eventHandlers: AnyEventHandler[]

    constructor(options?: IApiClientOptions) {
        this._port = options?.port ?? 8001
        this._url = options?.url ?? `ws://localhost:${this._port}`
        const webSocketImpl = options?.webSocketFactory ? null : getWebSocketImpl()
        this._webSocketFactory = options?.webSocketFactory ?? (url => new webSocketImpl!(url))
        this._webSocket = this._webSocketFactory(this._url)
        this._endpointHandlers = []
        this._eventHandlers = []
        this._reconnect()
    }

    apiState = this._createClientCall<APIStateEndpoint>('APIState')
    authenticationToken = this._createClientCall<AuthenticationTokenEndpoint>('AuthenticationToken', 5 * 60 * 1000)
    authentication = this._createClientCall<AuthenticationEndpoint>('Authentication')
    statistics = this._createClientCall<StatisticsEndpoint>('Statistics')
    vtsFolderInfo = this._createClientCall<VTSFolderInfoEndpoint>('VTSFolderInfo')
    currentModel = this._createClientCall<CurrentModelEndpoint>('CurrentModel')
    availableModels = this._createClientCall<AvailableModelsEndpoint>('AvailableModels')
    modelLoad = this._createClientCall<ModelLoadEndpoint>('ModelLoad')
    moveModel = this._createClientCall<MoveModelEndpoint>('MoveModel')
    hotkeysInCurrentModel = this._createClientCall<HotkeysInCurrentModelEndpoint>('HotkeysInCurrentModel')
    hotkeyTrigger = this._createClientCall<HotkeyTriggerEndpoint>('HotkeyTrigger')
    expressionState = this._createClientCall<ExpressionStateEndpoint>('ExpressionState')
    expressionActivation = this._createClientCall<ExpressionActivationRequest>('ExpressionActivation')
    artMeshList = this._createClientCall<ArtMeshListEndpoint>('ArtMeshList')
    colorTint = this._createClientCall<ColorTintEndpoint>('ColorTint')
    sceneColorOverlayInfo = this._createClientCall<SceneColorOverlayInfoEndpoint>('SceneColorOverlayInfo')
    faceFound = this._createClientCall<FaceFoundEndpoint>('FaceFound')
    inputParameterList = this._createClientCall<InputParameterListEndpoint>('InputParameterList')
    parameterValue = this._createClientCall<ParameterValueEndpoint>('ParameterValue')
    live2DParameterList = this._createClientCall<Live2DParameterListEndpoint>('Live2DParameterList')
    parameterCreation = this._createClientCall<ParameterCreationEndpoint>('ParameterCreation')
    parameterDeletion = this._createClientCall<ParameterDeletionEndpoint>('ParameterDeletion')
    injectParameterData = this._createClientCall<InjectParameterDataEndpoint>('InjectParameterData')
    getCurrentModelPhysics = this._createClientCall<GetCurrentModelPhysicsEndpoint>('GetCurrentModelPhysics')
    setCurrentModelPhysics = this._createClientCall<SetCurrentModelPhysicsEndpoint>('SetCurrentModelPhysics')
    ndiConfig = this._createClientCall<NDIConfigEndpoint>('NDIConfig')
    itemList = this._createClientCall<ItemListEndpoint>('ItemList')
    itemLoad = this._createClientCall<ItemLoadEndpoint>('ItemLoad')
    itemUnload = this._createClientCall<ItemUnloadEndpoint>('ItemUnload')
    itemAnimationControl = this._createClientCall<ItemAnimationControlEndpoint>('ItemAnimationControl')
    itemMove = this._createClientCall<ItemMoveEndpoint>('ItemMove')

    events = {
        test: this._createEventSubCalls<TestEvent>('Test'),
        modelLoaded: this._createEventSubCalls<ModelLoadedEvent>('ModelLoaded'),
    }

    private _eventSubscription = this._createClientCall<EventSubscriptionEndpoint>('EventSubscription')

    private _createClientCall<T extends IApiEndpoint<any, any, any>>(type: T['Type'], defaultTimeout: number = 1000): EndpointCall<T> {
        return ((data: T['Request']['data'], config?: IClientCallConfig) => new Promise<T['Response']['data']>((resolve, reject) => {
            const requestID = generateID(16)
            const request = makeRequestMsg(type, requestID, data ?? {})
            const handler: IEndpointHandler<T> = {
                callback: msg => {
                    if (msg.requestID === requestID) {
                        const index = this._endpointHandlers.indexOf(handler)
                        this._endpointHandlers.splice(index, 1)
                        clearTimeout(handler.timeout)
                        if (msgIsResponse<T>(msg, type))
                            resolve(msg.data ?? {})
                        else if (msgIsError(msg))
                            reject(new VTubeStudioError(msg.data ?? {}, requestID))
                        else
                            reject(new VTubeStudioError({ errorID: ErrorCode.InternalClientError, message: `The response from VTube Studio was an unexpected type: ${JSON.stringify(msg.messageType)}` }, requestID))
                    }
                },
                type,
                request,
                timeout: setTimeout(() => {
                    const index = this._endpointHandlers.indexOf(handler)
                    this._endpointHandlers.splice(index, 1)
                    reject(new VTubeStudioError({ errorID: ErrorCode.InternalClientError, message: 'The request timed out.' }, requestID))
                }, config?.timeout ?? defaultTimeout),
            }
            this._endpointHandlers.push(handler)
            if (this._webSocket.readyState === WebSocketReadyState.open)
                this._webSocket.send(JSON.stringify(request))
        })) as EndpointCall<T>
    }

    private _createEventSubCalls<T extends IApiEvent<any, any, any>>(type: T['Type']) {
        return {
            /**
             * Adds an event subscription. Subsequent calls will update the subscription config and callback instead of creating a second subscription.
             * @param {object} config Configuration data for the event subscription.
             * @param {(data: object) => void} callback A callback that will be invoked each time the event occurs.
             * @returns A boolean indicating if the subscription was added for the first time (true) or updated (false).
             */
            on: (async (callback: (data: T['Event']['data']) => void, config?: T['Config']) => {
                await this._eventSubscription({ config: config ?? {}, eventName: `${type}Event`, subscribe: true })
                const handler: IEventHandler<T> = {
                    callback: msg => {
                        if (msgIsEvent<T>(msg, type))
                            callback(msg.data ?? {})
                    },
                    type,
                    config: config ?? {},
                }
                const [existingHandler, index] = findWithIndex(this._eventHandlers, h => h.type === type)
                if (existingHandler) {
                    this._eventHandlers.splice(index, 1)
                    return false
                }
                this._eventHandlers.push(handler)
                return true
            }) as EventSubscribeCall<T>,
            /**
             * Removes an event subscription.
             * @returns {Promise<boolean>} A boolean indicating if there was an existing subscription to remove or not.
             */
            off: async () => {
                const [existingHandler, index] = findWithIndex(this._eventHandlers, h => h.type === type)
                if (existingHandler) {
                    this._eventHandlers.splice(index, 1)
                    await this._eventSubscription({ config: existingHandler.config, eventName: `${type}Event`, subscribe: false })
                    return true
                }
                return false
            }
        }
    }

    private _reconnect() {
        this._webSocket.addEventListener('open', () => {
            for (const handler of this._endpointHandlers)
                this._webSocket.send(JSON.stringify(handler.request))
            for (const handler of this._eventHandlers)
                this._eventSubscription({ config: handler.config, eventName: `${handler.type}Event`, subscribe: true })
        })
        this._webSocket.addEventListener('message', ({ data }) => {
            const msg = JSON.parse(data)
            for (const handler of [...this._endpointHandlers])
                handler.callback(msg)
            for (const handler of [...this._eventHandlers])
                handler.callback(msg)
        })
        this._webSocket.addEventListener('close', async () => {
            await wait(1000)
            setTimeout(() => {
                this._webSocket = this._webSocketFactory(this._url)
                this._reconnect()
            }, 0)
        })
        this._webSocket.addEventListener('error', async () => {
            await wait(1000)
            setTimeout(() => {
                this._webSocket = this._webSocketFactory(this._url)
                this._reconnect()
            }, 0)
        })
    }
}
