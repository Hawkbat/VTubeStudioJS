const vts = require('vtubestudio')
const fs = require('fs')

const apiClient = new vts.ApiClient({
    authTokenGetter: () => fs.readFileSync('./auth-token.txt', 'utf-8'),
    authTokenSetter: (authenticationToken) => fs.writeFileSync('./auth-token.txt', authenticationToken, { encoding: 'utf-8' }),
    pluginName: 'VTS.JS Test',
    pluginDeveloper: 'Hawkbar',
})

apiClient.on('connect', async () => {

    const stats = await apiClient.statistics()

    console.log(`Connected to VTube Studio v${stats.vTubeStudioVersion}`)

    console.log('Getting list of available models')
    const { availableModels } = await apiClient.availableModels()

    console.log('Adding event callback whenever a model is loaded')
    await apiClient.events.modelLoaded.subscribe((data) => {
        if (data.modelLoaded) {
            console.log('Model loaded, queuing up a random model switch')
            setTimeout(async () => {
                console.log('Switching to random model')
                const otherModels = availableModels.filter(m => m.modelID !== data.modelID)
                const randomModel = otherModels[Math.floor(otherModels.length * Math.random())]
                console.log('Switching to ' + randomModel.modelName)
                await apiClient.modelLoad({ modelID: randomModel.modelID })
            }, 3000)
        }
    })
})
