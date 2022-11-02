import { EndpointCall, IEventHandler, IClientCallConfig, makeRequestMsg, IEndpointHandler, msgIsError, msgIsResponse, IApiEndpoint, IApiEvent, AnyEndpointHandler, AnyEventHandler, VTubeStudioError, msgIsEvent, EventSubscribeCall } from './api'
import { IVTSParameter, ILive2DParameter, HotkeyType, RestrictedRawKey, ItemType, ErrorCode } from './types'
import { generateID, wait } from './utils'
import { validate } from './validation'
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
    positionX?: number
    positionY?: number
    size?: number
    rotation?: number
    fadeTime?: number
    order?: number
    failIfOrderTaken?: boolean
    smoothing?: number
    censored?: boolean
    flipped?: boolean
    locked?: boolean
    unloadWhenPluginDisconnects?: boolean
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
        timeInSeconds?: number
        fadeMode?: 'linear' | 'easeIn' | 'easeOut' | 'easeBoth' | 'overshoot' | 'zip'
        positionX?: number
        positionY?: number
        size?: number
        rotation?: number
        order?: number
        setFlip?: boolean
        flip?: boolean
        userCanStop?: boolean
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

interface ArtMeshSelectionEndpoint extends IApiEndpoint<'ArtMeshSelection', {
    textOverride?: string | null
    helpOverride?: string | null
    requestedArtMeshCount: number
    activeArtMeshes?: string[]
}, {
    success: boolean
    activeArtMeshes: string[]
    inactiveArtMeshes: string[]
}> { }

interface TestEvent extends IApiEvent<'Test', {
    testMessageForEvent?: string
}, {
    yourTestMessage: string
    counter: number
}> { }

interface ModelLoadedEvent extends IApiEvent<'ModelLoaded', {
    modelID?: string[]
}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
}> { }

interface TrackingStatusChangedEvent extends IApiEvent<'TrackingStatusChanged', {

}, {
    faceFound: boolean
    leftHandFound: boolean
    rightHandFound: boolean
}> { }

interface BackgroundChangedEvent extends IApiEvent<'BackgroundChanged', {

}, {
    backgroundName: string
}> { }

interface ModelConfigChangedEvent extends IApiEvent<'ModelConfigChanged', {

}, {
    modelID: string
    modelName: string
    hotkeyConfigChanged: boolean
}> { }

export interface IApiClientOptions {
    /** A callback that will be invoked when an authentication token is needed to authenticate with VTube Studio. Return null from this function if no token is available yet. */
    authTokenGetter: () => string | null | Promise<string | null>
    /** A callback that will be invoked when an authentication token needs to be saved by the plugin. Store this token in a location that will persist between application restarts. */
    authTokenSetter: (authenticationToken: string) => Promise<void>
    /** The name of the plugin, which will be displayed in VTube Studio. */
    pluginName: string
    /** The username of the plugin developer, which will be displayed in VTube Studio. */
    pluginDeveloper: string
    /** A base64-encoded PNG or JPG that is exactly 128x128 pixels which will be displayed in VTube Studio. */
    pluginIcon?: string
    /** The URL to connect to VTube Studio with. Defaults to `ws://localhost:8001`. */
    url?: string
    /** The port to use when connecting to VTube Studio. Ignored if `url` is provided. Defaults to `8001`. */
    port?: number
    /** A user-provided factory function that creates WebSocket instances, for example `(url) => new WebSocket(url)`. Only set this if the library cannot automatically detect a WebSocket implementation in your environment. */
    webSocketFactory?: (url: string) => IWebSocketLike
}

export class ApiClient {
    private _authTokenGetter: () => string | null | Promise<string | null>
    private _authTokenSetter: (authenticationToken: string) => Promise<void>
    private _pluginName: string
    private _pluginDeveloper: string
    private _pluginIcon?: string
    private _url: string
    private _port: number
    private _webSocketFactory: (url: string) => IWebSocketLike
    private _webSocket: IWebSocketLike
    private _connectHandlers: (() => void)[] = []
    private _disconnectHandlers: (() => void)[] = []
    private _errorHandlers: ((err: unknown) => void)[] = []
    private _endpointHandlers: AnyEndpointHandler[] = []
    private _eventHandlers: AnyEventHandler[] = []
    private _isConnected: boolean = false
    private _isConnecting: boolean = false
    private _shouldReconnect: boolean = true

