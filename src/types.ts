
export enum ErrorCode {
    Unknown = NaN,

    InternalClientError = -100,

    // General
    Unset = -1,
    InternalServerError = 0,
    APIAccessDeactivated = 1,
    JSONInvalid = 2,
    APINameInvalid = 3,
    APIVersionInvalid = 4,
    RequestIDInvalid = 5,
    RequestTypeMissingOrEmpty = 6,
    RequestTypeUnknown = 7,
    RequestRequiresAuthetication = 8,
    RequestRequiresPermission = 9,

    // AuthenticationToken
    TokenRequestDenied = 50,
    TokenRequestCurrentlyOngoing = 51,
    TokenRequestPluginNameInvalid = 52,
    TokenRequestDeveloperNameInvalid = 53,
    TokenRequestPluginIconInvalid = 54,

    // Authentication
    AuthenticationTokenMissing = 100,
    AuthenticationPluginNameMissing = 101,
    AuthenticationPluginDeveloperMissing = 102,

    // ModelLoad
    ModelIDMissing = 150,
    ModelIDInvalid = 151,
    ModelIDNotFound = 152,
    ModelLoadCooldownNotOver = 153,
    CannotCurrentlyChangeModel = 154,

    // HotkeyTrigger
    HotkeyQueueFull = 200,
    HotkeyExecutionFailedBecauseNoModelLoaded = 201,
    HotkeyIDNotFoundInModel = 202,
    HotkeyCooldownNotOver = 203,
    HotkeyIDFoundButHotkeyDataInvalid = 204,
    HotkeyExecutionFailedBecauseBadState = 205,
    HotkeyUnknownExecutionFailure = 206,
    HotkeyExecutionFailedBecauseLive2DItemNotFound = 207,
    HotkeyExecutionFailedBecauseLive2DItemsDoNotSupportThisHotkeyType = 208,

    // ColorTint
    ColorTintRequestNoModelLoaded = 250,
    ColorTintRequestMatchOrColorMissing = 251,
    ColorTintRequestInvalidColorValue = 252,

    // MoveModel
    MoveModelRequestNoModelLoaded = 300,
    MoveModelRequestMissingFields = 301,
    MoveModelRequestValuesOutOfRange = 302,

    // ParameterCreation
    CustomParamNameInvalid = 350,
    CustomParamValuesInvalid = 351,
    CustomParamAlreadyCreatedByOtherPlugin = 352,
    CustomParamExplanationTooLong = 353,
    CustomParamDefaultParamNameNotAllowed = 354,
    CustomParamLimitPerPluginExceeded = 355,
    CustomParamLimitTotalExceeded = 356,

    // ParameterDeletion
    CustomParamDeletionNameInvalid = 400,
    CustomParamDeletionNotFound = 401,
    CustomParamDeletionCreatedByOtherPlugin = 402,
    CustomParamDeletionCannotDeleteDefaultParam = 403,

    // InjectParameterData
    InjectDataNoDataProvided = 450,
    InjectDataValueInvalid = 451,
    InjectDataWeightInvalid = 452,
    InjectDataParamNameNotFound = 453,
    InjectDataParamControlledByOtherPlugin = 454,
    InjectDataModeUnknown = 455,

    // ParameterValue
    ParameterValueRequestParameterNotFound = 500,

    // NDIConfig
    NDIConfigCooldownNotOver = 550,
    NDIConfigResolutionInvalid = 551,

    // ExpressionState
    ExpressionStateRequestInvalidFilename = 600,
    ExpressionStateRequestFileNotFound = 601,

    // ExpressionActivation
    ExpressionActivationRequestInvalidFilename = 650,
    ExpressionActivationRequestFileNotFound = 651,
    ExpressionActivationRequestNoModelLoaded = 652,

    // SetCurrentModelPhysics
    SetCurrentModelPhysicsRequestNoModelLoaded = 700,
    SetCurrentModelPhysicsRequestModelHasNoPhysics = 701,
    SetCurrentModelPhysicsRequestPhysicsControlledByOtherPlugin = 702,
    SetCurrentModelPhysicsRequestNoOverridesProvided = 703,
    SetCurrentModelPhysicsRequestPhysicsGroupIDNotFound = 704,
    SetCurrentModelPhysicsRequestNoOverrideValueProvided = 705,
    SetCurrentModelPhysicsRequestDuplicatePhysicsGroupID = 706,

    // ItemLoad
    ItemFileNameMissing = 750,
    ItemFileNameNotFound = 751,
    ItemLoadLoadCooldownNotOver = 752,
    CannotCurrentlyLoadItem = 753,
    CannotLoadItemSceneFull = 754,
    ItemOrderInvalid = 755,
    ItemOrderAlreadyTaken = 756,
    ItemLoadValuesInvalid = 757,
    ItemCustomDataInvalid = 758,
    ItemCustomDataCannotAskRightNow = 759,
    ItemCustomDataLoadRequestRejectedByUser = 760,

    // ItemUnload
    CannotCurrentlyUnloadItem = 800,

    // ItemAnimationControl
    ItemAnimationControlInstanceIDNotFound = 850,
    ItemAnimationControlUnsupportedItemType = 851,
    ItemAnimationControlAutoStopFramesInvalid = 852,
    ItemAnimationControlTooManyAutoStopFrames = 853,
    ItemAnimationControlSimpleImageDoesNotSupportAnim = 854,

