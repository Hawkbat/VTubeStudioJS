
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

    //PostProcessingList
    PostProcessingListReqestInvalidFilter = 1150,

    //PostProcessingUpdate
    PostProcessingUpdateReqestCannotUpdateRightNow = 1200,
    PostProcessingUpdateRequestFadeTimeInvalid = 1201,
    PostProcessingUpdateRequestLoadingPresetAndValues = 1202,
    PostProcessingUpdateRequestPresetFileLoadFailed = 1203,
    PostProcessingUpdateRequestValueListInvalid = 1204,
    PostProcessingUpdateRequestValueListContainsDuplicates = 1205,
    PostProcessingUpdateRequestTriedToLoadRestrictedEffect = 1206,

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

export type PostProcessingEffectID =
    | 'ColorGrading'
    | 'WeatherEffects'
    | 'Bloom'
    | 'Backlight'
    | 'CustomParticles'
    | 'BackgroundShift'
    | 'SimpleOverlay'
    | 'Vignette'
    | 'ChromaticAberration'
    | 'OldFilm'
    | 'Lowfps'
    | 'Datamosh'
    | 'LineScanner'
    | 'ParticleShower'
    | 'AnalogGlitch'
    | 'DigitalGlitch'
    | 'Letterbox'
    | 'FoggyWindow'
    | 'Speedlines'
    | 'Pixelation'
    | 'LensDistortion'
    | 'WaveDistortion'
    | 'BlurEffects'
    | 'Grain'
    | 'Vhs'
    | 'Outline'
    | 'Posterize'
    | 'Ascii'
    | 'ModelGlitch'

export type PostProcessingEffectConfigType = 'Float' | 'Int' | 'Bool' | 'String' | 'Color' | 'SceneItem'

interface BasePostProcessingConfigEntry<T extends PostProcessingEffectConfigType> {
    internalID: string
    enumID: PostProcessingEffectConfigID
    explanation: string
    type: T
    activationConfig: boolean
}

export interface FloatPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'Float'> {
    floatValue: number
    floatMin: number
    floatMax: number
    floatDefault: number
}

export interface IntPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'Int'> {
    intValue: number
    intMin: number
    intMax: number
    intDefault: number
}

export interface BoolPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'Bool'> {
    boolValue: boolean
    boolDefault: boolean
}

export interface StringPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'String'> {
    stringValue: string
    stringDefault: string
}

export interface ColorPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'Color'> {
    colorValue: string
    colorDefault: string
    colorHasAlpha: boolean
}

export interface SceneItemPostProcessingConfigEntry extends BasePostProcessingConfigEntry<'SceneItem'> {
    sceneItemValue: string
    sceneItemDefault: string
}

export type AnyPostProcessingConfigEntry =
    | FloatPostProcessingConfigEntry
    | IntPostProcessingConfigEntry
    | BoolPostProcessingConfigEntry
    | StringPostProcessingConfigEntry
    | ColorPostProcessingConfigEntry
    | SceneItemPostProcessingConfigEntry