    public get isConnected() { return this._isConnected }
    public get isConnecting() { return this._isConnecting }

    constructor(options: IApiClientOptions) {
        validate(options, 'options', ['object', {
            authTokenGetter: 'function',
            authTokenSetter: 'function',
            pluginDeveloper: 'string',
            pluginName: 'string',
            pluginIcon: ['optional', 'string'],
            url: ['optional', 'string'],
            port: ['optional', 'number'],
            webSocketFactory: ['optional', 'function'],
        }])
        this._authTokenGetter = options.authTokenGetter
        this._authTokenSetter = options.authTokenSetter
        this._pluginName = options.pluginName
        this._pluginDeveloper = options.pluginDeveloper
        this._pluginIcon = options.pluginIcon
        this._port = options.port ?? 8001
        this._url = options.url ?? `ws://localhost:${this._port}`
        const webSocketImpl = options.webSocketFactory ? null : getWebSocketImpl()
        this._webSocketFactory = options.webSocketFactory ?? (url => new webSocketImpl!(url))
        this._webSocket = this._webSocketFactory(this._url)
        this._reconnect()
    }

    readonly apiState = this._createClientCall<APIStateEndpoint>('APIState')
    readonly authenticationToken = this._createClientCall<AuthenticationTokenEndpoint>('AuthenticationToken', 5 * 60 * 1000)
    readonly authentication = this._createClientCall<AuthenticationEndpoint>('Authentication')
    readonly statistics = this._createClientCall<StatisticsEndpoint>('Statistics')
    readonly vtsFolderInfo = this._createClientCall<VTSFolderInfoEndpoint>('VTSFolderInfo')
    readonly currentModel = this._createClientCall<CurrentModelEndpoint>('CurrentModel')
    readonly availableModels = this._createClientCall<AvailableModelsEndpoint>('AvailableModels')
    readonly modelLoad = this._createClientCall<ModelLoadEndpoint>('ModelLoad')
    readonly moveModel = this._createClientCall<MoveModelEndpoint>('MoveModel')
    readonly hotkeysInCurrentModel = this._createClientCall<HotkeysInCurrentModelEndpoint>('HotkeysInCurrentModel')
    readonly hotkeyTrigger = this._createClientCall<HotkeyTriggerEndpoint>('HotkeyTrigger')
    readonly expressionState = this._createClientCall<ExpressionStateEndpoint>('ExpressionState')
    readonly expressionActivation = this._createClientCall<ExpressionActivationRequest>('ExpressionActivation')
    readonly artMeshList = this._createClientCall<ArtMeshListEndpoint>('ArtMeshList')
    readonly colorTint = this._createClientCall<ColorTintEndpoint>('ColorTint')
    readonly sceneColorOverlayInfo = this._createClientCall<SceneColorOverlayInfoEndpoint>('SceneColorOverlayInfo')
    readonly faceFound = this._createClientCall<FaceFoundEndpoint>('FaceFound')
    readonly inputParameterList = this._createClientCall<InputParameterListEndpoint>('InputParameterList')
    readonly parameterValue = this._createClientCall<ParameterValueEndpoint>('ParameterValue')
    readonly live2DParameterList = this._createClientCall<Live2DParameterListEndpoint>('Live2DParameterList')
    readonly parameterCreation = this._createClientCall<ParameterCreationEndpoint>('ParameterCreation')
    readonly parameterDeletion = this._createClientCall<ParameterDeletionEndpoint>('ParameterDeletion')
    readonly injectParameterData = this._createClientCall<InjectParameterDataEndpoint>('InjectParameterData')
    readonly getCurrentModelPhysics = this._createClientCall<GetCurrentModelPhysicsEndpoint>('GetCurrentModelPhysics')
    readonly setCurrentModelPhysics = this._createClientCall<SetCurrentModelPhysicsEndpoint>('SetCurrentModelPhysics')
    readonly ndiConfig = this._createClientCall<NDIConfigEndpoint>('NDIConfig')
    readonly itemList = this._createClientCall<ItemListEndpoint>('ItemList')
    readonly itemLoad = this._createClientCall<ItemLoadEndpoint>('ItemLoad')
    readonly itemUnload = this._createClientCall<ItemUnloadEndpoint>('ItemUnload')
    readonly itemAnimationControl = this._createClientCall<ItemAnimationControlEndpoint>('ItemAnimationControl')
    readonly itemMove = this._createClientCall<ItemMoveEndpoint>('ItemMove')
    readonly artMeshSelection = this._createClientCall<ArtMeshSelectionEndpoint>('ArtMeshSelection', 30 * 60 * 1000)

