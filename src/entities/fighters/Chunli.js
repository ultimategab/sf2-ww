import { FIGHTER_HURT_DELAY, FighterAttackReaction, FighterState, FrameDelay, HurtBox, PushBox } from "../../constants/fighter.js";
import { Fighter } from "./Fighter.js";

export class Chunli extends Fighter {
  constructor(playerId, onAttackHit) {
    super(playerId, onAttackHit);
    this.image = document.querySelector("img[alt='chun-li']");
    this.knockoutSound = document.querySelector("audio#chun-li-ko");

    // prettier-ignore
    this.frames = new Map([
      ['idle-1',                      [[[  16,   34,   72,   85], [ 34,  83]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['idle-2',                      [[[  96,   33,   72,   86], [ 34,  84]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['idle-3',                      [[[ 176,   32,   72,   87], [ 34,  85]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['idle-4',                      [[[ 256,   33,   72,   86], [ 34,  84]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['forwards-1',                  [[[  16,  164,   78,   84], [ 36,  83]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-2',                  [[[ 102,  161,   71,   87], [ 29,  86]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-3',                  [[[ 181,  160,   63,   88], [ 21,  87]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-4',                  [[[ 252,  159,   62,   89], [ 17,  87]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-5',                  [[[ 322,  160,   67,   88], [ 20,  86]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-6',                  [[[ 397,  161,   76,   87], [ 29,  85]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-7',                  [[[ 481,  162,   81,   86], [ 34,  84]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-8',                  [[[ 570,  161,   76,   87], [ 29,  85]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-9',                  [[[ 654,  160,   67,   88], [ 20,  86]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-10',                 [[[ 729,  159,   62,   89], [ 17,  87]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-11',                 [[[ 799,  160,   63,   88], [ 21,  87]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],
      ['forwards-12',                 [[[ 870,  161,   71,   87], [ 29,  86]], PushBox.Chunli.IDLE, HurtBox.Chunli.FORWARD]],

      ['backwards-1',                 [[[  16,  293,   73,   86], [ 36,  84], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-2',                 [[[  97,  290,   63,   89], [ 29,  88], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-3',                 [[[ 168,  289,   60,   90], [ 26,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-4',                 [[[ 236,  288,   63,   91], [ 27,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-5',                 [[[ 307,  289,   64,   90], [ 28,  88], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-6',                 [[[ 379,  290,   65,   89], [ 29,  87], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-7',                 [[[ 452,  291,   72,   88], [ 34,  86], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-8',                 [[[ 532,  290,   65,   89], [ 29,  87], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-9',                 [[[ 605,  289,   64,   90], [ 28,  88], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-10',                [[[ 677,  288,   63,   91], [ 27,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-11',                [[[ 748,  289,   60,   90], [ 26,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['backwards-12',                [[[ 816,  290,   63,   89], [ 29,  88], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['jump-up-1',                   [[[  98, 2339,   47,  110], [ 21, 108]], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-2',                   [[[ 153, 2365,   50,   84], [ 25, 102], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-3',                   [[[ 211, 2374,   52,   75], [ 26, 100], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-4',                   [[[ 271, 2384,   57,   65], [ 28,  94], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-5',                   [[[ 336, 2374,   52,   75], [ 26, 100], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-6',                   [[[ 396, 2365,   50,   84], [ 25, 102], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-7',                   [[[ 454, 2339,   47,  110], [ 21, 108]], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],

      ['jump-roll-1',                 [[[  16, 1239,   47,  110], [ 21, 108]], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-2',                 [[[  71, 1268,   88,   81], [ 50,  95], 27], PushBox.Chunli.JUMP, [[   9,  -86,   30,   20], [ -15,  -91,   30,   30], [ -35,  -86,   28,   32]]]],
      ['jump-roll-3',                 [[[ 167, 1301,  121,   48], [ 86,  91], 27], PushBox.Chunli.JUMP, [[   9,  -86,   30,   20], [ -15,  -91,   30,   30], [ -35,  -86,   28,   32]]]],
      ['jump-roll-4',                 [[[ 296, 1261,  109,   88], [ 84, 124], 27], PushBox.Chunli.JUMP, [[  -6,  -56,   30,   20], [ -16,  -74,   36,   24], [ -23,  -89,   30,   26]]]],
      ['jump-roll-5',                 [[[ 495, 2945,   52,  104], [ 28, 135], 27], PushBox.Chunli.JUMP, [[  -6,  -56,   30,   20], [ -16,  -74,   36,   24], [ -23,  -89,   30,   26]]]],
      ['jump-roll-6',                 [[[ 555, 2968,  110,   81], [ 44, 119], 27], PushBox.Chunli.JUMP, [[ -47,  -57,   30,   20], [ -32,  -72,   30,   22], [ -20,  -95,   30,   24]]]],
      ['jump-roll-7',                 [[[ 673, 2983,  119,   66], [ 47, 104], 27], PushBox.Chunli.JUMP, [[ -47,  -57,   30,   20], [ -32,  -72,   30,   22], [ -20,  -95,   30,   24]]]],
      ['jump-roll-8',                 [[[ 800, 2973,   95,   76], [ 53,  90], 27], PushBox.Chunli.JUMP, [[ -56,  -80,   30,   20], [ -35,  -84,   30,   26], [  -9,  -80,   28,   26]]]],
      ['jump-roll-9',                 [[[  98, 2339,   47,  110], [ 21, 108]], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],

      ['jump-land-1',                 [[[  16, 2368,   74,   81], [ 36,  79]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['crouch-1',                    [[[  16, 1998,   74,   81], [ 36,  79]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['crouch-2',                    [[[  98, 2007,   73,   72], [ 36,  70]], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-3',                    [[[ 179, 2013,   72,   66], [ 34,  64]], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],

      ['idle-turn-1',                 [[[ 376,   28,   73,   91], [ 35,  89]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['idle-turn-2',                 [[[ 457,   22,   68,   97], [ 35,  94]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['idle-turn-3',                 [[[ 533,   28,   73,   91], [ 36,  89]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['crouch-turn-1',               [[[ 296, 2013,   72,   66], [ 33,  63]], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-turn-2',               [[[ 376, 2014,   74,   65], [ 36,  63]], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-turn-3',               [[[ 458, 2013,   72,   66], [ 37,  63]], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],

      ['light-punch-1',               [[[  16,  428,   78,   87], [ 36,  85], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['light-punch-2',               [[[ 102,  426,  101,   89], [ 35,  87], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE, [   4,  -79,   62,   12]]],
      ['light-punch-3',               [[[ 211,  419,   87,   96], [ 38,  94], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['light-punch-4',               [[[ 102,  426,  101,   89], [ 35,  87], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['medium-punch-1',              [[[ 541,  431,  101,   84], [ 33,  82], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['medium-punch-2',              [[[ 650,  434,  119,   81], [ 35,  79], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['medium-punch-3',              [[[ 777,  434,  143,   81], [ 35,  78], 29], PushBox.Chunli.IDLE, [[  24,  -80,   30,   20], [  12,  -63,   38,   32], [  -6,  -35,   74,   36]], [  27,  -76,   80,   12]]],

      ['heavy-punch-1',               [[[  16,  561,  101,   84], [ 33,  82], 29], PushBox.Chunli.IDLE, [[ -20,  -87,   30,   20], [ -31,  -73,   34,   40], [  -3,  -34,   48,   36]]]],
      ['heavy-punch-2',               [[[ 125,  566,  119,   79], [ 33,  77], 29], PushBox.Chunli.IDLE, [[  15,  -80,   30,   20], [   3,  -67,   42,   36], [  -6,  -35,   74,   36]]]],
      ['heavy-punch-3',               [[[ 252,  569,  130,   76], [ 34,  73], 29], PushBox.Chunli.IDLE, [[  24,  -80,   30,   20], [  12,  -63,   38,   32], [  -6,  -35,   74,   36]], [  26,  -77,   84,   12]]],
      ['heavy-punch-4',               [[[  16,  561,  101,   84], [ 33,  82], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['light-kick-1',                [[[  16,  962,   66,   89], [ 23,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['light-kick-2',                [[[  90,  958,   71,   93], [ 15,  91], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['light-kick-3',                [[[ 169,  954,  106,   97], [ -1,  95], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE, [  30,  -78,   66,   10]]],

      ['medium-kick-1',               [[[  16,  962,   66,   89], [ 23,  89], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['medium-kick-2',               [[[  90,  958,   71,   93], [ 15,  91], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['medium-kick-3',               [[[ 629,  956,  109,   95], [ 24,  93], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE, [  21,  -84,   80,   18]]],

      ['heavy-kick-1',                [[[ 939,  973,   64,   78], [ 27,  76], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]]]],
      ['heavy-kick-2',                [[[1011,  959,   70,   92], [ 16,  90], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]]]],
      ['heavy-kick-3',                [[[1089,  961,   82,   90], [ 22,  88], 29], PushBox.Chunli.IDLE, [[ -28,  -68,   30,   20], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]]]],
      ['heavy-kick-4',                [[[1179,  954,  123,   97], [ 34,  95], 29], PushBox.Chunli.IDLE, [[ -28,  -68,   30,   20], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]], [  31, -102,   78,   26]]],
      ['heavy-kick-5',                [[[1310,  968,  102,   83], [ 35,  81], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]]]],
      ['heavy-kick-6',                [[[1420,  970,   70,   81], [ 33,  79], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [ -31,  -73,   34,   40], [ -33,  -31,   44,   32]]]],

      ['crouch-light-punch-1',        [[[  16, 2120,   71,   66], [ 32,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-light-punch-2',        [[[  95, 2120,   77,   66], [ 32,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-light-punch-3',        [[[ 180, 2122,  107,   64], [ 31,  61], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND, [  13,  -52,   62,   16]]],

      ['crouch-medium-punch-1',       [[[ 499, 2119,   80,   67], [ 31,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-medium-punch-2',       [[[ 587, 2119,   88,   67], [ 24,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-medium-punch-3',       [[[ 683, 2119,  124,   67], [ 21,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND, [  19,  -53,   72,   18]]],

      ['crouch-heavy-punch-1',        [[[ 499, 2119,   80,   67], [ 31,  64], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-heavy-punch-2',        [[[1127, 2119,  100,   67], [ 34,  65], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-heavy-punch-3',        [[[1235, 2119,  138,   67], [ 35,  65], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND, [  20,  -53,   86,   18]]],

      ['crouch-light-kick-1',         [[[  16, 2241,   63,   58], [ 26,  56], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-light-kick-2',         [[[  87, 2241,   61,   58], [ 23,  54], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-light-kick-3',         [[[ 156, 2251,  107,   48], [ 28,  44], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND, [   3,  -17,   74,   18]]],

      ['crouch-medium-kick-1',        [[[ 451, 2236,   77,   63], [ 14,  60], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-medium-kick-2',        [[[ 536, 2244,  115,   55], [  6,  53], 29], PushBox.Chunli.CROUCH, [[  -7,  -59,   30,   20], [ -17,  -51,   34,   24], [  -1,  -21,   82,   22]], [  11,  -17,   98,   18]]],
      ['crouch-medium-kick-3',        [[[ 659, 2237,   76,   62], [  3,  59], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],

      ['crouch-heavy-kick-1',         [[[ 783, 2237,   72,   62], [ 18,  62], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-heavy-kick-2',         [[[ 863, 2235,   78,   64], [ 13,  60], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['crouch-heavy-kick-3',         [[[ 949, 2226,  128,   73], [ 16,  69], 29], PushBox.Chunli.CROUCH, [[  -7,  -59,   30,   20], [ -17,  -51,   34,   24], [  32,  -58,   54,   30]], [  21,  -60,   88,   32], FighterAttackReaction.SWEEP]],

      ['jump-up-light-punch-1',       [[[ 153, 2510,   66,   89], [ 27, 109], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-light-punch-2',       [[[ 227, 2509,   53,   90], [ 27, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-light-punch-3',       [[[ 288, 2524,   85,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-light-punch-4',       [[[ 381, 2522,   87,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   5,  -85,   52,   40], FighterAttackReaction.JUMP]],

      ['jump-up-medium-punch-1',      [[[ 153, 2510,   66,   89], [ 27, 109], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-medium-punch-2',      [[[ 227, 2509,   53,   90], [ 27, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-medium-punch-3',      [[[ 288, 2524,   85,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-medium-punch-4',      [[[ 381, 2522,   87,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [  15,  -81,   52,   40], FighterAttackReaction.JUMP]],

      ['jump-up-heavy-punch-1',       [[[ 153, 2510,   66,   89], [ 27, 109], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-heavy-punch-2',       [[[ 227, 2509,   53,   90], [ 27, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-heavy-punch-3',       [[[ 288, 2524,   85,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-heavy-punch-4',       [[[ 381, 2522,   87,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [  14,  -81,   60,   40], FighterAttackReaction.JUMP]],

      ['jump-up-light-kick-1',        [[[ 153, 2654,   57,   95], [ 24, 105], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-light-kick-2',        [[[ 218, 2655,   84,   94], [ 21, 104], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-light-kick-3',        [[[ 310, 2650,   63,   99], [ 26, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   3,  -81,   60,   40], FighterAttackReaction.JUMP]],

      ['jump-up-medium-kick-1',       [[[ 153, 2654,   57,   95], [ 24, 105], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-medium-kick-2',       [[[ 218, 2655,   84,   94], [ 21, 104], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-up-medium-kick-3',       [[[ 310, 2650,   63,   99], [ 26, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   3,  -81,   70,   40], FighterAttackReaction.JUMP]],

      ['jump-up-heavy-kick-1',        [[[  16, 1096,   96,   98], [ 31,  95], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['jump-up-heavy-kick-2',        [[[ 120, 1098,   86,   96], [ 23,  94], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['jump-up-heavy-kick-3',        [[[ 214, 1390,   87,   97], [-10,  95], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE, [  30,  -64,   66,   26], FighterAttackReaction.KNOCKDOWN]],
      ['jump-up-heavy-kick-4',        [[[ 309, 1422,   99,   65], [  4, 113], 27], PushBox.Chunli.JUMP, [[  -8, -115,   30,   20], [   5, -101,   30,   26], [  20,  -84,   30,   20]], [  30,  -83,   66,   34], FighterAttackReaction.KNOCKDOWN]],
      ['jump-up-heavy-kick-5',        [[[ 416, 1417,  110,   70], [ 14, 122], 27], PushBox.Chunli.JUMP, [[ -14,  -72,   30,   20], [   5, -101,   30,   26], [  20,  -84,   30,   20]], [  30, -118,   66,   66], FighterAttackReaction.KNOCKDOWN]],
      ['jump-up-heavy-kick-6',        [[[ 534, 1394,   86,   93], [ 43, 150], 27], PushBox.Chunli.JUMP, [[  -2,  -75,   30,   20], [   5,  -96,   30,   24], [   4, -111,   30,   20]]]],
      ['jump-up-heavy-kick-7',        [[[ 628, 1419,  101,   68], [ 63,  96], 27], PushBox.Chunli.JUMP, [[  11,  -85,   30,   20], [  -8,  -93,   30,   22], [ -32,  -89,   30,   28]]]],
      ['jump-up-heavy-kick-8',        [[[  71, 1268,   88,   81], [ 50,  95], 27], PushBox.Chunli.JUMP, [[   9,  -86,   30,   20], [ -15,  -91,   30,   30], [ -35,  -86,   28,   32]]]],

      ['jump-roll-light-punch-1',     [[[ 153, 3125,   53,   74], [ 27,  94], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-light-punch-2',     [[[ 214, 3124,   59,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-light-punch-3',     [[[ 281, 3122,   83,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   3,  -80,   44,   28], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-punch-1',    [[[ 153, 3125,   53,   74], [ 27,  94], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-medium-punch-2',    [[[ 214, 3124,   59,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-medium-punch-3',    [[[ 281, 3122,   83,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   2,  -80,   52,   34], FighterAttackReaction.JUMP]],

      ['jump-roll-heavy-punch-1',     [[[ 153, 3125,   53,   74], [ 27,  94], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-heavy-punch-2',     [[[ 214, 3124,   59,   75], [ 27,  95], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-heavy-punch-3',     [[[ 281, 3122,   83,   77], [ 27,  97], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   1,  -79,   60,   40], FighterAttackReaction.JUMP]],

      ['jump-roll-light-kick-1',      [[[ 153, 3286,   57,   63], [ 23,  90], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-light-kick-2',      [[[ 218, 3286,   72,   63], [ 21,  90], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-light-kick-3',      [[[ 298, 3293,  111,   56], [ 29,  84], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [  14,  -62,   62,   26], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-kick-1',     [[[ 153, 3286,   57,   63], [ 23,  90], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-medium-kick-2',     [[[ 218, 3286,   72,   63], [ 21,  90], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-medium-kick-3',     [[[ 298, 3293,  111,   56], [ 29,  84], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [  12,  -59,   76,   30], FighterAttackReaction.JUMP]],

      ['jump-roll-heavy-kick-1',      [[[ 153, 2654,   57,   95], [ 24, 105], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-heavy-kick-2',      [[[ 218, 2655,   84,   94], [ 21, 104], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP]],
      ['jump-roll-heavy-kick-3',      [[[ 310, 2650,   63,   99], [ 26, 110], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   4,  -73,   78,   42], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-kick-4',      [[[ 381, 3406,   86,   93], [ 19, 104], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   2,  -68,    0,    0], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-kick-5',      [[[ 475, 3400,   62,   99], [ 19, 112], 27], PushBox.Chunli.JUMP, HurtBox.Chunli.JUMP, [   4,  -73,   78,   42], FighterAttackReaction.JUMP]],

      ['block-stand-1',               [[[  16, 3839,   73,   86], [ 36,  84], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['block-stand-2',               [[[  97, 3840,   83,   85], [ 46,  83], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['block-stand-3',               [[[  97, 3840,   83,   85], [ 46,  83], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['block-crouch-1',              [[[ 309, 3857,   73,   68], [ 35,  66], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['block-crouch-2',              [[[ 390, 3858,   74,   67], [ 38,  65], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],
      ['block-crouch-3',              [[[ 390, 3858,   74,   67], [ 38,  65], 29], PushBox.Chunli.CROUCH, HurtBox.Chunli.BEND]],

      ['hit-face-1',                  [[[  16, 4288,   73,   92], [ 36,  90], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['hit-face-2',                  [[[  97, 4288,   76,   92], [ 39,  90], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['hit-face-3',                  [[[ 181, 4290,   87,   90], [ 50,  88], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['hit-stomach-1',               [[[ 521, 4299,   73,   81], [ 46,  79]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['hit-stomach-2',               [[[ 602, 4305,   70,   75], [ 54,  72], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['hit-stomach-3',               [[[ 680, 4309,   74,   71], [ 64,  68], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['hit-stomach-4',               [[[ 762, 4310,   73,   70], [ 70,  67], 29], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['hit-crouch-1',                [[[ 543, 4443,   72,   69], [ 34,  67], 29], PushBox.Chunli.CROUCH, [[ -29,  -70,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-2',                [[[ 543, 4443,   72,   69], [ 34,  67], 29], PushBox.Chunli.CROUCH, [[ -29,  -70,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-3',                [[[ 743, 4441,   73,   71], [ 35,  69], 29], PushBox.Chunli.CROUCH, [[ -29,  -70,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-4',                [[[ 824, 4445,   76,   67], [ 39,  65], 29], PushBox.Chunli.CROUCH, [[ -54,  -62,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-5',                [[[ 543, 4443,   72,   69], [ 34,  67], 29], PushBox.Chunli.CROUCH, [[ -29,  -70,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-6',                [[[ 743, 4441,   73,   71], [ 35,  69], 29], PushBox.Chunli.CROUCH, [[ -29,  -70,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-7',                [[[ 824, 4445,   76,   67], [ 39,  65], 29], PushBox.Chunli.CROUCH, [[ -54,  -62,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],
      ['hit-crouch-8',                [[[ 261, 4562,   92,   61], [ 54,  59], 29], PushBox.Chunli.CROUCH, [[ -54,  -62,   30,   20], [ -17,  -51,   34,   24], [ -17,  -26,   42,   24]]]],

      ['stun-1',                      [[[  16, 5609,   73,   92], [ 36,  90]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['stun-2',                      [[[  97, 5617,  102,   84], [ 66,  82]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['stun-3',                      [[[ 207, 5620,   73,   81], [ 46,  79]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],
      ['stun-4',                      [[[ 288, 5631,   73,   70], [ 69,  68]], PushBox.Chunli.IDLE, HurtBox.Chunli.IDLE]],

      ['hurt-air-1',                  [[[  16, 4808,  124,   72], [ 56,  62], 27], PushBox.Chunli.IDLE]],
      ['hurt-air-2',                  [[[ 148, 4841,  127,   39], [ 63,  33], 27], PushBox.Chunli.CROUCH]],

      ['sweep-fall-1',                [[[  16, 4941,   83,   60], [ 40,  89], 27], PushBox.Chunli.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-2',                [[[ 107, 4944,  104,   57], [ 56,  80], 27], PushBox.Chunli.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-3',                [[[ 219, 4930,   94,   71], [ 48,  68], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-4',                [[[ 321, 4953,  117,   48], [ 56,  44], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-5',                [[[ 647, 4842,  139,   38], [ 67,  25], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['sweep-grounded-1',            [[[ 647, 4842,  139,   38], [ 67,  25], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['knockdown-1',                 [[[ 521, 4299,   73,   81], [ 46,  78], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-2',                 [[[  97, 4288,   76,   92], [ 39,  90], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-3',                 [[[  97, 5617,  102,   84], [ 66,  82], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-4',                 [[[  16, 4808,  124,   72], [ 56,  62], 27], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-5',                 [[[ 148, 4841,  127,   39], [ 63,  33], 27], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['getup-1',                     [[[ 593, 4955,  129,   46], [ 57,  33], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-2',                     [[[ 730, 4941,  106,   60], [ 52,  47], 29], PushBox.Chunli.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-3',                     [[[  16, 1729,   74,   81], [ 36,  79], 29], PushBox.Chunli.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['ko-airborne-1',               [[[  16, 4808,  124,   72], [ 62,  68], 27]]],
      ['ko-airborne-2',               [[[ 148, 4841,  127,   39], [ 63,  52], 27]]],

      ['ko-impact-1',                 [[[ 283, 4812,   92,   68], [ 46,  64], 29]]],

      ['ko-bounce-1',                 [[[ 518, 4819,  121,   61], [ 60,  57], 29]]],

      ['ko-grounded-1',               [[[ 647, 4842,  139,   38], [ 69,  34], 29]]],

      ['winner-pose-1',               [[[  16, 4139,   73,   91], [ 36,  87]]]],
      ['winner-pose-2',               [[[  97, 4133,   68,   97], [ 36,  94], 29]]],
      ['winner-pose-3',               [[[ 173, 4128,   48,  102], [ 26,  99], 29]]],
      ['winner-pose-4',               [[[1031, 4114,   58,  116], [ 26, 113], 29]]],
      ['winner-pose-5',               [[[ 229, 4102,   74,  128], [ 39, 141], 27]]],
      ['winner-pose-6',               [[[ 311, 4118,   74,  112], [ 39, 149], 27]]],
      ['winner-pose-7',               [[[ 393, 4129,   74,  101], [ 39, 153], 27]]],
      ['winner-pose-8',               [[[ 639, 4127,   48,  103], [ 26, 100], 29]]],
      ['winner-pose-9',               [[[ 751, 4127,   48,  103], [ 26, 100], 29]]],
      ['winner-pose-10',              [[[ 294, 3965,   68,   97], [ 36,  94], 29]]],
      ['winner-pose-11',              [[[ 370, 3965,   68,   97], [ 36,  94], 29]]],
      ['winner-pose-12',              [[[ 446, 3969,   68,   93], [ 36,  90], 29]]],
      ['winner-pose-13',              [[[ 229, 4102,   74,  128], [ 39, 141], 29]]],

      ['loser-pose-1',                [[[ 294, 3965,   68,   97], [ 34,  93]]]],
      ['loser-pose-2',                [[[ 370, 3965,   68,   97], [ 34,  93]]]],
      ['loser-pose-3',                [[[ 446, 3969,   68,   93], [ 34,  89]]]],
    ]);

    // prettier-ignore
    this.animations = {
      [FighterState.IDLE]: [
        ['idle-1', 12], ['idle-2',  9], ['idle-3', 12],
        ['idle-2',  9],
      ],

      [FighterState.WALK_FORWARD]: [
        ['forwards-1',  3], ['forwards-2',  3], ['forwards-3',  3],
        ['forwards-4',  3], ['forwards-5',  3], ['forwards-6',  3],
        ['forwards-7',  3], ['forwards-6',  3], ['forwards-5',  3],
        ['forwards-4',  3], ['forwards-3',  3], ['forwards-2',  3],
      ],

      [FighterState.WALK_BACKWARD]: [
        ['backwards-1',  4], ['backwards-2',  4], ['backwards-3',  4],
        ['backwards-4',  4], ['backwards-5',  4], ['backwards-6',  4],
        ['backwards-7',  4], ['backwards-6',  4], ['backwards-5',  4],
        ['backwards-4',  4], ['backwards-3',  4], ['backwards-2',  4],
      ],

      [FighterState.JUMP_START]: [
        ['crouch-1',  3],
        ['crouch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP]: [
        ['jump-up-1', 12], ['jump-up-2',  5], ['jump-up-3',  4],
        ['jump-up-4',  8], ['jump-up-3',  4], ['jump-up-2',  5],
        ['jump-up-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_FORWARD]: [
        ['jump-roll-1', 10], ['jump-roll-2',  6], ['jump-roll-3',  5],
        ['jump-roll-4',  4], ['jump-roll-5',  3], ['jump-roll-6',  4],
        ['jump-roll-7',  5], ['jump-roll-8',  6],
        ['jump-roll-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_BACKWARD]: [
        ['jump-up-1',   10], ['jump-roll-8',  6], ['jump-roll-7',  5],
        ['jump-roll-6',  4], ['jump-roll-5',  3], ['jump-roll-4',  4],
        ['jump-roll-3',  5], ['jump-roll-2',  6],
        ['jump-up-1',   FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_LAND]: [
        ['crouch-1',  2], ['crouch-1',  5],
        ['crouch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH]: [
        ['crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.CROUCH_DOWN]: [
        ['crouch-1',  1], ['crouch-2',  2],
        ['crouch-3', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_UP]: [
        ['crouch-3',  1], ['crouch-2',  2], ['crouch-1',  1],
        ['crouch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.IDLE_TURN]: [
        ['idle-turn-3',  3], ['idle-turn-2',  3], ['idle-turn-1',  3],
        ['idle-turn-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_TURN]: [
        ['crouch-turn-3',  3], ['crouch-turn-2',  3], ['crouch-turn-1',  3],
        ['crouch-turn-1', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_PUNCH]: [
        ['light-punch-1',  2], ['light-punch-2',  2], ['light-punch-3',  4],
        ['light-punch-4',  3],
        ['light-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_PUNCH]: [
        ['medium-punch-1',  2], ['medium-punch-2',  2], ['medium-punch-3',  4],
        ['medium-punch-2',  3],
        ['medium-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_PUNCH]: [
        ['heavy-punch-1',  2], ['heavy-punch-2',  3], ['heavy-punch-3',  6],
        ['heavy-punch-2', 10], ['heavy-punch-1',  7],
        ['heavy-punch-4', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_KICK]: [
        ['light-kick-1',  3], ['light-kick-2',  3], ['light-kick-3',  5],
        ['light-kick-2',  4],
        ['light-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_KICK]: [
        ['medium-kick-1',  3], ['medium-kick-2',  3], ['medium-kick-3',  5],
        ['medium-kick-2',  4], ['medium-kick-1',  4],
        ['medium-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_KICK]: [
        ['heavy-kick-1',  3], ['heavy-kick-2',  3], ['heavy-kick-3',  4],
        ['heavy-kick-4',  8], ['heavy-kick-5',  7], ['heavy-kick-6',  7],
        ['heavy-kick-6', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_PUNCH]: [
        ['crouch-light-punch-1',  2], ['crouch-light-punch-2',  2], ['crouch-light-punch-3',  4],
        ['crouch-light-punch-2',  4],
        ['crouch-light-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [
        ['crouch-medium-punch-1',  2], ['crouch-medium-punch-2',  2], ['crouch-medium-punch-3',  4],
        ['crouch-medium-punch-2',  4],
        ['crouch-medium-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_PUNCH]: [
        ['crouch-heavy-punch-1',  3], ['crouch-heavy-punch-2',  3], ['crouch-heavy-punch-3',  6],
        ['crouch-heavy-punch-2',  8], ['crouch-heavy-punch-1', 10],
        ['crouch-heavy-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_KICK]: [
        ['crouch-light-kick-1',  3], ['crouch-light-kick-2',  3], ['crouch-light-kick-3',  4],
        ['crouch-light-kick-2',  4],
        ['crouch-light-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_KICK]: [
        ['crouch-medium-kick-1',  4], ['crouch-medium-kick-2',  5], ['crouch-medium-kick-3',  3],
        ['crouch-medium-kick-3', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_KICK]: [
        ['crouch-heavy-kick-1',  3], ['crouch-heavy-kick-2',  3], ['crouch-heavy-kick-3',  6],
        ['crouch-heavy-kick-2',  8], ['crouch-heavy-kick-1', 10],
        ['crouch-heavy-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP_LIGHT_PUNCH]: [
        ['jump-up-light-punch-1',  4], ['jump-up-light-punch-2',  3], ['jump-up-light-punch-3',  2],
        ['jump-up-light-punch-4', 40], ['jump-up-light-punch-3',  2], ['jump-up-light-punch-2',  3],
        ['jump-up-light-punch-1',  4],
      ],

      [FighterState.JUMP_UP_MEDIUM_PUNCH]: [
        ['jump-up-medium-punch-1',  4], ['jump-up-medium-punch-2',  3], ['jump-up-medium-punch-3',  2],
        ['jump-up-medium-punch-4', 16], ['jump-up-medium-punch-3',  2], ['jump-up-medium-punch-2',  3],
        ['jump-up-medium-punch-1',  4],
      ],

      [FighterState.JUMP_UP_HEAVY_PUNCH]: [
        ['jump-up-heavy-punch-1',  4], ['jump-up-heavy-punch-2',  3], ['jump-up-heavy-punch-3',  2],
        ['jump-up-heavy-punch-4',  8], ['jump-up-heavy-punch-3',  2], ['jump-up-heavy-punch-2',  3],
        ['jump-up-heavy-punch-1',  4],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: [
        ['jump-roll-light-punch-1',  4], ['jump-roll-light-punch-2',  3], ['jump-roll-light-punch-3', 40],
        ['jump-roll-light-punch-2',  3], ['jump-roll-light-punch-1',  4],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: [
        ['jump-roll-medium-punch-1',  4], ['jump-roll-medium-punch-2',  3], ['jump-roll-medium-punch-3', 16],
        ['jump-roll-medium-punch-2',  3], ['jump-roll-medium-punch-1',  4],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: [
        ['jump-roll-heavy-punch-1',  4], ['jump-roll-heavy-punch-2',  3], ['jump-roll-heavy-punch-3',  8],
        ['jump-roll-heavy-punch-2',  3], ['jump-roll-heavy-punch-1',  4],
      ],

      [FighterState.JUMP_UP_LIGHT_KICK]: [
        ['jump-up-light-kick-1',  4], ['jump-up-light-kick-2',  3], ['jump-up-light-kick-3', 40],
        ['jump-up-light-kick-2',  6],
        ['jump-up-light-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_KICK]: [
        ['jump-up-medium-kick-1',  4], ['jump-up-medium-kick-2',  3], ['jump-up-medium-kick-3', 16],
        ['jump-up-medium-kick-2',  6],
        ['jump-up-medium-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_KICK]: [
        ['jump-up-heavy-kick-1',  2], ['jump-up-heavy-kick-2',  2], ['jump-up-heavy-kick-3',  5],
        ['jump-up-heavy-kick-4',  4], ['jump-up-heavy-kick-5',  4], ['jump-up-heavy-kick-6',  4],
        ['jump-up-heavy-kick-7',  6],
        ['jump-up-heavy-kick-8', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: [
        ['jump-roll-light-kick-1',  4], ['jump-roll-light-kick-2',  3], ['jump-roll-light-kick-3', 40],
        ['jump-roll-light-kick-2',  3],
        ['jump-roll-light-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: [
        ['jump-roll-medium-kick-1',  4], ['jump-roll-medium-kick-2',  3], ['jump-roll-medium-kick-3', 16],
        ['jump-roll-medium-kick-2',  3],
        ['jump-roll-medium-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: [
        ['jump-roll-heavy-kick-1',  4], ['jump-roll-heavy-kick-2',  3], ['jump-roll-heavy-kick-3',  6],
        ['jump-roll-heavy-kick-4',  4], ['jump-roll-heavy-kick-5',  6], ['jump-roll-heavy-kick-2',  6],
        ['jump-roll-heavy-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND]: [
        ['block-stand-1',  2],
        ['block-stand-2', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_LIGHT]: [
        ['block-stand-3', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_MEDIUM]: [
        ['block-stand-3', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_HEAVY]: [
        ['block-stand-3', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH]: [
        ['block-crouch-1',  2],
        ['block-crouch-2', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_LIGHT]: [
        ['block-crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_MEDIUM]: [
        ['block-crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_HEAVY]: [
        ['block-crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_LIGHT]: [
        ['hit-crouch-1', FIGHTER_HURT_DELAY], ['hit-crouch-1',  4],
        ['hit-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_MEDIUM]: [
        ['hit-crouch-2', FIGHTER_HURT_DELAY], ['hit-crouch-2',  4], ['hit-crouch-3',  4],
        ['hit-crouch-4', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_HEAVY]: [
        ['hit-crouch-5', FIGHTER_HURT_DELAY], ['hit-crouch-5',  4], ['hit-crouch-6',  4],
        ['hit-crouch-7',  4],
        ['hit-crouch-8', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_FALL]: [
        ['sweep-fall-1',  6], ['sweep-fall-2',  4], ['sweep-fall-3',  8],
        ['sweep-fall-4',  4],
        ['sweep-fall-5', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_GROUNDED]: [
        ['sweep-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.GETUP]: [
        ['getup-1',  8], ['getup-2',  8], ['getup-3',  8],
        ['getup-3', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_LIGHT]: [
        ['hit-face-1', FIGHTER_HURT_DELAY], ['hit-face-1',  3], ['hit-face-2',  8],
        ['hit-face-2', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_MEDIUM]: [
        ['hit-face-1', FIGHTER_HURT_DELAY], ['hit-face-1',  3], ['hit-face-2',  4],
        ['hit-face-3',  9],
        ['hit-face-3', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_HEAVY]: [
        ['hit-face-1',    FIGHTER_HURT_DELAY], ['hit-face-1',     3], ['hit-face-2',     4],
        ['hit-stomach-1',  3], ['hit-stomach-2',  3], ['hit-stomach-3',  3],
        ['hit-stomach-4',  4],
        ['hit-stomach-4', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-2',  8],
        ['hit-stomach-2', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-2',  4],
        ['hit-stomach-3',  9],
        ['hit-stomach-3', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-2',  4],
        ['hit-stomach-3',  4], ['hit-stomach-4',  9],
        ['hit-stomach-4', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_AIR]: [
        ['hurt-air-1', 8 + FIGHTER_HURT_DELAY],
        ['hurt-air-2', FrameDelay.FREEZE],
      ],

      [FighterState.KO_AIRBORNE]: [
        ['ko-airborne-1',  6],
        ['ko-airborne-2', FrameDelay.FREEZE],
      ],

      [FighterState.KO_IMPACT]: [
        ['ko-impact-1',  4],
        ['ko-impact-1', FrameDelay.TRANSITION],
      ],

      [FighterState.KO_BOUNCE]: [
        ['ko-bounce-1', FrameDelay.FREEZE],
      ],

      [FighterState.KO_GROUNDED]: [
        ['ko-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.WINNER_POSE]: [
        ['winner-pose-1',   8], ['winner-pose-2',  48], ['winner-pose-10', 12],
        ['winner-pose-11', 12],
        ['winner-pose-12', FrameDelay.FREEZE],
      ],

      [FighterState.LOSER_POSE]: [
        ['loser-pose-1',  8], ['loser-pose-2',  8],
        ['loser-pose-3', FrameDelay.FREEZE],
      ],
    };

    this.jumpAttackLoopFrames = {
      [FighterState.JUMP_UP_LIGHT_PUNCH]: 0,
      [FighterState.JUMP_UP_MEDIUM_PUNCH]: 0,
      [FighterState.JUMP_UP_HEAVY_PUNCH]: 0,

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: 0,
      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: 0,
      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: 0,
    };

    this.knockdownAnimation = [
      ['knockdown-1',  4], ['knockdown-2',  4], ['knockdown-3',  4],
      ['knockdown-4',  8],
      ['knockdown-5', FrameDelay.FREEZE],
    ];

    this.winnerAnimations = [
      this.animations[FighterState.WINNER_POSE],
      [
        ['winner-pose-1',   8], ['winner-pose-2',   8], ['winner-pose-3',   8],
        ['winner-pose-5',   8, 'chun-li-laugh'], ['winner-pose-6',   8], ['winner-pose-7',   8],
        ['winner-pose-6',   8], ['winner-pose-3',   8], ['winner-pose-5',   8],
        ['winner-pose-6',   8], ['winner-pose-7',   8], ['winner-pose-6',   8],
        ['winner-pose-13',  8], ['winner-pose-8',   8], ['winner-pose-3',   8],
        ['winner-pose-9',   8], ['winner-pose-3',   8], ['winner-pose-8',   8],
        ['winner-pose-3',   8], ['winner-pose-9',   8],
        ['winner-pose-4',  FrameDelay.FREEZE],
      ],
    ];

    // prettier-ignore
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]:   240,
        [FighterState.WALK_BACKWARD]: -180,
        [FighterState.JUMP_FORWARD]:   247.5,
        [FighterState.JUMP_BACKWARD]: -255,
      },
      jump: {
        [FighterState.JUMP_UP]:       -611.25,
        [FighterState.JUMP_FORWARD]:  -600,
        [FighterState.JUMP_BACKWARD]: -618.75,
      },
    };

    this.gravity          = 1575;
    this.jumpAcceleration =   70.3125;
  }

  handleWinnerPoseInit(time) {
    super.handleWinnerPoseInit(time);
    this.direction *= -1;
  }
}