    // ItemMove
    ItemMoveRequestInstanceIDNotFound = 900,
    ItemMoveRequestInvalidFadeMode = 901,
    ItemMoveRequestItemOrderTakenOrInvalid = 902,
    ItemMoveRequestCannotCurrentlyChangeOrder = 903,

    // EventSubscription
    EventSubscriptionRequestEventTypeUnknown = 950,

    //ArtMeshSelection
    ArtMeshSelectionRequestNoModelLoaded = 1000,
    ArtMeshSelectionRequestOtherWindowsOpen = 1001,
    ArtMeshSelectionRequestModelDoesNotHaveArtMesh = 1002,
    ArtMeshSelectionRequestArtMeshIDListError = 1003,

    //ItemPin
    ItemPinRequestGivenItemNotLoaded = 1050,
    ItemPinRequestInvalidAngleOrSizeType = 1051,
    ItemPinRequestModelNotFound = 1052,
    ItemPinRequestArtMeshNotFound = 1053,
    ItemPinRequestPinPositionInvalid = 1054,

    //Permission
    PermissionRequestUnknownPermission = 1100,
    PermissionRequestCannotRequestRightNow = 1101,
    PermissionRequestFileProblem = 1102,

    //Event
    Event_TestEvent_TestMessageTooLong = 100000,
    Event_ModelLoadedEvent_ModelIDInvalid = 100050,
}

export enum HotkeyType {
    Unset = -1,
    TriggerAnimation = 0,
    ChangeIdleAnimation = 1,
    ToggleExpression = 2,
    RemoveAllExpressions = 3,
    MoveModel = 4,
    ChangeBackground = 5,
    ReloadMicrophone = 6,
    ReloadTextures = 7,
    CalibrateCam = 8,
    ChangeVTSModel = 9,
    TakeScreenshot = 10,
    ScreenColorOverlay = 11,
    RemoveAllItems = 12,
    ToggleItemScene = 13,
    DownloadRandomWorkshopItem = 14,
    ExecuteItemAction = 15,
    ArtMeshColorPreset = 16,
    ToggleTracker = 17,
    ToggleTwitchFeature = 18,
    LoadEffectPreset = 19,
}

export enum RestrictedRawKey {
    LeftMouseButton = 0x01,
    RightMouseButton = 0x02,
    MiddleMouseButton = 0x04,
    Tab = 0x09,
    CapsLock = 0x14,
    Escape = 0x1B,
    Space = 0x20,
    Left = 0x25,
    Up = 0x26,
    Right = 0x27,
    Down = 0x28,
    Print = 0x2A,
    Delete = 0x2E,
    PageUp = 0x21,
    PageDown = 0x22,
    N0 = 0x30,
    N1 = 0x31,
    N2 = 0x32,
    N3 = 0x33,
    N4 = 0x34,
    N5 = 0x35,
    N6 = 0x36,
    N7 = 0x37,
    N8 = 0x38,
    N9 = 0x39,
    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
    Q = 0x51,
    R = 0x52,
    S = 0x53,
    T = 0x54,
    U = 0x55,
    V = 0x56,
    W = 0x57,
    X = 0x58,
    Y = 0x59,
    Z = 0x5A,
    LeftWindows = 0x5B,
    RightWindows = 0x5C,
    Numpad0 = 0x60,
    Numpad1 = 0x61,
    Numpad2 = 0x62,
    Numpad3 = 0x63,
    Numpad4 = 0x64,
    Numpad5 = 0x65,
    Numpad6 = 0x66,
    Numpad7 = 0x67,
    Numpad8 = 0x68,
    Numpad9 = 0x69,
    Multiply = 0x6A,
    Add = 0x6B,
    Subtract = 0x6D,
    Decimal = 0x6E,
    Divide = 0x6F,
    F1 = 0x70,
    F2 = 0x71,
    F3 = 0x72,
    F4 = 0x73,
    F5 = 0x74,
    F6 = 0x75,
    F7 = 0x76,
    F8 = 0x77,
    F9 = 0x78,
    F10 = 0x79,
    F11 = 0x7A,
    F12 = 0x7B,
    F13 = 0x7C,
    F14 = 0x7D,
    F15 = 0x7E,
    F16 = 0x7F,
    F17 = 0x80,
    F18 = 0x81,
    F19 = 0x82,
    F20 = 0x83,
    F21 = 0x84,
    F22 = 0x85,
    F23 = 0x86,
    F24 = 0x87,
    NumLock = 0x90,
    ScrollLock = 0x91,
    LeftShift = 0xA0,
    RightShift = 0xA1,
    LeftControl = 0xA2,
    RightControl = 0xA3,
    Alt = 0xA4,
}

export type ItemType = 'PNG' | 'JPG' | 'GIF' | 'AnimationFolder' | 'Live2D' | 'Unknown'

export interface BaseParameter {
    name: string
    value: number
    min: number
    max: number
    defaultValue: number
}

export interface ILive2DParameter extends BaseParameter { }

export interface IVTSParameter extends BaseParameter {
    addedBy: string
}

export type PermissionType = 'LoadCustomImagesAsItems'
