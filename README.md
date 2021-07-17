# VTubeStudioJS

![npm](https://img.shields.io/npm/v/vtubestudio)
![GitHub](https://img.shields.io/github/license/Hawkbat/VTubeStudioJS)

An implementation of the WebSocket-based VTube Studio API for Node and browser JavaScript.

See the official [VTube Studio API documentation](https://github.com/DenchiSoft/VTubeStudio) for more details on the meaning of individual fields and the behaviors of the various API calls.

## Install

```
npm i vtubestudio
```

This package has no runtime dependencies. To avoid node_modules bloat, use `npm install --only=prod` or `NODE_ENV=production` to skip unnecessary dev dependencies.

## Usage

### Basic Usage

This library is platform-agnostic, allowing it to be used for both Node projects and for browsers via tools like webpack. Since it cannot rely on there being an existing WebSocket implementation, you must provide an intermediate object, a 'message bus', that acts as a platform-agnostic proxy for the API to communicate with. In almost all cases, the provided `WebSocketBus` should cover your needs.

```javascript
import { WebSocketBus } from "vtubestudio";

// A websocket-like object, such as the one provided by the browser or a Node package like 'ws'
const webSocket = new WebSocket("ws://localhost:8001");

const bus = new WebSocketBus(webSocket);
```

Once you have a message bus object wrapping your WebSocket connection, you can instantiate an API client:

```javascript
import { ApiClient } from "vtubestudio";

const apiClient = new ApiClient(bus);
```

The API client exposes the request/response message pairs provided by the VTube Studio API as single asynchronous functions. For example, to fetch general statistics from the running instance of VTube Studio:

```javascript
const stats = await apiClient.statistics();
console.log("VTube Studio verison:", stats.vTubeStudioVersion);
```

> See the official [VTube Studio API documentation](https://github.com/DenchiSoft/VTubeStudio) for more details on what calls are available and what each field means.

### Plugin Wrapper

This library also provides a high-level, object-oriented wrapper for VTube Studio plugins which automatically handles the authentication workflow for you:

```javascript
import { Plugin } from "vtubestudio";

const plugin = new Plugin(apiClient, "MyPluginName", "PluginAuthor");
```

If you would like to persist your plugin's authentication across multiple runs and avoid prompting the user to allow your plugin, use the full constructor which takes an existing token value and a callback when a new token is generated.

```javascript
// Assuming `loadAuthToken` and `saveAuthToken` are functions you have written:
const authToken = loadAuthToken();
const plugin = new Plugin(
  apiClient,
  "MyPluginName",
  "PluginAuthor",
  undefined,
  authToken,
  (newToken) => saveAuthToken(newToken)
);
```

> The callback may be called multiple times if the plugin's authentication expires while running.

The plugin wrapper exposes the raw API calls as object-oriented asynchronous method calls. For example, to load a specific model by name:

```javascript
const availableModels = await plugin.models();
const modelToLoad = availableModels.find((m) => m.name === "SomeModelName");
console.log("Loading model from path", modelToLoad.vtsModelPath);
const loadedModel = await modelToLoad.load();
console.log("Loaded model in", loadedModel.modelLoadTime, "milliseconds");
```

> For details on what methods are available on these wrapper objects, see the TypeScript type definitions.

### Testing

There is also a barebones mock API server implementation provided, if you would like to write tests against your plugin implementation instead of a live version of VTube Studio:

```javascript
import { EchoBus, ApiClient, MockApiServer } from "vtubestudio";

const { clientBus, serverBus } = EchoBus.createLinkedPair();
const client = new ApiClient(clientBus);
const server = new MockApiServer(serverBus);

// use client as normal
```

## Contributing

Pull requests welcome! Please adhere to the linting and default formatting provided by the TypeScript compiler, and ensure that your code successfully compiles with before opening your PR.

After cloning the repository or fetching the latest code:

```
npm install
```

Before opening a pull request, ensure your code compiles:

```
npm run build
```

## License

MIT © 2021 Joshua Thome
