import { ApiClient } from 'vtubestudio'
import { useEffect, useState } from 'react'

function App() {
  const [apiClient, setApiClient] = useState(null)
  const [yourTestMessage, setYourTestMessage] = useState('')
  const [counter, setCounter] = useState(0)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelID, setModelID] = useState('')
  const [modelName, setModelName] = useState('')
  const [availableModels, setAvailableModels] = useState([])

  useEffect(() => {
    const apiClient = new ApiClient({
      authTokenGetter: () => localStorage.getItem('VTS.JS_TEST_AUTH_TOKEN'),
      authTokenSetter: (authenticationToken) => localStorage.setItem('VTS.JS_TEST_AUTH_TOKEN', authenticationToken),
      pluginDeveloper: 'Hawkbar',
      pluginName: 'VTS.JS Test',
    })

    setApiClient(apiClient)

    apiClient.on('connect', async () => {
      const { availableModels } = await apiClient.availableModels()
      setAvailableModels(availableModels)

      await apiClient.events.modelLoaded.subscribe(({ modelLoaded, modelID, modelName }) => {
        setModelLoaded(modelLoaded)
        setModelID(modelID)
        setModelName(modelName)
      })

      await apiClient.events.test.subscribe(({ yourTestMessage, counter }) => {
        setYourTestMessage(yourTestMessage)
        setCounter(counter)
      }, {
        testMessageForEvent: 'Echo test'
      })

      const { modelLoaded, modelID, modelName } = await apiClient.currentModel()
      setModelLoaded(modelLoaded)
      setModelID(modelID)
      setModelName(modelName)
    })

  }, [])

  return (
    <div className="App">
      <ul>
        <li>Test Event: {yourTestMessage} - {counter}</li>
        <li>Model Loaded: {modelLoaded ? 'Yes' : 'No'}</li>
        <li>Model ID: {modelID}</li>
        <li>Model Name: {modelName}</li>
        <li>Available Models:</li>
        <ul>
          {availableModels.map(m => <li key={m.modelID}>
            <button onClick={() => apiClient?.modelLoad({ modelID: m.modelID })}>{m.modelName}</button>
          </li>)}
        </ul>

      </ul>
    </div>
  )
}

export default App
