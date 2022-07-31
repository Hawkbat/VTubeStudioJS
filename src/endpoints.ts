import { createClientCall, IMessageBus, IWebSocketLike, WebSocketBus } from './api'
import type { IApiEndpoint, IVTSParameter, ILive2DParameter, HotkeyType, RestrictedRawKey, ItemType } from './types'

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
    faceFound: boolean
    mode: 'set' | 'add'
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

export class ApiClient {
    private constructor(private bus: IMessageBus) { }

    static fromMessageBus(bus: IMessageBus) {
        return new ApiClient(bus)
    }

    static fromWebSocket(webSocket: IWebSocketLike) {
        return new ApiClient(new WebSocketBus(webSocket))
    }

    apiState = createClientCall<APIStateEndpoint>(this.bus, 'APIState')
    authenticationToken = createClientCall<AuthenticationTokenEndpoint>(this.bus, 'AuthenticationToken', 5 * 60 * 1000)
    authentication = createClientCall<AuthenticationEndpoint>(this.bus, 'Authentication', 5 * 60 * 1000)
    statistics = createClientCall<StatisticsEndpoint>(this.bus, 'Statistics')
    vtsFolderInfo = createClientCall<VTSFolderInfoEndpoint>(this.bus, 'VTSFolderInfo')
    currentModel = createClientCall<CurrentModelEndpoint>(this.bus, 'CurrentModel')
    availableModels = createClientCall<AvailableModelsEndpoint>(this.bus, 'AvailableModels')
    modelLoad = createClientCall<ModelLoadEndpoint>(this.bus, 'ModelLoad')
    moveModel = createClientCall<MoveModelEndpoint>(this.bus, 'MoveModel')
    hotkeysInCurrentModel = createClientCall<HotkeysInCurrentModelEndpoint>(this.bus, 'HotkeysInCurrentModel')
    hotkeyTrigger = createClientCall<HotkeyTriggerEndpoint>(this.bus, 'HotkeyTrigger')
    expressionState = createClientCall<ExpressionStateEndpoint>(this.bus, 'ExpressionState')
    expressionActivation = createClientCall<ExpressionActivationRequest>(this.bus, 'ExpressionActivation')
    artMeshList = createClientCall<ArtMeshListEndpoint>(this.bus, 'ArtMeshList')
    colorTint = createClientCall<ColorTintEndpoint>(this.bus, 'ColorTint')
    sceneColorOverlayInfo = createClientCall<SceneColorOverlayInfoEndpoint>(this.bus, 'SceneColorOverlayInfo')
    faceFound = createClientCall<FaceFoundEndpoint>(this.bus, 'FaceFound')
    inputParameterList = createClientCall<InputParameterListEndpoint>(this.bus, 'InputParameterList')
    parameterValue = createClientCall<ParameterValueEndpoint>(this.bus, 'ParameterValue')
    live2DParameterList = createClientCall<Live2DParameterListEndpoint>(this.bus, 'Live2DParameterList')
    parameterCreation = createClientCall<ParameterCreationEndpoint>(this.bus, 'ParameterCreation')
    parameterDeletion = createClientCall<ParameterDeletionEndpoint>(this.bus, 'ParameterDeletion')
    injectParameterData = createClientCall<InjectParameterDataEndpoint>(this.bus, 'InjectParameterData')
    getCurrentModelPhysics = createClientCall<GetCurrentModelPhysicsEndpoint>(this.bus, 'GetCurrentModelPhysics')
    setCurrentModelPhysics = createClientCall<SetCurrentModelPhysicsEndpoint>(this.bus, 'SetCurrentModelPhysics')
    ndiConfig = createClientCall<NDIConfigEndpoint>(this.bus, 'NDIConfig')
    itemList = createClientCall<ItemListEndpoint>(this.bus, 'ItemList')
    itemLoad = createClientCall<ItemLoadEndpoint>(this.bus, 'ItemLoad')
    itemUnload = createClientCall<ItemUnloadEndpoint>(this.bus, 'ItemUnload')
    itemAnimationControl = createClientCall<ItemAnimationControlEndpoint>(this.bus, 'ItemAnimationControl')
    itemMove = createClientCall<ItemMoveEndpoint>(this.bus, 'ItemMove')
}