    events = Object.seal({
        test: this._createEventSubCalls<TestEvent>('Test'),
        modelLoaded: this._createEventSubCalls<ModelLoadedEvent>('ModelLoaded'),
        trackingStatusChanged: this._createEventSubCalls<TrackingStatusChangedEvent>('TrackingStatusChanged'),
        backgroundChanged: this._createEventSubCalls<BackgroundChangedEvent>('BackgroundChanged'),
        modelConfigChanged: this._createEventSubCalls<ModelConfigChangedEvent>('ModelConfigChanged'),
    })

    on(type: 'connect', handler: () => void): void
    on(type: 'disconnect', handler: () => void): void
    on(type: 'error', handler: (err: unknown) => void): void
    on(type: 'connect' | 'disconnect' | 'error', handler: (...args: any[]) => void): void {
        validate(type, 'type', ['stringEnum', ['connect', 'disconnect', 'error']])
        validate(handler, 'handler', 'function')
        if (type === 'connect' && !this._connectHandlers.find(h => h === handler))
            this._connectHandlers.push(handler)
        if (type === 'disconnect' && !this._disconnectHandlers.find(h => h === handler))
            this._disconnectHandlers.push(handler)
        if (type === 'error' && !this._errorHandlers.find(h => h === handler))
            this._errorHandlers.push(handler)
    }
    off(type: 'connect', handler: () => void): void
    off(type: 'disconnect', handler: () => void): void
    off(type: 'error', handler: (err: unknown) => void): void
    off(type: 'connect' | 'disconnect' | 'error', handler: (...args: any[]) => void): void {
        validate(type, 'type', ['stringEnum', ['connect', 'disconnect', 'error']])
        validate(handler, 'handler', 'function')
        if (type === 'connect' && this._connectHandlers.find(h => h === handler))
            this._connectHandlers.splice(this._connectHandlers.findIndex(h => h === handler), 1)
        if (type === 'disconnect' && this._disconnectHandlers.find(h => h === handler))
            this._disconnectHandlers.splice(this._disconnectHandlers.findIndex(h => h === handler), 1)
        if (type === 'error' && this._errorHandlers.find(h => h === handler))
            this._errorHandlers.splice(this._errorHandlers.findIndex(h => h === handler), 1)
    }

    async disconnect() {
        this._shouldReconnect = false
        this._webSocket.close();
    }

    private _eventSubscription = this._createClientCall<EventSubscriptionEndpoint>('EventSubscription')

    private _createClientCall<T extends IApiEndpoint<any, any, any>>(type: T['Type'], defaultTimeout: number = 1000): EndpointCall<T> {
        return ((data: T['Request']['data'], config?: IClientCallConfig) => new Promise<T['Response']['data']>((resolve, reject) => {
            const requestID = generateID(16)
            const request = makeRequestMsg(type, requestID, data ?? {})
            const handler: IEndpointHandler<T> = {
                callback: msg => {
                    if (msg.requestID === requestID) {
                        handler.remove = true
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
                    handler.remove = true
                    reject(new VTubeStudioError({ errorID: ErrorCode.InternalClientError, message: 'The request timed out.' }, requestID))
                }, config?.timeout ?? defaultTimeout),
                remove: false,
            }
            this._endpointHandlers.push(handler)
            if (this._webSocket.readyState === WebSocketReadyState.open)
                this._webSocket.send(JSON.stringify(request))
        })) as EndpointCall<T>
    }