export enum PostProcessingEffectConfigID {
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    ColorGrading_Strength = 'ColorGrading_Strength',
    /**
    * type: Float, sets_active: False
    * min: -180, max: 180
    * default: 0
    * explanation: Hue shift
    */
    ColorGrading_HueShift = 'ColorGrading_HueShift',
    /**
    * type: Float, sets_active: False
    * min: -100, max: 100
    * default: 0
    * explanation: Saturation
    */
    ColorGrading_Saturation = 'ColorGrading_Saturation',
    /**
    * type: Float, sets_active: False
    * min: -100, max: 100
    * default: 0
    * explanation: Brightness
    */
    ColorGrading_Brightness = 'ColorGrading_Brightness',
    /**
    * type: Float, sets_active: False
    * min: -100, max: 100
    * default: 0
    * explanation: Contrast
    */
    ColorGrading_Contrast = 'ColorGrading_Contrast',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: False
    * explanation: Color filter
    */
    ColorGrading_ColorFilter = 'ColorGrading_ColorFilter',
    /**
    * type: Float, sets_active: False
    * min: -100, max: 100
    * default: 0
    * explanation: Whitebalance temperature
    */
    ColorGrading_WhitebalanceTemperature = 'ColorGrading_WhitebalanceTemperature',
    /**
    * type: Float, sets_active: False
    * min: -100, max: 100
    * default: 0
    * explanation: Whitebalance tint
    */
    ColorGrading_WhitebalanceTint = 'ColorGrading_WhitebalanceTint',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Invert color
    */
    ColorGrading_Invert = 'ColorGrading_Invert',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Rain strength
    */
    WeatherEffects_RainStrength = 'WeatherEffects_RainStrength',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Snow strength
    */
    WeatherEffects_SnowStrength = 'WeatherEffects_SnowStrength',
    /**
    * type: Bool, sets_active: False
    * default: True
    * explanation: Rain  -  In front
    */
    WeatherEffects_RainInFront = 'WeatherEffects_RainInFront',
    /**
    * type: Bool, sets_active: False
    * default: True
    * explanation: Snow  -  In front
    */
    WeatherEffects_SnowInFront = 'WeatherEffects_SnowInFront',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Bloom_Strength = 'Bloom_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Model color darken
    */
    Bloom_ModelColorDarken = 'Bloom_ModelColorDarken',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Background color darken
    */
    Bloom_BackgroundColorDarken = 'Bloom_BackgroundColorDarken',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: Bloom threshold
    */
    Bloom_MainThreshold = 'Bloom_MainThreshold',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Bloom intensity
    */
    Bloom_MainIntensity = 'Bloom_MainIntensity',
    /**
    * type: Color, sets_active: False
    * default: 62159B alpha: False
    * explanation: Bloom tint color
    */
    Bloom_MainColorTint = 'Bloom_MainColorTint',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: Light streak threshold
    */
    Bloom_StreakThreshold = 'Bloom_StreakThreshold',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Light streak intensity
    */
    Bloom_StreakIntensity = 'Bloom_StreakIntensity',
    /**
    * type: Color, sets_active: False
    * default: 870B8F alpha: False
    * explanation: Light streak tint color
    */
    Bloom_StreakColorTint = 'Bloom_StreakColorTint',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: Light streak vertical
    */
    Bloom_StreakVertical = 'Bloom_StreakVertical',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Microphone effect - Microphone volume boosts strength
    */
    Bloom_MicIncreasesBloom = 'Bloom_MicIncreasesBloom',
    /**
    * type: Int, sets_active: False
    * min: 0, max: 10
    * default: 7
    * explanation: Quality - Bloom quality
    */
    Bloom_Quality = 'Bloom_Quality',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Backlight_Strength = 'Backlight_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: Blur BG overlay - For Model
    */
    Backlight_BgBlurOverModel = 'Backlight_BgBlurOverModel',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur BG overlay - For Background
    */
    Backlight_BgBlurOverBg = 'Backlight_BgBlurOverBg',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: Model color darken
    */
    Backlight_DarkenModel = 'Backlight_DarkenModel',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Background color darken
    */
    Backlight_DarkenBg = 'Backlight_DarkenBg',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: Backlight strength - Main
    */
    Backlight_StrengthNormal = 'Backlight_StrengthNormal',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.7
    * explanation: Backlight strength - Directional
    */
    Backlight_StrengthDirectional = 'Backlight_StrengthDirectional',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.9
    * explanation: Backlight brightness limit
    */
    Backlight_BrightnessLimit = 'Backlight_BrightnessLimit',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 360
    * default: 45
    * explanation: Backlight direction
    */
    Backlight_BacklightDirection = 'Backlight_BacklightDirection',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Backlight dir. both sides
    */
    Backlight_BacklightBothDirections = 'Backlight_BacklightBothDirections',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.8
    * explanation: Backlight softness
    */
    Backlight_BacklightSoftness = 'Backlight_BacklightSoftness',
    /**
    * type: Color, sets_active: False
    * default: 5E3E96 alpha: False
    * explanation: Backlight color tint
    */
    Backlight_BacklightColorTint = 'Backlight_BacklightColorTint',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Backlight col. from background
    */
    Backlight_BacklightColorFromBg = 'Backlight_BacklightColorFromBg',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Outline size
    */
    Backlight_OutlineSize = 'Backlight_OutlineSize',
    /**
    * type: Color, sets_active: False
    * default: DD103C alpha: True
    * explanation: Outline color
    */
    Backlight_OutlineColorMain = 'Backlight_OutlineColorMain',
    /**
    * type: Color, sets_active: False
    * default: 070001 alpha: True
    * explanation: Outline stripe color
    */
    Backlight_OutlineColorStripes = 'Backlight_OutlineColorStripes',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Outline stripe count
    */
    Backlight_OutlineStripeCount = 'Backlight_OutlineStripeCount',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0.2
    * explanation: Outline stripe speed
    */
    Backlight_OutlineStripeSpeed = 'Backlight_OutlineStripeSpeed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Outline stripe curve
    */
    Backlight_OutlineStripeCurve = 'Backlight_OutlineStripeCurve',
    /**
    * type: Color, sets_active: False
    * default: 08090C alpha: True
    * explanation: Shadow color
    */
    Backlight_ShadowMainColor = 'Backlight_ShadowMainColor',
    /**
    * type: Float, sets_active: False
    * min: -10, max: 10
    * default: 0
    * explanation: Shadow offset X
    */
    Backlight_ShadowOffsetX = 'Backlight_ShadowOffsetX',
    /**
    * type: Float, sets_active: False
    * min: -10, max: 10
    * default: 0
    * explanation: Shadow offset Y
    */
    Backlight_ShadowOffsetY = 'Backlight_ShadowOffsetY',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off - Multiplier for opacity
    */
    CustomParticles_Strength = 'CustomParticles_Strength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: -0.4
    * explanation: [All] Move with head movement
    */
    CustomParticles_BaseMoveWithHead = 'CustomParticles_BaseMoveWithHead',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: [Sparkle] Amount
    */
    CustomParticles_SparkleStrength = 'CustomParticles_SparkleStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: [Sparkle] Size
    */
    CustomParticles_SparkleSize = 'CustomParticles_SparkleSize',
    /**
    * type: Color, sets_active: False
    * default: FF0000 alpha: True
    * explanation: [Sparkle] Color A
    */
    CustomParticles_SparkleColorA = 'CustomParticles_SparkleColorA',
    /**
    * type: Color, sets_active: False
    * default: E13457 alpha: True
    * explanation: [Sparkle] Color B
    */
    CustomParticles_SparkleColorB = 'CustomParticles_SparkleColorB',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: [Floaty particles] Amount
    */
    CustomParticles_FloatyStrength = 'CustomParticles_FloatyStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: [Floaty particles] Size
    */
    CustomParticles_FloatySize = 'CustomParticles_FloatySize',
    /**
    * type: Color, sets_active: False
    * default: 5F3ACE alpha: True
    * explanation: [Floaty particles] Color A
    */
    CustomParticles_FloatyColorA = 'CustomParticles_FloatyColorA',
    /**
    * type: Color, sets_active: False
    * default: F8899F alpha: True
    * explanation: [Floaty particles] Color B
    */
    CustomParticles_FloatyColorB = 'CustomParticles_FloatyColorB',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: [Fog] Amount
    */
    CustomParticles_CloudStrength = 'CustomParticles_CloudStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Fog] Size
    */
    CustomParticles_CloudSize = 'CustomParticles_CloudSize',
    /**
    * type: Color, sets_active: False
    * default: 832525 alpha: True
    * explanation: [Fog] Color A
    */
    CustomParticles_CloudColorA = 'CustomParticles_CloudColorA',
    /**
    * type: Color, sets_active: False
    * default: C83ACE alpha: True
    * explanation: [Fog] Color B
    */
    CustomParticles_CloudColorB = 'CustomParticles_CloudColorB',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: [Light spheres] Amount
    */
    CustomParticles_SphereStrength = 'CustomParticles_SphereStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.8
    * explanation: [Light spheres] Size
    */
    CustomParticles_SphereSize = 'CustomParticles_SphereSize',
    /**
    * type: Color, sets_active: False
    * default: 3037E9 alpha: True
    * explanation: [Light spheres] Color A
    */
    CustomParticles_SphereColorA = 'CustomParticles_SphereColorA',
    /**
    * type: Color, sets_active: False
    * default: E810AC alpha: True
    * explanation: [Light spheres] Color B
    */
    CustomParticles_SphereColorB = 'CustomParticles_SphereColorB',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: [Hearts] Amount
    */
    CustomParticles_HeartsStrength = 'CustomParticles_HeartsStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Hearts] Size
    */
    CustomParticles_HeartsSize = 'CustomParticles_HeartsSize',
    /**
    * type: Color, sets_active: False
    * default: FF1262 alpha: True
    * explanation: [Hearts] Color A
    */
    CustomParticles_HeartsColorA = 'CustomParticles_HeartsColorA',
    /**
    * type: Color, sets_active: False
    * default: FF0031 alpha: True
    * explanation: [Hearts] Color B
    */
    CustomParticles_HeartsColorB = 'CustomParticles_HeartsColorB',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: [Custom 1] Texture file
    */
    CustomParticles_Custom1TextureFile = 'CustomParticles_Custom1TextureFile',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: True
    * explanation: [Custom 1] Color A
    */
    CustomParticles_Custom1ColorA = 'CustomParticles_Custom1ColorA',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: True
    * explanation: [Custom 1] Color B
    */
    CustomParticles_Custom1ColorB = 'CustomParticles_Custom1ColorB',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 1] Additive Particles - Will make particles shiny
    */
    CustomParticles_Custom1MaterialTypeId = 'CustomParticles_Custom1MaterialTypeId',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 1] Show behind model
    */
    CustomParticles_Custom1InBack = 'CustomParticles_Custom1InBack',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: -0.5
    * explanation: [Custom 1] Move with head movement
    */
    CustomParticles_Custom1MoveWithHead = 'CustomParticles_Custom1MoveWithHead',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Custom 1] Size
    */
    CustomParticles_Custom1Size = 'CustomParticles_Custom1Size',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Custom 1] Amount
    */
    CustomParticles_Custom1Amount = 'CustomParticles_Custom1Amount',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: [Custom 1] Fill to center
    */
    CustomParticles_Custom1FillToCenter = 'CustomParticles_Custom1FillToCenter',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 180
    * default: 15
    * explanation: [Custom 1] Base Rotation
    */
    CustomParticles_Custom1BaseRotation = 'CustomParticles_Custom1BaseRotation',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: [Custom 1] Rotation Speed
    */
    CustomParticles_Custom1RotationSpeed = 'CustomParticles_Custom1RotationSpeed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: [Custom 1] Microphone effect - Microphone volume moves particles faster
    */
    CustomParticles_Custom1MoveFasterMicVol = 'CustomParticles_Custom1MoveFasterMicVol',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: [Custom 2] Texture file
    */
    CustomParticles_Custom2TextureFile = 'CustomParticles_Custom2TextureFile',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: True
    * explanation: [Custom 2] Color A
    */
    CustomParticles_Custom2ColorA = 'CustomParticles_Custom2ColorA',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: True
    * explanation: [Custom 2] Color B
    */
    CustomParticles_Custom2ColorB = 'CustomParticles_Custom2ColorB',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 2] Additive Particles - Will make particles shiny
    */
    CustomParticles_Custom2MaterialTypeId = 'CustomParticles_Custom2MaterialTypeId',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 2] Show behind model
    */
    CustomParticles_Custom2InBack = 'CustomParticles_Custom2InBack',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: -0.5
    * explanation: [Custom 2] Move with head movement
    */
    CustomParticles_Custom2MoveWithHead = 'CustomParticles_Custom2MoveWithHead',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Custom 2] Size
    */
    CustomParticles_Custom2Size = 'CustomParticles_Custom2Size',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: [Custom 2] Amount
    */
    CustomParticles_Custom2Amount = 'CustomParticles_Custom2Amount',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: [Custom 2] Fill to center
    */
    CustomParticles_Custom2FillToCenter = 'CustomParticles_Custom2FillToCenter',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 180
    * default: 15
    * explanation: [Custom 2] Base Rotation
    */
    CustomParticles_Custom2BaseRotation = 'CustomParticles_Custom2BaseRotation',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: [Custom 2] Rotation Speed
    */
    CustomParticles_Custom2RotationSpeed = 'CustomParticles_Custom2RotationSpeed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: [Custom 2] Microphone effect - Microphone volume moves particles faster
    */
    CustomParticles_Custom2MoveFasterMicVol = 'CustomParticles_Custom2MoveFasterMicVol',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    BackgroundShift_Strength = 'BackgroundShift_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Zoom in
    */
    BackgroundShift_ZoomIn = 'BackgroundShift_ZoomIn',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Microphone effect - Microphone volume zooms in
    */
    BackgroundShift_MicZoomIn = 'BackgroundShift_MicZoomIn',
    /**
    * type: Float, sets_active: False
    * min: -2, max: 2
    * default: 0.5
    * explanation: Move from X tracking
    */
    BackgroundShift_TrackingX = 'BackgroundShift_TrackingX',
    /**
    * type: Float, sets_active: False
    * min: -2, max: 2
    * default: 0.5
    * explanation: Move from Y tracking
    */
    BackgroundShift_TrackingY = 'BackgroundShift_TrackingY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Tracking movement smoothing
    */
    BackgroundShift_TrackingSmoothing = 'BackgroundShift_TrackingSmoothing',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.5
    * explanation: Move X randomly
    */
    BackgroundShift_RandomMovementX = 'BackgroundShift_RandomMovementX',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.5
    * explanation: Move Y randomly
    */
    BackgroundShift_RandomMovementY = 'BackgroundShift_RandomMovementY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.15
    * explanation: Rotate randomly
    */
    BackgroundShift_RandomMovementRotation = 'BackgroundShift_RandomMovementRotation',
    /**
    * type: Float, sets_active: False
    * min: 0.01, max: 2
    * default: 0.2
    * explanation: Random movement speed
    */
    BackgroundShift_RandomMovementSpeed = 'BackgroundShift_RandomMovementSpeed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur back visibility
    */
    BackgroundShift_BlurMixBack = 'BackgroundShift_BlurMixBack',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur back strength
    */
    BackgroundShift_BlurMainBack = 'BackgroundShift_BlurMainBack',
    /**
    * type: Float, sets_active: False
    * min: -3, max: 3
    * default: 1
    * explanation: Blur back brightness
    */
    BackgroundShift_BlurBrightnessBack = 'BackgroundShift_BlurBrightnessBack',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur front visibility
    */
    BackgroundShift_BlurMixFront = 'BackgroundShift_BlurMixFront',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur front strength
    */
    BackgroundShift_BlurMainFront = 'BackgroundShift_BlurMainFront',
    /**
    * type: Float, sets_active: False
    * min: -3, max: 3
    * default: 1
    * explanation: Blur front brightness
    */
    BackgroundShift_BlurBrightnessFront = 'BackgroundShift_BlurBrightnessFront',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off - Multiplier for opacity
    */
    SimpleOverlay_Strength = 'SimpleOverlay_Strength',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: Overlay image file
    */
    SimpleOverlay_TextureFile = 'SimpleOverlay_TextureFile',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.35
    * explanation: Zoom in
    */
    SimpleOverlay_ZoomIn = 'SimpleOverlay_ZoomIn',
    /**
    * type: Float, sets_active: False
    * min: -2, max: 2
    * default: -0.5
    * explanation: Move from X tracking
    */
    SimpleOverlay_TrackingX = 'SimpleOverlay_TrackingX',
    /**
    * type: Float, sets_active: False
    * min: -2, max: 2
    * default: -0.5
    * explanation: Move from Y tracking
    */
    SimpleOverlay_TrackingY = 'SimpleOverlay_TrackingY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Tracking movement smoothing
    */
    SimpleOverlay_TrackingSmoothing = 'SimpleOverlay_TrackingSmoothing',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.4
    * explanation: Move X randomly
    */
    SimpleOverlay_RandomMovementX = 'SimpleOverlay_RandomMovementX',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.4
    * explanation: Move Y randomly
    */
    SimpleOverlay_RandomMovementY = 'SimpleOverlay_RandomMovementY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.1
    * explanation: Rotate randomly
    */
    SimpleOverlay_RandomMovementRotation = 'SimpleOverlay_RandomMovementRotation',
    /**
    * type: Float, sets_active: False
    * min: 0.01, max: 2
    * default: 0.2
    * explanation: Random movement speed
    */
    SimpleOverlay_RandomMovementSpeed = 'SimpleOverlay_RandomMovementSpeed',
    /**
    * type: Color, sets_active: False
    * default: FFFFFF alpha: True
    * explanation: Tint color
    */
    SimpleOverlay_TintColor = 'SimpleOverlay_TintColor',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Vignette_Strength = 'Vignette_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.9
    * explanation: Smoothness
    */
    Vignette_Smoothness = 'Vignette_Smoothness',
    /**
    * type: Color, sets_active: False
    * default: 000000 alpha: True
    * explanation: Color
    */
    Vignette_Color = 'Vignette_Color',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Center X
    */
    Vignette_CenterX = 'Vignette_CenterX',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Center Y
    */
    Vignette_CenterY = 'Vignette_CenterY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: Roundness
    */
    Vignette_Roundness = 'Vignette_Roundness',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: Even side length
    */
    Vignette_Circular = 'Vignette_Circular',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    ChromaticAberration_Strength = 'ChromaticAberration_Strength',
    /**
    * type: Bool, sets_active: False
    * default: True
    * explanation: Blur edges
    */
    ChromaticAberration_BlurEdges = 'ChromaticAberration_BlurEdges',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    OldFilm_Strength = 'OldFilm_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 30
    * default: 15
    * explanation: FPS limit
    */
    OldFilm_FilmFps = 'OldFilm_FilmFps',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 5
    * default: 1
    * explanation: Contrast
    */
    OldFilm_FilmContrast = 'OldFilm_FilmContrast',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 4
    * default: 0.9
    * explanation: Film burn
    */
    OldFilm_FilmBurn = 'OldFilm_FilmBurn',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 2
    * default: 0.9
    * explanation: Film dirt size
    */
    OldFilm_FilmSceneCut = 'OldFilm_FilmSceneCut',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Lowfps_Strength = 'Lowfps_Strength',
    /**
    * type: Int, sets_active: False
    * min: 1, max: 60
    * default: 15
    * explanation: FPS limit
    */
    Lowfps_FpsLimit = 'Lowfps_FpsLimit',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: FPS jitter strength
    */
    Lowfps_FpsRandom = 'Lowfps_FpsRandom',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Screen tearing
    */
    Lowfps_ScreenTearing = 'Lowfps_ScreenTearing',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Datamosh_Strength = 'Datamosh_Strength',
    /**
    * type: Int, sets_active: False
    * min: 1, max: 200
    * default: 16
    * explanation: Size
    */
    Datamosh_Size = 'Datamosh_Size',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 60
    * default: 3
    * explanation: Reset after seconds
    */
    Datamosh_ResetAfterSecs = 'Datamosh_ResetAfterSecs',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Entropy
    */
    Datamosh_Entropy = 'Datamosh_Entropy',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Noise Contrast
    */
    Datamosh_NoiseContrast = 'Datamosh_NoiseContrast',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Velocity Scale
    */
    Datamosh_VelocityScale = 'Datamosh_VelocityScale',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Diffusion
    */
    Datamosh_Diffusion = 'Datamosh_Diffusion',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    LineScanner_Strength = 'LineScanner_Strength',
    /**
    * type: Int, sets_active: False
    * min: 1, max: 4
    * default: 1
    * explanation: Direction
    */
    LineScanner_Direction = 'LineScanner_Direction',
    /**
    * type: Int, sets_active: False
    * min: 16, max: 2048
    * default: 1024
    * explanation: Total scan steps
    */
    LineScanner_ScanStepTotal = 'LineScanner_ScanStepTotal',
    /**
    * type: Int, sets_active: False
    * min: 1, max: 16
    * default: 4
    * explanation: Scan step size
    */
    LineScanner_ScanStepSize = 'LineScanner_ScanStepSize',
    /**
    * type: Color, sets_active: False
    * default: 0C0001 alpha: True
    * explanation: Scan line color
    */
    LineScanner_ScanLineColor = 'LineScanner_ScanLineColor',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.15
    * explanation: Scan line size
    */
    LineScanner_ScanLineSize = 'LineScanner_ScanLineSize',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 30
    * default: 3
    * explanation: Wait between scans - Reset after seconds
    */
    LineScanner_ScanLineWaitBetweenScansSecs = 'LineScanner_ScanLineWaitBetweenScansSecs',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off - Multiplier for opacity
    */
    ParticleShower_Strength = 'ParticleShower_Strength',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: [Custom 1] Texture file
    */
    ParticleShower_TextureFile1 = 'ParticleShower_TextureFile1',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: [Custom 2] Texture file
    */
    ParticleShower_TextureFile2 = 'ParticleShower_TextureFile2',
    /**
    * type: SceneItem, sets_active: False
    * default: 
    * explanation: [Custom 3] Texture file
    */
    ParticleShower_TextureFile3 = 'ParticleShower_TextureFile3',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: [Custom 1] Fall speed
    */
    ParticleShower_Speed1 = 'ParticleShower_Speed1',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: [Custom 2] Fall speed
    */
    ParticleShower_Speed2 = 'ParticleShower_Speed2',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: [Custom 3] Fall speed
    */
    ParticleShower_Speed3 = 'ParticleShower_Speed3',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 1] Show behind model
    */
    ParticleShower_InBack1 = 'ParticleShower_InBack1',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 2] Show behind model
    */
    ParticleShower_InBack2 = 'ParticleShower_InBack2',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: [Custom 3] Show behind model
    */
    ParticleShower_InBack3 = 'ParticleShower_InBack3',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    AnalogGlitch_Strength = 'AnalogGlitch_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Scanline Jitter
    */
    AnalogGlitch_ScanlineJitter = 'AnalogGlitch_ScanlineJitter',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Vertical jump
    */
    AnalogGlitch_VerticalJump = 'AnalogGlitch_VerticalJump',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Horizontal shake
    */
    AnalogGlitch_HorizontalShake = 'AnalogGlitch_HorizontalShake',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Color Drift
    */
    AnalogGlitch_ColorDrift = 'AnalogGlitch_ColorDrift',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Microphone effect - Microphone volume boosts strength
    */
    AnalogGlitch_MicEffect = 'AnalogGlitch_MicEffect',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Strength - Strength of the effect
    */
    DigitalGlitch_Strength = 'DigitalGlitch_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Color Shift - How much to shift the color for this effect?
    */
    DigitalGlitch_Colorshift = 'DigitalGlitch_Colorshift',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Microphone effect - Microphone volume boosts strength
    */
    DigitalGlitch_MicEffect = 'DigitalGlitch_MicEffect',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Letterbox_Strength = 'Letterbox_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.3
    * explanation: Letterbox Y
    */
    Letterbox_ProgressY = 'Letterbox_ProgressY',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Letterbox X
    */
    Letterbox_ProgressX = 'Letterbox_ProgressX',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Zoom in
    */
    Letterbox_Zoom = 'Letterbox_Zoom',
    /**
    * type: Color, sets_active: False
    * default: 000000 alpha: True
    * explanation: Tint color
    */
    Letterbox_Color = 'Letterbox_Color',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    FoggyWindow_Strength = 'FoggyWindow_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Fog amount
    */
    FoggyWindow_FogStrength = 'FoggyWindow_FogStrength',
    /**
    * type: Color, sets_active: False
    * default: 3AABEE alpha: True
    * explanation: Fog color tint
    */
    FoggyWindow_FogTint = 'FoggyWindow_FogTint',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.6
    * explanation: Fog brightness boost
    */
    FoggyWindow_FogBoost = 'FoggyWindow_FogBoost',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.8
    * explanation: Raindrop visibility
    */
    FoggyWindow_RaindropVisibility = 'FoggyWindow_RaindropVisibility',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0.2
    * explanation: Raindrop speed
    */
    FoggyWindow_RaindropSpeed = 'FoggyWindow_RaindropSpeed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.8
    * explanation: Raindrop size
    */
    FoggyWindow_RaindropSize = 'FoggyWindow_RaindropSize',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Fog wipe size
    */
    FoggyWindow_FogWipeSize = 'FoggyWindow_FogWipeSize',
    /**
    * type: Float, sets_active: False
    * min: 2, max: 30
    * default: 5
    * explanation: Fog wipe seconds
    */
    FoggyWindow_FogWipeLifetimeSeconds = 'FoggyWindow_FogWipeLifetimeSeconds',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: Wiped fog stays wiped
    */
    FoggyWindow_FogLifetimeInfinite = 'FoggyWindow_FogLifetimeInfinite',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Speedlines_Strength = 'Speedlines_Strength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: X center
    */
    Speedlines_XCenter = 'Speedlines_XCenter',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Y center
    */
    Speedlines_YCenter = 'Speedlines_YCenter',
    /**
    * type: Color, sets_active: False
    * default: EDEBF8 alpha: True
    * explanation: Speedlines color A
    */
    Speedlines_ColorA = 'Speedlines_ColorA',
    /**
    * type: Color, sets_active: False
    * default: 110101 alpha: True
    * explanation: Speedlines color B
    */
    Speedlines_ColorB = 'Speedlines_ColorB',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Microphone effect - Microphone volume boosts strength
    */
    Speedlines_MicEffect = 'Speedlines_MicEffect',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Pixelation_Strength = 'Pixelation_Strength',
    /**
    * type: Int, sets_active: False
    * min: 10, max: 600
    * default: 128
    * explanation: Resolution
    */
    Pixelation_Resolution = 'Pixelation_Resolution',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: Color filter
    */
    Pixelation_Colorize = 'Pixelation_Colorize',
    /**
    * type: Color, sets_active: False
    * default: 241A1A alpha: True
    * explanation: Color  1
    */
    Pixelation_C1 = 'Pixelation_C1',
    /**
    * type: Color, sets_active: False
    * default: 3F2C2C alpha: True
    * explanation: Color  2
    */
    Pixelation_C2 = 'Pixelation_C2',
    /**
    * type: Color, sets_active: False
    * default: 7D4C4C alpha: True
    * explanation: Color  3
    */
    Pixelation_C3 = 'Pixelation_C3',
    /**
    * type: Color, sets_active: False
    * default: 9C6161 alpha: True
    * explanation: Color  4
    */
    Pixelation_C4 = 'Pixelation_C4',
    /**
    * type: Color, sets_active: False
    * default: B08282 alpha: True
    * explanation: Color  5
    */
    Pixelation_C5 = 'Pixelation_C5',
    /**
    * type: Color, sets_active: False
    * default: E5BDBD alpha: True
    * explanation: Color  6
    */
    Pixelation_C6 = 'Pixelation_C6',
    /**
    * type: Color, sets_active: False
    * default: E9D5D5 alpha: True
    * explanation: Color  7
    */
    Pixelation_C7 = 'Pixelation_C7',
    /**
    * type: Color, sets_active: False
    * default: FEFEFE alpha: True
    * explanation: Color  8
    */
    Pixelation_C8 = 'Pixelation_C8',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Fry
    */
    Pixelation_Fry = 'Pixelation_Fry',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    LensDistortion_Strength = 'LensDistortion_Strength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Lens strength
    */
    LensDistortion_LensStrength = 'LensDistortion_LensStrength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Zoom in
    */
    LensDistortion_ZoomIn = 'LensDistortion_ZoomIn',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Squish
    */
    LensDistortion_Squish = 'LensDistortion_Squish',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    WaveDistortion_Strength = 'WaveDistortion_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Heat wave strength
    */
    WaveDistortion_HeatStrength = 'WaveDistortion_HeatStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.4
    * explanation: Raindrop strength
    */
    WaveDistortion_RaindropStrength = 'WaveDistortion_RaindropStrength',
    /**
    * type: Float, sets_active: False
    * min: 1, max: 5
    * default: 1.6
    * explanation: Raindrop interval (sec)
    */
    WaveDistortion_RaindropFrequency = 'WaveDistortion_RaindropFrequency',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Zoom in
    */
    WaveDistortion_ZoomIn = 'WaveDistortion_ZoomIn',
    /**
    * type: Float, sets_active: False
    * min: -180, max: 180
    * default: 0
    * explanation: Base Rotation
    */
    WaveDistortion_RotationBase = 'WaveDistortion_RotationBase',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.1
    * explanation: Wave strength X
    */
    WaveDistortion_WaveXStrength = 'WaveDistortion_WaveXStrength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0.5
    * explanation: Wave scroll X
    */
    WaveDistortion_WaveXScroll = 'WaveDistortion_WaveXScroll',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Wave frequency X
    */
    WaveDistortion_WaveXFrequency = 'WaveDistortion_WaveXFrequency',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.1
    * explanation: Wave strength Y
    */
    WaveDistortion_WaveYStrength = 'WaveDistortion_WaveYStrength',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0.5
    * explanation: Wave scroll Y
    */
    WaveDistortion_WaveYScroll = 'WaveDistortion_WaveYScroll',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Wave frequency Y
    */
    WaveDistortion_WaveYFrequency = 'WaveDistortion_WaveYFrequency',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    BlurEffects_Strength = 'BlurEffects_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur visibility
    */
    BlurEffects_BasicBlurVisibility = 'BlurEffects_BasicBlurVisibility',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Blur strength
    */
    BlurEffects_BasicBlurStrength = 'BlurEffects_BasicBlurStrength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Pixelation
    */
    BlurEffects_PixelationBlur = 'BlurEffects_PixelationBlur',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Motion blur
    */
    BlurEffects_MotionBlur = 'BlurEffects_MotionBlur',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Grain_Strength = 'Grain_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0.1, max: 3
    * default: 1.7
    * explanation: Size
    */
    Grain_Size = 'Grain_Size',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Luminosity
    */
    Grain_Luminosity = 'Grain_Luminosity',
    /**
    * type: Bool, sets_active: False
    * default: False
    * explanation: Colored
    */
    Grain_Colored = 'Grain_Colored',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Vhs_Strength = 'Vhs_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: Monitor fisheye
    */
    Vhs_Fisheye = 'Vhs_Fisheye',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Vignette
    */
    Vhs_Vignette = 'Vhs_Vignette',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 5
    * default: 1
    * explanation: Sideways blur
    */
    Vhs_ScreenBleed = 'Vhs_ScreenBleed',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Grain noise
    */
    Vhs_NoiseGrain = 'Vhs_NoiseGrain',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.5
    * explanation: Line noise
    */
    Vhs_NoiseLines = 'Vhs_NoiseLines',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 5
    * default: 1
    * explanation: Horizontal twitch (up/down)
    */
    Vhs_TwitchVertical = 'Vhs_TwitchVertical',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 5
    * default: 1
    * explanation: Vertical twitch (left/right)
    */
    Vhs_TwitchHorizontal = 'Vhs_TwitchHorizontal',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.1
    * explanation: Interlacing
    */
    Vhs_Interlacing = 'Vhs_Interlacing',
    /**
    * type: Float, sets_active: False
    * min: -1, max: 1
    * default: 0
    * explanation: Gamma correction
    */
    Vhs_GammaCorrection = 'Vhs_GammaCorrection',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Pale color
    */
    Vhs_PaleColor = 'Vhs_PaleColor',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Afterimage strength
    */
    Vhs_AfterImageAmount = 'Vhs_AfterImageAmount',
    /**
    * type: Color, sets_active: False
    * default: FF6202 alpha: False
    * explanation: Afterimage color
    */
    Vhs_AfterImageColor = 'Vhs_AfterImageColor',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Outline_Strength = 'Outline_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Sharpen image
    */
    Outline_Sharpen = 'Outline_Sharpen',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Outline visibility
    */
    Outline_Visibility = 'Outline_Visibility',
    /**
    * type: Color, sets_active: False
    * default: 000000 alpha: True
    * explanation: Outline color
    */
    Outline_Color = 'Outline_Color',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.9
    * explanation: Outline threshold
    */
    Outline_Threshold = 'Outline_Threshold',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0.2
    * explanation: Outline contrast
    */
    Outline_Contrast = 'Outline_Contrast',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Posterize_Strength = 'Posterize_Strength',
    /**
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Effect on/off
    */
    Ascii_Strength = 'Ascii_Strength',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 10
    * default: 3
    * explanation: Size
    */
    Ascii_Size = 'Ascii_Size',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 1
    * explanation: Character visibility
    */
    Ascii_CharacterVisibility = 'Ascii_CharacterVisibility',
    /**
    * type: Float, sets_active: False
    * min: 0, max: 1
    * default: 0
    * explanation: Color overlay strength
    */
    Ascii_CharacterColorStrength = 'Ascii_CharacterColorStrength',
    /**
    * type: Color, sets_active: False
    * default: 1EB916 alpha: False
    * explanation: Color overlay
    */
    Ascii_CharacterColor = 'Ascii_CharacterColor',
    /**
    * RESTRICTED EXPERIMENTAL EFFECT
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Explode model parts
    */
    ModelGlitch_StrengthExplode = 'ModelGlitch_StrengthExplode',
    /**
    * RESTRICTED EXPERIMENTAL EFFECT
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Wiggle model parts
    */
    ModelGlitch_StrengthWiggle = 'ModelGlitch_StrengthWiggle',
    /**
    * RESTRICTED EXPERIMENTAL EFFECT
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Pulsate model parts
    */
    ModelGlitch_StrengthPulse = 'ModelGlitch_StrengthPulse',
    /**
    * RESTRICTED EXPERIMENTAL EFFECT
    * type: Float, sets_active: True
    * min: 0, max: 1
    * default: 0
    * explanation: Liquify model parts
    */
    ModelGlitch_StrengthLiquify = 'ModelGlitch_StrengthLiquify',
}

export type PermissionType = 'LoadCustomImagesAsItems'
