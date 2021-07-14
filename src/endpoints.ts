import { createClientCall, createServerHandler, MessageBus } from './api'
import { ApiEndpoint, VTSParameter, Live2DParameter, HotkeyType } from './types'

interface APIStateEndpoint extends ApiEndpoint<'APIState', {

}, {
    active: boolean
    vTubeStudioVersion: `${number}.${number}.${number}`
    currentSessionAuthenticated: boolean
}> { }

interface AuthenticationTokenEndpoint extends ApiEndpoint<'AuthenticationToken', {
    pluginName: string
    pluginDeveloper: string
    pluginIcon?: string
}, {
    authenticationToken: string
}> { }

interface AuthenticationEndpoint extends ApiEndpoint<'Authentication', {
    pluginName: string
    pluginDeveloper: string
    authenticationToken: string
}, {
    authenticated: boolean
    reason: string
}> { }

interface StatisticsEndpoint extends ApiEndpoint<'Statistics', {

}, {
    uptime: number
    framerate: number
    vTubeStudioVersion: `${number}.${number}.${number}`
    allowedPlugins: number
    connectedPlugins: number
    startedWithSteam: boolean
}> { }

interface CurrentModelEndpoint extends ApiEndpoint<'CurrentModel', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    vtsModelPath: string
    vtsModelIconPath: string
    live2DModelPath: string
    modelLoadTime: number
    timeSinceModelLoaded: number
    numberOfLive2DParameters: number
    numberOfLive2DArtmeshes: number
    hasPhysicsFile: boolean
    numberOfTextures: number
    textureResolution: number
}> { }

interface AvailableModelsEndpoint extends ApiEndpoint<'AvailableModels', {

}, {
    numberOfModels: number
    availableModels: {
        modelLoaded: boolean
        modelName: string
        modelID: string
        vtsModelPath: string
        vtsModelIconPath: string
    }[]
}> { }

interface ModelLoadEndpoint extends ApiEndpoint<'ModelLoad', {
    modelID: string
}, {
    modelID: string
}> { }

interface HotkeysInCurrentModelEndpoint extends ApiEndpoint<'HotkeysInCurrentModel', {

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

interface HotkeyTriggerEndpoint extends ApiEndpoint<'HotkeyTrigger', {
    hotkeyID: string
}, {
    hotkeyID: string
}> { }

interface ParameterListEndpoint extends ApiEndpoint<'ParameterList', {

}, {
    customParameters: VTSParameter[]
    defaultParameters: VTSParameter[]
}> { }

interface ParameterValueEndpoint extends ApiEndpoint<'ParameterValue', {
    name: string
}, VTSParameter> { }

interface Live2DParameterListEndpoint extends ApiEndpoint<'Live2DParameterList', {

}, {
    modelLoaded: boolean
    modelName: string
    modelID: string
    parameters: Live2DParameter[]
}> { }

interface ParameterCreationEndpoint extends ApiEndpoint<'ParameterCreation', {
    parameterName: string
    createdBy: string
    min: number
    max: number
    defaultValue: number
}, {
    parameterName: string
}> { }

interface ParameterDeletionEndpoint extends ApiEndpoint<'ParameterDeletion', {
    parameterName: string
}, {
    parameterName: string
}> { }

interface InjectParameterDataEndpoint extends ApiEndpoint<'InjectParameterData', {
    parameterValues: {
        id: string
        value: number
    }[]
}, {

}> { }

export class ApiClient {
    constructor(private bus: MessageBus) { }

