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
        file: string
        hotkeyID: string
    }[]
}> { }

interface HotkeyTriggerEndpoint extends IApiEndpoint<'HotkeyTrigger', {
    hotkeyID: string
}, {
    hotkeyID: string
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

export class ApiClient {
    constructor(private bus: IMessageBus) { }

    apiState = createClientCall<APIStateEndpoint>(this.bus, 'APIState')
    authenticationToken = createClientCall<AuthenticationTokenEndpoint>(this.bus, 'AuthenticationToken')
    authentication = createClientCall<AuthenticationEndpoint>(this.bus, 'Authentication')
    statistics = createClientCall<StatisticsEndpoint>(this.bus, 'Statistics')
    vtsFolderInfo = createClientCall<VTSFolderInfoEndpoint>(this.bus, 'VTSFolderInfo')
    currentModel = createClientCall<CurrentModelEndpoint>(this.bus, 'CurrentModel')
    availableModels = createClientCall<AvailableModelsEndpoint>(this.bus, 'AvailableModels')
    modelLoad = createClientCall<ModelLoadEndpoint>(this.bus, 'ModelLoad')
    moveModel = createClientCall<MoveModelEndpoint>(this.bus, 'MoveModel')
    hotkeysInCurrentModel = createClientCall<HotkeysInCurrentModelEndpoint>(this.bus, 'HotkeysInCurrentModel')
    hotkeyTrigger = createClientCall<HotkeyTriggerEndpoint>(this.bus, 'HotkeyTrigger')
    artMeshList = createClientCall<ArtMeshListEndpoint>(this.bus, 'ArtMeshList')
    colorTint = createClientCall<ColorTintEndpoint>(this.bus, 'ColorTint')
    faceFound = createClientCall<FaceFoundEndpoint>(this.bus, 'FaceFound')
    inputParameterList = createClientCall<InputParameterListEndpoint>(this.bus, 'InputParameterList')
    parameterValue = createClientCall<ParameterValueEndpoint>(this.bus, 'ParameterValue')
    live2DParameterList = createClientCall<Live2DParameterListEndpoint>(this.bus, 'Live2DParameterList')
    parameterCreation = createClientCall<ParameterCreationEndpoint>(this.bus, 'ParameterCreation')
    parameterDeletion = createClientCall<ParameterDeletionEndpoint>(this.bus, 'ParameterDeletion')
    injectParameterData = createClientCall<InjectParameterDataEndpoint>(this.bus, 'InjectParameterData')
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
    artMeshList = createServerCall<ArtMeshListEndpoint>(this.bus, 'ArtMeshList', async () => ({ modelLoaded: true, numberOfArtMeshNames: 0, numberOfArtMeshTags: 0, artMeshNames: [], artMeshTags: [] }))
    colorTint = createServerCall<ColorTintEndpoint>(this.bus, 'ColorTint', async () => ({ matchedArtMeshes: 0 }))
    faceFound = createServerCall<FaceFoundEndpoint>(this.bus, 'FaceFound', async () => ({ found: true }))
    inputParameterList = createServerCall<InputParameterListEndpoint>(this.bus, 'InputParameterList', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', customParameters: [], defaultParameters: [] }))
    parameterValue = createServerCall<ParameterValueEndpoint>(this.bus, 'ParameterValue', async () => ({ name: 'Param', addedBy: '', min: 0, max: 0, value: 0, defaultValue: 0 }))
    live2DParameterList = createServerCall<Live2DParameterListEndpoint>(this.bus, 'Live2DParameterList', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', parameters: [] }))
    parameterCreation = createServerCall<ParameterCreationEndpoint>(this.bus, 'ParameterCreation', async ({ parameterName }) => ({ parameterName }))
    parameterDeletion = createServerCall<ParameterDeletionEndpoint>(this.bus, 'ParameterDeletion', async ({ parameterName }) => ({ parameterName }))
    injectParameterData = createServerCall<InjectParameterDataEndpoint>(this.bus, 'InjectParameterData', async () => { })
}
