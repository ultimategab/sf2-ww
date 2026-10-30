import { FRAME_TIME } from "./game.js";

export const FIGHTER_PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;

export const FIGHTER_HURT_DELAY = 7 + 8;

export const FrameDelay = {
  FREEZE:      0,
  TRANSITION: -1,
};

export const FighterDirection = {
  LEFT:  -1,
  RIGHT:  1,
};

export const FighterId = {
  BLANKA:  "BLANKA",
  CHUNLI:  "CHUNLI",
  DHALSIM: "DHALSIM",
  EHONDA:  "EHONDA",
  GUILE:   "GUILE",
  KEN:     "KEN",
  RYU:     "RYU",
  ZANGIEF: "ZANGIEF",
};

export const FighterAttackType = {
  PUNCH: "PUNCH",
  KICK:  "KICK",
};

export const FighterAttackReaction = {
  NORMAL:    0,
  SWEEP:     1,
  JUMP:      2,
  KNOCKDOWN: 4,
};

export const FighterAttackStrength = {
  LIGHT:  "LIGHT",
  MEDIUM: "MEDIUM",
  HEAVY:  "HEAVY",
};

export const FighterHurtBox = {
  HEAD: "HEAD",
  BODY: "BODY",
  FEET: "FEET",
};

export const FighterAttackBaseData = {
  [FighterAttackStrength.LIGHT]: {
    score:  100,
    damage:  12,
    blockPushback: [4, 4, 4, 4, 3, 3, 3, 2, 1, 1, 1],
    slide: {
      velocity: -12 * FRAME_TIME,
      friction: 600,
    },
  },
  [FighterAttackStrength.MEDIUM]: {
    score:  300,
    damage:  20,
    blockPushback: [6, 6, 6, 5, 5, 5, 4, 4, 3, 3, 2, 1, 1, 1, 1, 1],
    slide: {
      velocity: -16 * FRAME_TIME,
      friction: 600,
    },
  },
  [FighterAttackStrength.HEAVY]: {
    score:  500,
    damage:  28,
    blockPushback: [8, 8, 8, 7, 7, 7, 6, 5, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    slide: {
      velocity: -22 * FRAME_TIME,
      friction: 800,
    },
  },
};

export const FighterState = {
  IDLE:             "IDLE",
  WALK_FORWARD:     "WALK_FORWARD",
  WALK_BACKWARD:    "WALK_BACKWARD",
  JUMP_START:       "JUMP_START",
  JUMP_UP:          "JUMP_UP",
  JUMP_FORWARD:     "JUMP_FORWARD",
  JUMP_BACKWARD:    "JUMP_BACKWARD",
  JUMP_LAND:        "JUMP_LAND",
  CROUCH:           "CROUCH",
  CROUCH_DOWN:      "CROUCH_DOWN",
  CROUCH_UP:        "CROUCH_UP",
  IDLE_TURN:        "IDLE_TURN",
  CROUCH_TURN:      "CROUCH_TURN",

  LIGHT_PUNCH:      "LIGHT_PUNCH",
  MEDIUM_PUNCH:     "MEDIUM_PUNCH",
  HEAVY_PUNCH:      "HEAVY_PUNCH",
  LIGHT_KICK:       "LIGHT_KICK",
  MEDIUM_KICK:      "MEDIUM_KICK",
  HEAVY_KICK:       "HEAVY_KICK",

  CROUCH_LIGHT_PUNCH:  "CROUCH_LIGHT_PUNCH",
  CROUCH_MEDIUM_PUNCH: "CROUCH_MEDIUM_PUNCH",
  CROUCH_HEAVY_PUNCH:  "CROUCH_HEAVY_PUNCH",
  CROUCH_LIGHT_KICK:   "CROUCH_LIGHT_KICK",
  CROUCH_MEDIUM_KICK:  "CROUCH_MEDIUM_KICK",
  CROUCH_HEAVY_KICK:   "CROUCH_HEAVY_KICK",

  JUMP_UP_LIGHT_PUNCH:  "JUMP_UP_LIGHT_PUNCH",
  JUMP_UP_MEDIUM_PUNCH: "JUMP_UP_MEDIUM_PUNCH",
  JUMP_UP_HEAVY_PUNCH:  "JUMP_UP_HEAVY_PUNCH",
  JUMP_UP_LIGHT_KICK:   "JUMP_UP_LIGHT_KICK",
  JUMP_UP_MEDIUM_KICK:  "JUMP_UP_MEDIUM_KICK",
  JUMP_UP_HEAVY_KICK:   "JUMP_UP_HEAVY_KICK",

  JUMP_DIAGONAL_LIGHT_PUNCH:  "JUMP_DIAGONAL_LIGHT_PUNCH",
  JUMP_DIAGONAL_MEDIUM_PUNCH: "JUMP_DIAGONAL_MEDIUM_PUNCH",
  JUMP_DIAGONAL_HEAVY_PUNCH:  "JUMP_DIAGONAL_HEAVY_PUNCH",
  JUMP_DIAGONAL_LIGHT_KICK:   "JUMP_DIAGONAL_LIGHT_KICK",
  JUMP_DIAGONAL_MEDIUM_KICK:  "JUMP_DIAGONAL_MEDIUM_KICK",
  JUMP_DIAGONAL_HEAVY_KICK:   "JUMP_DIAGONAL_HEAVY_KICK",

  BLOCK_STAND:        "BLOCK_STAND",
  BLOCK_CROUCH:       "BLOCK_CROUCH",
  BLOCK_STAND_LIGHT:  "BLOCK_STAND_LIGHT",
  BLOCK_STAND_MEDIUM: "BLOCK_STAND_MEDIUM",
  BLOCK_STAND_HEAVY:  "BLOCK_STAND_HEAVY",
  BLOCK_CROUCH_LIGHT:  "BLOCK_CROUCH_LIGHT",
  BLOCK_CROUCH_MEDIUM: "BLOCK_CROUCH_MEDIUM",
  BLOCK_CROUCH_HEAVY:  "BLOCK_CROUCH_HEAVY",

  HURT_HEAD_LIGHT:    "HURT_HEAD_LIGHT",
  HURT_HEAD_MEDIUM:   "HURT_HEAD_MEDIUM",
  HURT_HEAD_HEAVY:    "HURT_HEAD_HEAVY",
  HURT_BODY_LIGHT:    "HURT_BODY_LIGHT",
  HURT_BODY_MEDIUM:   "HURT_BODY_MEDIUM",
  HURT_BODY_HEAVY:    "HURT_BODY_HEAVY",
  HURT_CROUCH_LIGHT:  "HURT_CROUCH_LIGHT",
  HURT_CROUCH_MEDIUM: "HURT_CROUCH_MEDIUM",
  HURT_CROUCH_HEAVY:  "HURT_CROUCH_HEAVY",
  HURT_AIR:           "HURT_AIR",

  SWEEP_FALL:       "SWEEP_FALL",
  SWEEP_GROUNDED:   "SWEEP_GROUNDED",

  KO_AIRBORNE:      "KO_AIRBORNE",
  KO_IMPACT:        "KO_IMPACT",
  KO_BOUNCE:        "KO_BOUNCE",
  KO_GROUNDED:      "KO_GROUNDED",
  GETUP:            "GETUP",
  WINNER_POSE:      "WINNER_POSE",
  LOSER_POSE:       "LOSER_POSE",
};

export const FighterKnockoutWidth = {
  Blanka:  53,
  Chunli:  36,
  Dhalsim: 40,
  EHonda:  56,
  Guile:   40, 
  Ryu:     40,
  Ken:     40, 
  Zangief: 46, 
};

export const PushBox = {
  Blanka: {
    IDLE:   [-24,  -75, 48, 76],
    JUMP:   [-24,  -97, 48, 50],
    CROUCH: [-24,  -49, 48, 50],
  },
  Chunli: {
    IDLE:   [-18,  -69, 36, 70],
    JUMP:   [-18,  -89, 36, 38],
    CROUCH: [-18,  -49, 36, 50],
  },
  Dhalsim: {
    IDLE:   [-22,  -77, 44, 78],
    JUMP:   [-22, -105, 44, 44],
    BEND:   [-22,  -61, 44, 62],
    CROUCH: [-22,  -49, 44, 50],
  },
  EHonda: {
    IDLE:   [-30,  -69, 60, 70],
    JUMP:   [-31,  -96, 62, 60],
    CROUCH: [-30,  -51, 60, 52],
  },
  Guile: {
    IDLE:   [-18,  -77, 36, 78],
    JUMP:   [-18,  -88, 36, 50],
    CROUCH: [-18,  -49, 36, 50],
  },
  Ken: {
    IDLE:   [-16,  -79, 32, 78],
    JUMP:   [-16,  -90, 32, 66],
    BEND:   [-16,  -57, 32, 58],
    CROUCH: [-16,  -49, 32, 50],
  },
  Ryu: {
    IDLE:   [-16,  -79, 32, 78],
    JUMP:   [-16,  -90, 32, 66],
    BEND:   [-16,  -57, 32, 58],
    CROUCH: [-16,  -49, 32, 50],
  },
  Zangief: {
    IDLE:   [-26,  -81, 52, 82],
    JUMP:   [-22, -100, 44, 56],
    CROUCH: [-26,  -55, 52, 56],
  },
};

export const HurtBox = {
  Blanka: {
    IDLE:     [[   4,  -88,   30,   26], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]],
    BACKWARD: [[   2,  -81,   28,   24], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]],
    FORWARD:  [[  31,  -68,   28,   24], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]],
    JUMP:     [[   6, -110,   28,   24], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]],
    BEND:     [[  17,  -52,   28,   24], [ -25,  -52,   54,   30], [ -25,  -25,   54,   26]],
  },
  Chunli: {
    IDLE:     [[ -20,  -87,   30,   20], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]],
    FORWARD:  [[   1,  -86,   30,   20], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]],
    JUMP:     [[  -7, -102,   30,   20], [ -19,  -90,   30,   26], [ -22,  -67,   36,   18]],
    BEND:     [[  -7,  -59,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]],
  },
  Dhalsim: {
    IDLE:     [[   0,  -89,   24,   20], [ -17,  -74,   46,   38], [ -17,  -36,   46,   38]],
    BACKWARD: [[  -6, -100,   24,   22], [ -17,  -74,   46,   38], [ -17,  -36,   46,   38]],
    JUMP:     [[  -1, -115,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]],
    CROUCH:   [[   8,  -64,   24,   20], [ -17,  -49,   46,   26], [ -17,  -28,   46,   30]],
  },
  EHonda: {
    IDLE:     [[  -5,  -85,   30,   26], [ -32,  -68,   62,   40], [ -44,  -28,   76,   28]],
    JUMP:     [[  -9, -119,   30,   26], [ -40, -101,   58,   30], [ -44,  -74,   62,   22]],
    CROUCH:   [[   6,  -61,   30,   22], [ -30,  -54,   62,   30], [ -43,  -24,   80,   24]],
  },
  Guile: {
    IDLE:     [[   2,  -90,   26,   20], [ -14,  -74,   36,   34], [ -14,  -41,   36,   42]],
    BACKWARD: [[ -10,  -95,   22,   20], [ -14,  -74,   36,   34], [ -14,  -41,   36,   42]],
    JUMP:     [[   7,  -94,   26,   20], [  -9,  -78,   42,   24], [  -9,  -57,   42,   14]],
    CROUCH:   [[  -1,  -59,   26,   20], [ -15,  -45,   40,   22], [ -15,  -23,   40,   24]],
  },
  Ken: {
    IDLE:     [[  -8,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    BACKWARD: [[ -19,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    FORWARD:  [[  -3,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    JUMP:     [[ -13, -105,   28,   18], [ -26,  -89,   40,   42], [ -22,  -65,   38,   18]],
    BEND:     [[  -2,  -67,   24,   18], [ -16,  -52,   44,   24], [ -16,  -23,   44,   24]],
    CROUCH:   [[   2,  -60,   24,   18], [ -16,  -45,   44,   24], [ -16,  -23,   44,   24]],
    PUNCH:    [[  10,  -93,   24,   18], [  -7,  -76,   40,   44], [  -7,  -33,   40,   34]],
  },
  Ryu: {
    IDLE:     [[  -8,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    BACKWARD: [[ -19,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    FORWARD:  [[  -3,  -87,   24,   16], [ -26,  -73,   40,   42], [ -26,  -30,   40,   32]],
    JUMP:     [[ -13, -105,   28,   18], [ -26,  -89,   40,   42], [ -22,  -65,   38,   18]],
    BEND:     [[  -2,  -67,   24,   18], [ -16,  -52,   44,   24], [ -16,  -23,   44,   24]],
    CROUCH:   [[   2,  -60,   24,   18], [ -16,  -45,   44,   24], [ -16,  -23,   44,   24]],
    PUNCH:    [[  10,  -93,   24,   18], [  -7,  -76,   40,   44], [  -7,  -33,   40,   34]],
  },
  Zangief: {
    IDLE:     [[  -1, -104,   32,   24], [ -25,  -92,   42,   50], [ -27,  -39,   50,   40]],
    BACKWARD: [[ -28, -109,   32,   24], [ -25,  -92,   42,   50], [ -27,  -39,   50,   40]],
    JUMP:     [[  15, -110,   32,   24], [   3, -102,   40,   32], [   3,  -72,   40,   16]],
    CROUCH:   [[   2,  -65,   32,   24], [ -14,  -60,   50,   32], [ -14,  -31,   50,   32]],
  },
};

export const FighterShadows = {
  Blanka: {
    GROUND: [[  9,  65,  84, 12], [42, 8]],
    AIR:    [[251,  33,  80, 12], [40, 8]],
  },
  Chunli: {
    GROUND: [[133,  33,  76, 11], [38, 7]],
    AIR:    [[257,   1,  68, 11], [34, 7]],
  },
  Dhalsim: {
    GROUND: [[133,  33,  76, 11], [38, 7]],
    AIR:    [[257,   1,  68, 11], [34, 7]],
  },
  EHonda: {
    GROUND: [[241,  97, 100, 12], [50, 8]],
    AIR:    [[123,  97,  96, 12], [48, 8]],
  },
  Guile: {
    GROUND: [[ 17,  33,  68, 11], [34, 7]],
    AIR:    [[141,   1,  60, 11], [30, 7]],
  },
  Ken: {
    GROUND: [[ 17,  33,  68, 11], [34, 7]],
    AIR:    [[141,   1,  60, 11], [30, 7]],
  },
  Ryu: {
    GROUND: [[ 17,  33,  68, 11], [34, 7]],
    AIR:    [[141,   1,  60, 11], [30, 7]],
  },
  Zangief: {
    GROUND: [[  4,  97,  94, 11], [42, 7]],
    AIR:    [[127,  65,  88, 11], [39, 7]],
  },
};

export const ShadowFrames = [
  [13, [[251,  33,  80, 12], [ 40,  8]]],
  [14, [[  9,  65,  84, 12], [ 42,  8]]],
  [15, [[247,  65,  88, 12], [ 44,  8]]],
  [17, [[241,  97, 100, 12], [ 50,  8]]],
  [25, [[ 23,   1,  56, 11], [ 28,  7]]],
  [26, [[141,   1,  60, 11], [ 30,  7]]],
  [27, [[ 17,  33,  68, 11], [ 34,  7]]],
  [29, [[133,  33,  76, 11], [ 38,  7]]],
  [36, [[127,  65,  88, 11], [ 42,  7]]],
  [38, [[  4,  97,  94, 11], [ 42,  7]]],
];

export const StageShadowColors = {
  BlankaStage:  "#605000",
  ChunliStage:  "#887000",
  DhalsimStage: "#006000",
  EHondaStage:  "#000070",
  GuileStage:   "#505050",
  KenStage:     "#700000",
  RyuStage:     "#700000",
  ZangiefStage: "#506060",
};

export const JumpStates = [
  FighterState.JUMP_UP,
  FighterState.JUMP_FORWARD,
  FighterState.JUMP_BACKWARD,
];

export const JumpAttackStates = [
  FighterState.JUMP_UP_LIGHT_PUNCH, FighterState.JUMP_UP_MEDIUM_PUNCH, FighterState.JUMP_UP_HEAVY_PUNCH,
  FighterState.JUMP_UP_LIGHT_KICK,  FighterState.JUMP_UP_MEDIUM_KICK,  FighterState.JUMP_UP_HEAVY_KICK,
  FighterState.JUMP_DIAGONAL_LIGHT_PUNCH, FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH, FighterState.JUMP_DIAGONAL_HEAVY_PUNCH,
  FighterState.JUMP_DIAGONAL_LIGHT_KICK,  FighterState.JUMP_DIAGONAL_MEDIUM_KICK,  FighterState.JUMP_DIAGONAL_HEAVY_KICK,
];

export const CrouchAttackStates = [
  FighterState.CROUCH_LIGHT_PUNCH, FighterState.CROUCH_MEDIUM_PUNCH, FighterState.CROUCH_HEAVY_PUNCH,
  FighterState.CROUCH_LIGHT_KICK,  FighterState.CROUCH_MEDIUM_KICK,  FighterState.CROUCH_HEAVY_KICK,
];

export const CrouchHurtStates = [
  FighterState.HURT_CROUCH_LIGHT,
  FighterState.HURT_CROUCH_MEDIUM,
  FighterState.HURT_CROUCH_HEAVY,
];

export const BlockStates = [
  FighterState.BLOCK_STAND,
  FighterState.BLOCK_CROUCH,
  FighterState.BLOCK_STAND_LIGHT,  FighterState.BLOCK_STAND_MEDIUM,  FighterState.BLOCK_STAND_HEAVY,
  FighterState.BLOCK_CROUCH_LIGHT, FighterState.BLOCK_CROUCH_MEDIUM, FighterState.BLOCK_CROUCH_HEAVY,
];

export const CrouchingStates = [
  FighterState.CROUCH,
  FighterState.CROUCH_DOWN,
  FighterState.CROUCH_TURN,
  ...CrouchAttackStates,
  FighterState.BLOCK_CROUCH,
  FighterState.BLOCK_CROUCH_LIGHT,
  FighterState.BLOCK_CROUCH_MEDIUM,
  FighterState.BLOCK_CROUCH_HEAVY,
  ...CrouchHurtStates,
];

export const BlockStateValidFrom = [
  FighterState.IDLE,
  FighterState.IDLE_TURN,
  FighterState.WALK_FORWARD,
  FighterState.WALK_BACKWARD,
  FighterState.CROUCH,
  FighterState.CROUCH_DOWN,
  FighterState.CROUCH_UP,
  FighterState.CROUCH_TURN,
  FighterState.JUMP_LAND,
  ...BlockStates,
];

export const CrouchAttackStateValidFrom = [
  FighterState.CROUCH,
  FighterState.CROUCH_DOWN,
  FighterState.CROUCH_TURN,
  FighterState.BLOCK_CROUCH,
  FighterState.BLOCK_STAND,
];

export const StandingAttackStateValidFrom = [
  FighterState.IDLE,
  FighterState.WALK_FORWARD,
  FighterState.WALK_BACKWARD,
  FighterState.BLOCK_STAND,
  FighterState.BLOCK_CROUCH,
];

export const AirborneStates = [
  ...JumpStates,
  ...JumpAttackStates,
  FighterState.HURT_AIR,
  FighterState.KO_AIRBORNE,
  FighterState.KO_BOUNCE,
  FighterState.SWEEP_FALL,
];

export const HurtStateValidFrom = [
  FighterState.IDLE,
  FighterState.WALK_BACKWARD,
  FighterState.WALK_FORWARD,
  FighterState.JUMP_LAND,
  FighterState.JUMP_START,
  ...JumpStates,
  ...JumpAttackStates,
  ...CrouchingStates,
  ...BlockStates,
  FighterState.CROUCH_UP,
  FighterState.IDLE_TURN,
  FighterState.LIGHT_PUNCH, FighterState.MEDIUM_PUNCH, FighterState.HEAVY_PUNCH,
  FighterState.LIGHT_KICK,  FighterState.MEDIUM_KICK,  FighterState.HEAVY_KICK,
  FighterState.HURT_HEAD_LIGHT, FighterState.HURT_HEAD_MEDIUM, FighterState.HURT_HEAD_HEAVY,
  FighterState.HURT_BODY_LIGHT, FighterState.HURT_BODY_MEDIUM, FighterState.HURT_BODY_HEAVY,
];

export const IdleStateValidFrom = [
  FighterState.IDLE,
  FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
  FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
  FighterState.JUMP_LAND, FighterState.CROUCH_UP, FighterState.IDLE_TURN,
  FighterState.LIGHT_PUNCH, FighterState.MEDIUM_PUNCH, FighterState.HEAVY_PUNCH,
  FighterState.LIGHT_KICK,  FighterState.MEDIUM_KICK,  FighterState.HEAVY_KICK,
  FighterState.HURT_HEAD_LIGHT, FighterState.HURT_HEAD_MEDIUM, FighterState.HURT_HEAD_HEAVY,
  FighterState.HURT_BODY_LIGHT, FighterState.HURT_BODY_MEDIUM, FighterState.HURT_BODY_HEAVY,
  ...CrouchAttackStates, ...BlockStates,
  ...CrouchHurtStates,
  FighterState.GETUP,
];