    private _createEventSubCalls<T extends IApiEvent<any, any, any>>(type: T['Type']) {
        return {
            /**
             * Adds or replaces an event subscription. Subsequent calls will replace the subscription config and callback instead of creating additional subscriptions.
             * @param {object} config Configuration data for the event subscription.
             * @param {(data: object) => void} callback A callback that will be invoked each time the event occurs.
             * @returns {Promise<boolean>} A Promise of a boolean indicating if the subscription was added for the first time (true) or replaced (false).
             */
            subscribe: (async (callback: (data: T['Event']['data']) => void, config?: T['Config']) => {
                await this._eventSubscription({ config: config ?? {}, eventName: `${type}Event`, subscribe: true })
                const handler: IEventHandler<T> = {
                    callback: msg => {
                        if (msgIsEvent<T>(msg, type))
                            callback(msg.data ?? {})
                    },
                    type,
                    config: config ?? {},
                    remove: false,
                }
                const existingHandler = this._eventHandlers.find(h => h.type === type)
                this._eventHandlers.push(handler)
                if (existingHandler) {
                    existingHandler.remove = true
                    return false
                }
                return true
            }) as EventSubscribeCall<T>,
            /**
             * Removes an event subscription.
             * @returns {Promise<boolean>} A Promise of a boolean indicating if there was an existing subscription to remove or not.
             */
            unsubscribe: async (): Promise<boolean> => {
                const existingHandler = this._eventHandlers.find(h => h.type === type)
                if (existingHandler) {
                    await this._eventSubscription({ config: existingHandler.config, eventName: `${type}Event`, subscribe: false })
                    existingHandler.remove = true
                    return true
                }
                return false
            }
        }
    }

    private _reconnect() {
        this._isConnecting = true
        this._webSocket.addEventListener('message', ({ data }) => {
            try {
                const msg = JSON.parse(data)
                for (const handler of this._endpointHandlers)
                    handler.callback(msg)
                for (const handler of this._eventHandlers)
                    handler.callback(msg)
                for (let i = this._endpointHandlers.length - 1; i >= 0; i--)
                    if (this._endpointHandlers[i]!.remove)
                        this._endpointHandlers.splice(i, 1)
                for (let i = this._eventHandlers.length - 1; i >= 0; i--)
                    if (this._eventHandlers[i]!.remove)
                        this._eventHandlers.splice(i, 1)
            } catch (e) {
                for (const handler of this._errorHandlers) handler(e)
            }
        })
        this._webSocket.addEventListener('close', async () => {
            this._disconnect()
        })
        this._webSocket.addEventListener('error', () => {
            this._webSocket.close()
        })
        this._webSocket.addEventListener('open', async () => {
            try {
                const pluginName = this._pluginName
                const pluginDeveloper = this._pluginDeveloper
                const pluginIcon = this._pluginIcon

                const { active, currentSessionAuthenticated } = await this.apiState()

                if (!active) throw new Error('VTube Studio Plugin API is not enabled.')

                if (!currentSessionAuthenticated) {
                    try {
                        const authenticationToken = await this._authTokenGetter()
                        if (!authenticationToken) throw new Error('Missing authentication token')
                        const { authenticated, reason } = await this.authentication({ pluginName, pluginDeveloper, authenticationToken })
                        if (!authenticated) throw new Error(`Authentication with VTube Studio failed: ${reason}`)
                    } catch {
                        const { authenticationToken } = await this.authenticationToken({ pluginName, pluginDeveloper, pluginIcon })
                        const { authenticated, reason } = await this.authentication({ pluginName, pluginDeveloper, authenticationToken })
                        if (!authenticated) throw new Error(`Authentication with VTube Studio failed: ${reason}`)
                        await this._authTokenSetter(authenticationToken)
                    }
                }

                for (const handler of this._endpointHandlers)
                    this._webSocket.send(JSON.stringify(handler.request))

                await Promise.all(this._eventHandlers.map(handler => this._eventSubscription({ config: handler.config, eventName: `${handler.type}Event`, subscribe: true })))

                this._isConnecting = false
                this._isConnected = true
                for (const handler of this._connectHandlers) handler()
            } catch (e) {
                for (const handler of this._errorHandlers) handler(e)
                this._webSocket.close()
            }
        })
    }

    private async _disconnect() {
        this._isConnecting = false
        if (this._isConnected) {
            this._isConnected = false
            for (const handler of this._disconnectHandlers) handler()
        }
        if (!this._shouldReconnect) return

        await wait(5 * 1000)
        setTimeout(() => {
            if (!this._isConnecting && !this._isConnected) {
                this._webSocket = this._webSocketFactory(this._url)
                this._reconnect()
            }
        }, 0)
    }
}
