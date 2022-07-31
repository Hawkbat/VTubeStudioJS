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

This library is platform-agnostic, allowing it to be used for both Node projects and for browsers via tools like webpack. Since it cannot rely on there being an existing WebSocket implementation, you must provide a WebSocket object:

```javascript
import { ApiClient } from "vtubestudio";

// A websocket-like object, such as the one provided by the browser or a Node package like 'ws'
const webSocket = new WebSocket("ws://localhost:8001");

const apiClient = ApiClient.fromWebSocket(webSocket);
```

The API client exposes the request/response message pairs provided by the VTube Studio API as single asynchronous functions. Before you can make any other calls, you first need to authenticate with VTube Studio:

```javascript
let authenticationToken = await tryRetrieveAuthToken(); // You should store the authentication token and attempt to retrieve it here

const pluginName = "My Cool Plugin"; // Give your plugin a name here
const pluginDeveloper = "My Name Here"; // Put your username or handle here

if (!authenticationToken) {
  // This prompts the user to authorize your plugin, and generates an authentication token for you to keep track of
  const response = await apiClient.authenticationToken({
    pluginName,
    pluginDeveloper,
  });
  authenticationToken = response.authenticationToken;
  // You should save the authentication token somewhere and use it when re-authenticating so the user doesn't get prompted again
  await storeAuthToken(authenticationToken);
}

// Authenticate the plugin using the retrieved authentication token
await apiClient.authentication({
  pluginName,
  pluginDeveloper,
  authenticationToken,
});
```

Once you have successfully authenticated, you can make calls to the API. For example, to load a new model in the running instance of VTube Studio:

```javascript
try {
  const response = await apiClient.modelLoad({ modelID: "YourNewModelID" });
  console.log("Successfully loaded model:", response.modelID);
} catch (e) {
  console.error("Failed to load model:", e.errorID, e.message);
}
```

> See the official [VTube Studio API documentation](https://github.com/DenchiSoft/VTubeStudio) for more details on what calls are available and what each field means. In general, you pass an object representing the `data` property of the request to the library method, and get an object back representing the `data` property of the response. If the request `data` object is empty, the request method instead takes no parameters, and if the response `data` object is empty, the request method returns `Promise<void>`.

An additional options object may be passed as the second parameter to control the execution of the API call. For example, to change the default timeout to 1 minute:

```javascript
const stats = await apiClient.statistics({}, { timeout: 1 * 60 * 1000 });
```

## Breaking Changes in 2.x.x

Version `v2.x.x` contains several breaking changes from previous versions:

- The constructor for `ApiClient` was marked as private, and replaced with two factory methods: `ApiClient.fromWebSocket(ws)` and `ApiClient.fromMessageBus(bus)`, to avoid unnecessarily exposing the end user to the library's message bus abstractions.
  - It is recommended that normal users should pass the websocket object to `ApiClient.fromWebSocket(ws)` directly instead of creating a `WebSocketBus` and passing that to `new ApiClient(bus)` or `ApiClient.fromMessageBus(bus)`.
- The object-oriented wrapper classes (`Plugin`, `CurrentModel`, `Expression`, etc.) have been deprecated, and will be removed in the next major version. The stateful nature of the wrappers implied that they were somehow synchronized with VTube Studio, but this was not the case. This became even more obvious with the introduction of highly dynamic concepts like Live2D items and expressions.
  - Users should switch to making calls to the API directly using the `ApiClient` class instead of the methods on `Plugin`. This unfortunately also includes handling the authentication workflow yourself for now. A basic example is provided above.
  - A future release may extend the `ApiClient` class to provide the automatic authentication handling that the `Plugin` class provided.
- The `MockApiServer` class has been removed (as well as the related class `EchoBus`). This class was not intended to be used in production code and was a poor substitute for testing against VTube Studio itself.
- Expression parameters were changed to use the new shape `{ name: string, value: number }` instead of the deprecated `{ id: string, target: number }`.
- The `ErrorCode` enum values `InternalClientError`, `MessageBusError`, and `MessageBusClosed` were changed to `-100`, -`101`, and `-102` to avoid conflicting with `-1` (used in the VTube Studio API to indicate the absence of an error).
  - Code using the enum itself should continue to work as expected, but any code directly checking for the error code numbers will need to be manually fixed.

## Contributing

Pull requests welcome! Please adhere to the linting and default formatting provided by the TypeScript compiler, and ensure that your code successfully compiles before opening your PR.

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
