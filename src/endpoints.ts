import { createClientCall, createServerCall, IMessageBus } from './api'
import type { IApiEndpoint, IVTSParameter, ILive2DParameter, HotkeyType } from './types'

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
    }[]
}> { }

interface HotkeyTriggerEndpoint extends IApiEndpoint<'HotkeyTrigger', {
    hotkeyID: string
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
            id: string
            target: number
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
    parameterValues: {
        id: string
        weight?: number
        value: number
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

export class ApiClient {
    constructor(private bus: IMessageBus) { }

    apiState = createClientCall<APIStateEndpoint>(this.bus, 'APIState')
    authenticationToken = createClientCall<AuthenticationTokenEndpoint>(this.bus, 'AuthenticationToken', 5 * 60 * 1000)
    authentication = createClientCall<AuthenticationEndpoint>(this.bus, 'Authentication')
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
    ndiConfig = createClientCall<NDIConfigEndpoint>(this.bus, 'NDIConfig')
}

type ApiShape = {
    [P in keyof ApiClient]: ApiClient[P] extends (...a: any) => any ? ApiClient[P] : never
}

export class MockApiServer implements ApiShape {
    constructor(private bus: IMessageBus) { }

    apiState = createServerCall<APIStateEndpoint>(this.bus, 'APIState', async () => ({ active: true, vTubeStudioVersion: '1.9.0', currentSessionAuthenticated: true }))
    authenticationToken = createServerCall<AuthenticationTokenEndpoint>(this.bus, 'AuthenticationToken', async () => ({ authenticationToken: 'MOCK_VTUBE_STUDIO_API' }))
    authentication = createServerCall<AuthenticationEndpoint>(this.bus, 'Authentication', async () => ({ authenticated: true, reason: '' }))
    statistics = createServerCall<StatisticsEndpoint>(this.bus, 'Statistics', async () => ({ vTubeStudioVersion: '1.9.0', allowedPlugins: 1, connectedPlugins: 1, framerate: 30, uptime: 0, startedWithSteam: false, windowWidth: 1920, windowHeight: 1080, windowIsFullscreen: true }))
    vtsFolderInfo = createServerCall<VTSFolderInfoEndpoint>(this.bus, 'VTSFolderInfo', async () => ({ models: '', backgrounds: '', items: '', config: '', logs: '', backup: '' }))
    currentModel = createServerCall<CurrentModelEndpoint>(this.bus, 'CurrentModel', async () => ({ modelLoaded: true, modelID: 'FAKE_MODEL', modelName: 'Fake Model', vtsModelName: '', vtsModelIconName: '', live2DModelName: '', modelLoadTime: 0, timeSinceModelLoaded: 0, numberOfLive2DArtmeshes: 1, numberOfLive2DParameters: 0, numberOfTextures: 1, textureResolution: 1024, hasPhysicsFile: false, modelPosition: { positionX: 0, positionY: 0, rotation: 0, size: 1 } }))
    moveModel = createServerCall<MoveModelEndpoint>(this.bus, 'MoveModel', async () => { })
    availableModels = createServerCall<AvailableModelsEndpoint>(this.bus, 'AvailableModels', async () => ({ numberOfModels: 2, availableModels: [{ modelLoaded: true, modelID: 'FAKE_MODEL', modelName: 'Fake Model', vtsModelName: '', vtsModelIconName: '' }, { modelLoaded: false, modelID: 'TEST_MODEL', modelName: 'Test Model', vtsModelName: '', vtsModelIconName: '' }] }))
    modelLoad = createServerCall<ModelLoadEndpoint>(this.bus, 'ModelLoad', async ({ modelID }) => ({ modelID }))
    hotkeysInCurrentModel = createServerCall<HotkeysInCurrentModelEndpoint>(this.bus, 'HotkeysInCurrentModel', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', availableHotkeys: [] }))
    hotkeyTrigger = createServerCall<HotkeyTriggerEndpoint>(this.bus, 'HotkeyTrigger', async ({ hotkeyID }) => ({ hotkeyID }))
    expressionState = createServerCall<ExpressionStateEndpoint>(this.bus, 'ExpressionState', async () => ({ modelLoaded: true, modelID: 'FAKE_MODEL', modelName: 'Fake Model', expressions: [] }))
    expressionActivation = createServerCall<ExpressionActivationRequest>(this.bus, 'ExpressionActivation', async () => { })
    artMeshList = createServerCall<ArtMeshListEndpoint>(this.bus, 'ArtMeshList', async () => ({ modelLoaded: true, numberOfArtMeshNames: 0, numberOfArtMeshTags: 0, artMeshNames: [], artMeshTags: [] }))
    colorTint = createServerCall<ColorTintEndpoint>(this.bus, 'ColorTint', async () => ({ matchedArtMeshes: 0 }))
    sceneColorOverlayInfo = createServerCall<SceneColorOverlayInfoEndpoint>(this.bus, 'SceneColorOverlayInfo', async () => ({ active: true, itemsIncluded: true, isWindowCapture: false, baseBrightness: 16, colorBoost: 35, smoothing: 6, colorOverlayR: 206, colorOverlayG: 150, colorOverlayB: 153, colorAvgR: 237, colorAvgG: 157, colorAvgB: 162, leftCapturePart: { active: true, colorR: 243, colorG: 231, colorB: 234 }, middleCapturePart: { active: true, colorR: 230, colorG: 83, colorB: 89 }, rightCapturePart: { active: false, colorR: 235, colorG: 95, colorB: 101 } }))
    faceFound = createServerCall<FaceFoundEndpoint>(this.bus, 'FaceFound', async () => ({ found: true }))
    inputParameterList = createServerCall<InputParameterListEndpoint>(this.bus, 'InputParameterList', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', customParameters: [], defaultParameters: [] }))
    parameterValue = createServerCall<ParameterValueEndpoint>(this.bus, 'ParameterValue', async () => ({ name: 'Param', addedBy: '', min: 0, max: 0, value: 0, defaultValue: 0 }))
    live2DParameterList = createServerCall<Live2DParameterListEndpoint>(this.bus, 'Live2DParameterList', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', parameters: [] }))
    parameterCreation = createServerCall<ParameterCreationEndpoint>(this.bus, 'ParameterCreation', async ({ parameterName }) => ({ parameterName }))
    parameterDeletion = createServerCall<ParameterDeletionEndpoint>(this.bus, 'ParameterDeletion', async ({ parameterName }) => ({ parameterName }))
    injectParameterData = createServerCall<InjectParameterDataEndpoint>(this.bus, 'InjectParameterData', async () => { })
    ndiConfig = createServerCall<NDIConfigEndpoint>(this.bus, 'NDIConfig', async (args) => args)
}