    apiState = createClientCall<APIStateEndpoint>(this.bus, 'APIState')
    authenticationToken = createClientCall<AuthenticationTokenEndpoint>(this.bus, 'AuthenticationToken')
    authentication = createClientCall<AuthenticationEndpoint>(this.bus, 'Authentication')
    statistics = createClientCall<StatisticsEndpoint>(this.bus, 'Statistics')
    currentModel = createClientCall<CurrentModelEndpoint>(this.bus, 'CurrentModel')
    availableModels = createClientCall<AvailableModelsEndpoint>(this.bus, 'AvailableModels')
    modelLoad = createClientCall<ModelLoadEndpoint>(this.bus, 'ModelLoad')
    hotkeysInCurrentModel = createClientCall<HotkeysInCurrentModelEndpoint>(this.bus, 'HotkeysInCurrentModel')
    hotkeyTrigger = createClientCall<HotkeyTriggerEndpoint>(this.bus, 'HotkeyTrigger')
    parameterList = createClientCall<ParameterListEndpoint>(this.bus, 'ParameterList')
    parameterValue = createClientCall<ParameterValueEndpoint>(this.bus, 'ParameterValue')
    live2DParameterList = createClientCall<Live2DParameterListEndpoint>(this.bus, 'Live2DParameterList')
    parameterCreation = createClientCall<ParameterCreationEndpoint>(this.bus, 'ParameterCreation')
    parameterDeletion = createClientCall<ParameterDeletionEndpoint>(this.bus, 'ParameterDeletion')
    injectParameterData = createClientCall<InjectParameterDataEndpoint>(this.bus, 'InjectParameterData')
}

export class MockApiServer {
    constructor(bus: MessageBus) {
        bus.on(createServerHandler<APIStateEndpoint>(bus, 'APIState', async () => ({ active: true, vTubeStudioVersion: '1.9.0', currentSessionAuthenticated: true })))
        bus.on(createServerHandler<AuthenticationTokenEndpoint>(bus, 'AuthenticationToken', async () => ({ authenticationToken: 'MOCK_VTUBE_STUDIO_API' })))
        bus.on(createServerHandler<AuthenticationEndpoint>(bus, 'Authentication', async () => ({ authenticated: true, reason: '' })))
        bus.on(createServerHandler<StatisticsEndpoint>(bus, 'Statistics', async () => ({ vTubeStudioVersion: '1.9.0', allowedPlugins: 1, connectedPlugins: 1, framerate: 30, uptime: 0, startedWithSteam: false })))
        bus.on(createServerHandler<CurrentModelEndpoint>(bus, 'CurrentModel', async () => ({ modelLoaded: true, modelID: 'FAKE_MODEL', modelName: 'Fake Model', vtsModelPath: '', vtsModelIconPath: '', live2DModelPath: '', modelLoadTime: 0, timeSinceModelLoaded: 0, numberOfLive2DArtmeshes: 1, numberOfLive2DParameters: 0, numberOfTextures: 1, textureResolution: 1024, hasPhysicsFile: false })))
        bus.on(createServerHandler<AvailableModelsEndpoint>(bus, 'AvailableModels', async () => ({ numberOfModels: 2, availableModels: [{ modelLoaded: true, modelID: 'FAKE_MODEL', modelName: 'Fake Model', vtsModelPath: '', vtsModelIconPath: '' }, { modelLoaded: false, modelID: 'TEST_MODEL', modelName: 'Test Model', vtsModelPath: '', vtsModelIconPath: '' }] })))
        bus.on(createServerHandler<ModelLoadEndpoint>(bus, 'ModelLoad', async ({ modelID }) => ({ modelID })))
        bus.on(createServerHandler<HotkeysInCurrentModelEndpoint>(bus, 'HotkeysInCurrentModel', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', availableHotkeys: [] })))
        bus.on(createServerHandler<HotkeyTriggerEndpoint>(bus, 'HotkeyTrigger', async ({ hotkeyID }) => ({ hotkeyID })))
        bus.on(createServerHandler<ParameterListEndpoint>(bus, 'ParameterList', async () => ({ customParameters: [], defaultParameters: [] })))
        bus.on(createServerHandler<ParameterValueEndpoint>(bus, 'ParameterValue', async () => ({ name: 'Param', addedBy: '', min: 0, max: 0, value: 0, defaultValue: 0 })))
        bus.on(createServerHandler<Live2DParameterListEndpoint>(bus, 'Live2DParameterList', async () => ({ modelLoaded: true, modelName: 'Test Model', modelID: '', parameters: [] })))
        bus.on(createServerHandler<ParameterCreationEndpoint>(bus, 'ParameterCreation', async ({ parameterName }) => ({ parameterName })))
        bus.on(createServerHandler<ParameterDeletionEndpoint>(bus, 'ParameterDeletion', async ({ parameterName }) => ({ parameterName })))
        bus.on(createServerHandler<InjectParameterDataEndpoint>(bus, 'InjectParameterData', async () => { }))
    }
}
