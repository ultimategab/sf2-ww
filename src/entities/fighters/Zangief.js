import { FIGHTER_HURT_DELAY, FighterState, FighterAttackReaction, FrameDelay, HurtBox, PushBox } from "../../constants/fighter.js";
import { Fighter } from "./Fighter.js";

export class Zangief extends Fighter {
  constructor(playerId, onAttackHit) {
    super(playerId, onAttackHit);
    this.image = document.querySelector("img[alt='zangief']");

    // prettier-ignore
    this.frames = new Map([
      ['idle-1',                      [[[  16,   23,  101,  110], [ 32, 103], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-2',                      [[[ 125,   24,   92,  109], [ 32, 102], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-3',                      [[[ 225,   27,   90,  106], [ 34,  99], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-4',                      [[[ 323,   24,   92,  109], [ 32, 102], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['forwards-1',                  [[[  16,  178,   98,  109], [ 49, 102], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['forwards-2',                  [[[ 122,  181,   92,  106], [ 36, 104], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['forwards-3',                  [[[ 222,  181,   90,  106], [ 27, 104], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['forwards-4',                  [[[ 320,  179,  100,  108], [ 35, 102], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['forwards-5',                  [[[ 428,  176,   90,  111], [ 27, 104], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['forwards-6',                  [[[ 526,  176,   87,  111], [ 31, 104], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['backwards-1',                 [[[ 661,  175,   90,  112], [ 44, 106], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],
      ['backwards-2',                 [[[ 759,  178,   90,  109], [ 42, 107], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],
      ['backwards-3',                 [[[ 857,  178,   82,  109], [ 39, 107], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],
      ['backwards-4',                 [[[ 947,  174,   98,  113], [ 49, 106], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],
      ['backwards-5',                 [[[1053,  173,   82,  114], [ 39, 107], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],
      ['backwards-6',                 [[[1143,  173,   90,  114], [ 42, 107], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.BACKWARD]],

      ['jump-up-1',                   [[[ 129,  987,  106,  111], [ 18, 108], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],
      ['jump-up-2',                   [[[ 664, 2544,  109,   99], [ 24, 111], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],
      ['jump-up-3',                   [[[ 781, 2558,  125,   85], [ 37, 109], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],

      ['jump-roll-1',                 [[[ 129,  987,  106,  111], [ 18, 108], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],
      ['jump-roll-2',                 [[[ 664, 2544,  109,   99], [ 24, 111], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],
      ['jump-roll-3',                 [[[ 781, 2558,  125,   85], [ 37, 109], 36], PushBox.Zangief.JUMP, HurtBox.Zangief.JUMP]],

      ['jump-land-1',                 [[[  16, 1000,  105,   98], [ 33,  91], 36], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['crouch-1',                    [[[  16, 2077,  106,  103], [ 34,  96], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['crouch-2',                    [[[ 130, 2093,   96,   87], [ 30,  80], 38], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],
      ['crouch-3',                    [[[ 234, 2101,   91,   79], [ 28,  72], 38], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],

      ['idle-turn-1',                 [[[ 463,   20,  101,  113], [ 40, 106], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-turn-2',                 [[[ 572,   16,  101,  117], [ 45, 110], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-turn-3',                 [[[ 681,   16,  110,  117], [ 55, 110], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['idle-turn-4',                 [[[ 799,   18,  103,  115], [ 59, 108], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['crouch-turn-1',               [[[ 234, 2101,   91,   79], [ 28,  72], 38], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],
      ['crouch-turn-2',               [[[ 373, 2095,   86,   85], [ 36,  78], 38], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],
      ['crouch-turn-3',               [[[ 467, 2096,   80,   84], [ 38,  78], 38], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],
      ['crouch-turn-4',               [[[ 555, 2096,   86,   84], [ 54,  77]], PushBox.Zangief.CROUCH, HurtBox.Zangief.CROUCH]],

      ['light-punch-1',               [[[  16,  331,  101,  108], [ 35, 101]], PushBox.Zangief.IDLE, [[ -11,  -89,   57,   90], [  22, -101,   20,   21], [   0,    0,    0,    0]]]],
      ['light-punch-2',               [[[ 125,  333,  130,  106], [ 31,  99]], PushBox.Zangief.IDLE, [[  -3,  -88,   57,   89], [  34, -100,   23,   23], [  22,  -88,   61,   17]], [  20,  -85,   70,   10]]],

      ['medium-punch-1',              [[[ 521,  327,   99,  112], [ 37, 105]], PushBox.Zangief.IDLE, [[ -35,  -95,   61,   96], [ -17, -107,   21,   25], [   0,    0,    0,    0]]]],
      ['medium-punch-2',              [[[ 628,  329,  101,  110], [ 34, 103]], PushBox.Zangief.IDLE, [[ -20,  -94,   70,   95], [  18, -104,   23,   26], [   0,    0,    0,    0]]]],
      ['medium-punch-3',              [[[ 737,  330,  136,  109], [ 34, 102]], PushBox.Zangief.IDLE, [[ -20,  -94,   70,   95], [  25, -104,   24,   25], [  41,  -90,   48,   20]], [  17,  -88,   80,   14]]],
      ['medium-punch-4',              [[[ 881,  332,  102,  107], [ 31, 100]], PushBox.Zangief.IDLE, [[  -5,  -91,   59,   92], [  33, -101,   20,   21], [   0,    0,    0,    0]]]],

      ['heavy-punch-1',               [[[  16,  479,   79,  112], [ 39, 105]], PushBox.Zangief.IDLE, [[ -35,  -95,   61,   96], [ -17, -107,   21,   25], [   0,    0,    0,    0]]]],
      ['heavy-punch-2',               [[[ 103,  483,   98,  108], [ 34, 101]], PushBox.Zangief.IDLE, [[ -20,  -94,   70,   95], [  18, -104,   23,   26], [   0,    0,    0,    0]]]],
      ['heavy-punch-3',               [[[ 209,  485,  130,  106], [ 31,  99]], PushBox.Zangief.IDLE, [[ -10,  -89,   69,   89], [  34,  -99,   25,   22], [  41,  -88,   58,   22]], [  22,  -85,   74,   13]]],
      ['heavy-punch-4',               [[[ 347,  491,  111,  100], [ 23,  99]], PushBox.Zangief.IDLE, [[   1,  -90,   66,   91], [  44, -100,   22,   21], [   0,    0,    0,    0]]]],
      ['heavy-punch-5',               [[[ 209,  485,  130,  106], [ 31,  99]], PushBox.Zangief.IDLE, [[ -10,  -89,   69,   89], [  34,  -99,   25,   22], [  41,  -88,   58,   22]]]],

      ['light-kick-1',                [[[  16,  650,   93,  114], [ 30, 107]], PushBox.Zangief.IDLE, [[ -20,  -91,   61,   92], [  -7, -108,   26,   23], [   0,    0,    0,    0]]]],
      ['light-kick-2',                [[[ 117,  654,   89,  110], [ 19, 107]], PushBox.Zangief.IDLE, [[ -20,  -91,   61,   92], [  -7, -108,   26,   23], [   0,    0,    0,    0]]]],
      ['light-kick-3',                [[[ 214,  656,  120,  108], [ 12, 106]], PushBox.Zangief.IDLE, [[ -10,  -94,   55,   95], [   6, -108,   23,   21], [  33,  -66,   47,   48]], [  27,  -56,   70,   42]]],

      ['medium-kick-1',               [[[  16,  650,   93,  114], [ 30, 107]], PushBox.Zangief.IDLE, [[ -20,  -91,   61,   92], [  -7, -108,   26,   23], [   0,    0,    0,    0]]]],
      ['medium-kick-2',               [[[ 483,  654,  101,  110], [ 13, 109]], PushBox.Zangief.IDLE, [[  -3,  -98,   60,   99], [   9, -111,   23,   23], [   0,    0,    0,    0]]]],
      ['medium-kick-3',               [[[ 592,  655,  127,  109], [ -1, 108]], PushBox.Zangief.IDLE, [[   0,  -99,   56,  100], [  18, -109,   23,   21], [  40,  -80,   70,   33]], [  33,  -74,   87,   15]]],

      ['heavy-kick-1',                [[[ 977,  651,   88,  113], [ 42, 106]], PushBox.Zangief.IDLE, [[ -32,  -94,   60,   95], [ -17, -107,   23,   21], [   0,    0,    0,    0]]]],
      ['heavy-kick-2',                [[[1073,  649,  146,  115], [ 56, 109]], PushBox.Zangief.IDLE, [[ -33, -106,   49,  107], [  17, -100,   70,   55], [   0,    0,    0,    0]], [   5,  -96,   79,   35]]],

      ['crouch-light-punch-1',        [[[  16, 2236,   82,   77], [ 28,  70], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-light-punch-2',        [[[ 106, 2229,  120,   84], [ 32,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]], [   7,  -64,   74,   24]]],

      ['crouch-medium-punch-1',       [[[ 274, 2227,   86,   86], [ 35,  79], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-medium-punch-2',       [[[ 368, 2230,   84,   83], [ 28,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-medium-punch-3',       [[[ 460, 2226,  123,   87], [ 29,  81], 38], [ -26,  -55,   52,   56], [[ -20,  -65,  102,   28], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]], [   7,  -64,   88,   24]]],

      ['crouch-heavy-punch-1',        [[[ 274, 2227,   86,   86], [ 35,  79], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-heavy-punch-2',        [[[ 368, 2230,   84,   83], [ 28,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-heavy-punch-3',        [[[ 460, 2226,  123,   87], [ 29,  81], 38], [ -26,  -55,   52,   56], [[ -20,  -65,  102,   28], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]], [   7,  -64,  100,   24]]],

      ['crouch-light-kick-1',         [[[ 817, 2229,   95,   84], [ 29,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-light-kick-2',         [[[ 920, 2220,  144,   93], [ 30,  86], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -14,  -31,  102,   32]], [   1,  -23,   82,   24]]],

      ['crouch-medium-kick-1',        [[[ 817, 2229,   95,   84], [ 29,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-medium-kick-2',        [[[ 920, 2220,  144,   93], [ 30,  86], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -14,  -31,  102,   32]], [   0,  -23,  100,   24]]],

      ['crouch-heavy-kick-1',         [[[ 817, 2229,   95,   84], [ 29,  77], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -24,  -51,   78,   52]]]],
      ['crouch-heavy-kick-2',         [[[ 920, 2220,  144,   93], [ 30,  86], 38], [ -26,  -55,   52,   56], [[   2,  -63,   32,   22], [ -14,  -60,   50,   32], [ -14,  -31,  102,   32]], [  -1,  -31,  120,   32], FighterAttackReaction.SWEEP]],

      ['jump-up-light-punch-1',       [[[ 664, 2706,   86,   93], [ 25, 118], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-light-punch-2',       [[[ 758, 2683,   83,  116], [ 14, 137], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  23, -123,   40,   48], FighterAttackReaction.JUMP]],
      ['jump-up-light-punch-3',       [[[ 849, 2718,  128,   81], [ 15, 108], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  28,  -94,   66,   32], FighterAttackReaction.JUMP]],
      ['jump-up-light-punch-4',       [[[ 985, 2710,   88,   89], [ 29, 114], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-up-medium-punch-1',      [[[ 664, 2706,   86,   93], [ 25, 118], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-medium-punch-2',      [[[ 758, 2683,   83,  116], [ 14, 137], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  23, -123,   40,   48], FighterAttackReaction.JUMP]],
      ['jump-up-medium-punch-3',      [[[ 849, 2718,  128,   81], [ 15, 108], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  19,  -88,   92,   28], FighterAttackReaction.JUMP]],
      ['jump-up-medium-punch-4',      [[[ 985, 2710,   88,   89], [ 29, 114], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-up-heavy-punch-1',       [[[ 664, 2706,   86,   93], [ 25, 118], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-heavy-punch-2',       [[[ 758, 2683,   83,  116], [ 14, 137], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  23, -123,   40,   48], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-punch-3',       [[[ 849, 2718,  128,   81], [ 15, 108], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  21,  -94,   98,   32], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-punch-4',       [[[ 985, 2710,   88,   89], [ 29, 114], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-up-light-kick-1',        [[[ 391, 1315,  104,  102], [ 40, 103], 36], [ -22, -100,   44,   56], [[ -42, -100,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-light-kick-2',        [[[ 776, 3049,  179,   71], [ 79, 108], 36], [ -22, -100,   44,   56], [[ -58,  -92,   32,   24], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]], [   4,  -78,   78,   38], FighterAttackReaction.JUMP]],

      ['jump-up-medium-kick-1',       [[[ 391, 1315,  104,  102], [ 40, 103], 36], [ -22, -100,   44,   56], [[ -42, -100,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-medium-kick-2',       [[[ 776, 3049,  179,   71], [ 79, 108], 36], [ -22, -100,   44,   56], [[ -58,  -92,   32,   24], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]], [   2,  -78,  100,   38], FighterAttackReaction.JUMP]],
      ['jump-up-medium-kick-3',       [[[ 429, 3993,  165,   85], [ 70,  87], 36], [ -22, -100,   44,   56], [[   0,    0,    0,    0], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]]]],
      ['jump-up-medium-kick-4',       [[[ 602, 3946,   78,  132], [ 40, 127], 36], [ -22, -100,   44,   56], [[ -27,  -40,   32,   24], [ -38,  -68,   40,   30], [ -40,  -95,   44,   32]]]],
      ['jump-up-medium-kick-5',       [[[ 688, 3988,  163,   90], [ 81,  85], 36], [ -22, -100,   44,   56], [[  41,  -47,   32,   24], [  14,  -67,   38,   32], [ -23,  -81,   52,   24]]]],
      ['jump-up-medium-kick-6',       [[[ 129,  987,  106,  111], [ 18, 108], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-up-heavy-kick-1',        [[[ 391, 1315,  104,  102], [ 40, 103], 36], [ -22, -100,   44,   56], [[ -42, -100,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-up-heavy-kick-2',        [[[ 776, 3049,  179,   71], [ 79, 109], 36], [ -22, -100,   44,   56], [[ -58,  -92,   32,   24], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]], [   0,  -78,  118,   38], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-kick-3',        [[[ 429, 3993,  165,   85], [ 70,  87], 36], [ -22, -100,   44,   56], [[   0,    0,    0,    0], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]]]],
      ['jump-up-heavy-kick-4',        [[[ 602, 3946,   78,  132], [ 40, 127], 36], [ -22, -100,   44,   56], [[ -27,  -40,   32,   24], [ -38,  -68,   40,   30], [ -40,  -95,   44,   32]]]],
      ['jump-up-heavy-kick-5',        [[[ 688, 3988,  163,   90], [ 81,  85], 36], [ -22, -100,   44,   56], [[  41,  -47,   32,   24], [  14,  -67,   38,   32], [ -23,  -81,   52,   24]]]],
      ['jump-up-heavy-kick-6',        [[[ 129,  987,  106,  111], [ 18, 108], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-roll-light-punch-1',     [[[ 664, 2706,   86,   93], [ 25, 118], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-roll-light-punch-2',     [[[ 758, 2683,   83,  116], [ 14, 137], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  23, -123,   40,   48], FighterAttackReaction.JUMP]],
      ['jump-roll-light-punch-3',     [[[ 849, 2718,  128,   81], [ 15, 108], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  19,  -88,   74,   28], FighterAttackReaction.JUMP]],
      ['jump-roll-light-punch-4',     [[[ 985, 2710,   88,   89], [ 29, 114], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-roll-medium-punch-1',    [[[ 664, 2706,   86,   93], [ 25, 118], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-roll-medium-punch-2',    [[[ 758, 2683,   83,  116], [ 14, 137], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  18, -140,   50,   64], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-punch-3',    [[[ 849, 2718,  128,   81], [ 15, 108], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]], [  19,  -94,   86,   32], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-punch-4',    [[[ 985, 2710,   88,   89], [ 29, 114], 36], [ -22, -100,   44,   56], [[   8, -109,   72,   40], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-roll-heavy-punch-1',     [[[ 130, 3297,  102,   85], [ 39, 103], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-roll-heavy-punch-2',     [[[ 240, 3319,  158,   63], [ 81,  96], 36], [ -22, -100,   44,   56], [[  31,  -96,   32,   24], [   8,  -82,   46,   30], [ -22,  -76,   38,   30]]]],
      ['jump-roll-heavy-punch-3',     [[[ 406, 3326,  151,   56], [ 81,  88], 36], [ -22, -100,   44,   56], [[  31,  -96,   32,   24], [   8,  -82,   46,   30], [ -22,  -76,   38,   30]]]],
      ['jump-roll-heavy-punch-4',     [[[ 565, 3326,  174,   56], [ 79,  92], 36], [ -22, -100,   44,   56], [[  21,  -91,   72,   46], [   8,  -82,   46,   30], [ -22,  -76,   38,   30]], [  24,  -78,   84,   38], FighterAttackReaction.JUMP]],

      ['jump-roll-light-kick-1',      [[[ 664, 3718,   88,   77], [ 13, 108], 36], [ -22, -100,   44,   56], [[  11, -114,   32,   24], [   1,  -98,   42,   30], [   9,  -71,   40,   18]]]],
      ['jump-roll-light-kick-2',      [[[ 760, 3711,  107,   84], [ 37, 116], 36], [ -22, -100,   44,   56], [[  11, -114,   32,   24], [   1,  -98,   42,   30], [  -3,  -74,   72,   42]], [  13,  -71,   58,   40], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-kick-1',     [[[ 391, 1315,  104,  102], [ 40, 103], 36], [ -22, -100,   44,   56], [[ -42, -100,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],
      ['jump-roll-medium-kick-2',     [[[ 776, 3049,  179,   71], [ 80, 108], 36], [ -22, -100,   44,   56], [[ -58,  -92,   32,   24], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]], [   8,  -82,   74,   52], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-kick-3',     [[[ 429, 3993,  165,   85], [ 70,  87], 36], [ -22, -100,   44,   56], [[   0,    0,    0,    0], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]]]],
      ['jump-roll-medium-kick-4',     [[[ 602, 3946,   78,  132], [ 40, 127], 36], [ -22, -100,   44,   56], [[ -27,  -40,   32,   24], [ -38,  -68,   40,   30], [ -40,  -95,   44,   32]]]],
      ['jump-roll-medium-kick-5',     [[[ 688, 3988,  163,   90], [ 81,  85], 36], [ -22, -100,   44,   56], [[  41,  -47,   32,   24], [  14,  -67,   38,   32], [ -23,  -81,   52,   24]]]],
      ['jump-roll-medium-kick-6',     [[[ 129,  987,  106,  111], [ 18, 108], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['jump-roll-heavy-kick-1',      [[[ 391, 1315,  104,  102], [ 40, 103], 36], [ -22, -100,   44,   56], [[ -42, -100,   32,   24], [ -23,  -98,   88,   52], [   5,  -79,   90,   42]]]],
      ['jump-roll-heavy-kick-2',      [[[ 776, 3049,  179,   71], [ 80, 108], 36], [ -22, -100,   44,   56], [[ -58,  -92,   32,   24], [ -38,  -78,   44,   34], [   5,  -79,   90,   42]], [  13,  -77,   88,   42], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-kick-3',      [[[ 429, 3993,  165,   85], [ 70,  87], 36], [ -22, -100,   44,   56], [[   0,    0,    0,    0], [ -38,  -78,   44,   34], [  -1,  -74,   44,   34]]]],
      ['jump-roll-heavy-kick-4',      [[[ 602, 3946,   78,  132], [ 40, 127], 36], [ -22, -100,   44,   56], [[ -27,  -40,   32,   24], [ -38,  -68,   40,   30], [ -40,  -95,   44,   32]]]],
      ['jump-roll-heavy-kick-5',      [[[ 688, 3988,  163,   90], [ 81,  85], 36], [ -22, -100,   44,   56], [[  41,  -47,   32,   24], [  14,  -67,   38,   32], [ -23,  -81,   52,   24]]]],
      ['jump-roll-heavy-kick-6',      [[[ 129,  987,  106,  111], [ 18, 108], 36], [ -22, -100,   44,   56], [[  15, -110,   32,   24], [ -23,  -98,   88,   52], [   3,  -72,   40,   16]]]],

      ['block-stand-1',               [[[  16, 4118,   84,  106], [ 32,  99], 38], [ -26,  -81,   52,   82], [[  -1, -104,   32,   24], [ -25,  -92,   42,   50], [ -27,  -39,   50,   40]]]],

      ['block-crouch-1',              [[[ 148, 4155,   84,   69], [ 31,  62], 38], [ -26,  -55,   52,   56], [[   2,  -65,   32,   24], [ -14,  -60,   50,   32], [ -14,  -31,   50,   32]]]],

      ['hit-face-1',                  [[[  16, 4265,   93,  116], [ 45, 109], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-face-2',                  [[[ 117, 4264,  100,  117], [ 53, 110], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-face-3',                  [[[ 699, 4421,  107,  122], [ 59, 115], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['hit-stomach-1',               [[[ 265, 4273,   96,  108], [ 34, 101], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-stomach-2',               [[[ 369, 4281,  109,  100], [ 39,  93], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-stomach-3',               [[[ 630, 4288,   90,   93], [ 39,  93], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-stomach-4',               [[[ 728, 4295,  101,   86], [ 57,  79], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['hit-stomach-5',               [[[ 837, 4284,   83,   97], [ 35,  90], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['hit-crouch-1',                [[[  16, 4456,   91,   87], [ 37,  80], 38], [ -26,  -55,   52,   56], [[ -36,  -82,   32,   24], [ -29,  -66,   46,   36], [ -14,  -31,   50,   32]]]],
      ['hit-crouch-2',                [[[ 254, 4453,   91,   90], [ 40,  83], 38], [ -26,  -55,   52,   56], [[ -36,  -82,   32,   24], [ -29,  -66,   46,   36], [ -14,  -31,   50,   32]]]],

      ['stun-1',                      [[[ 902, 4584,   91,  109], [ 48, 102], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['stun-2',                      [[[1001, 4583,   77,  110], [ 58, 103], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['stun-3',                      [[[1086, 4592,   77,  101], [ 34,  93], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],
      ['stun-4',                      [[[1171, 4596,   99,   97], [ 32,  90], 38], PushBox.Zangief.IDLE, HurtBox.Zangief.IDLE]],

      ['hurt-air-1',                  [[[  16, 4977,  118,   73], [ 60,  83], 36], [ -22,  -69,   44,   50]]],
      ['hurt-air-2',                  [[[ 142, 4987,  124,   63], [ 62,  72], 36], [ -22,  -69,   44,   50]]],

      ['sweep-fall-1',                [[[  16, 4588,  116,  105], [ 68,  98], 36], [ -26,  -81,   52,   82], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-2',                [[[ 140, 4599,  124,   94], [ 62, 118], 36], [ -22, -100,   44,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-3',                [[[ 266, 4815,  124,   63], [ 62,  59], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-4',                [[[ 648, 4817,  145,   61], [ 73,  54], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-5',                [[[ 272, 4651,  144,   42], [ 72,  34], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['sweep-grounded-1',            [[[ 272, 4651,  144,   42], [ 72,  34], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['knockdown-1',                 [[[ 369, 4281,  109,  100], [ 39,  93], 38], [ -26,  -81,   52,   82], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-2',                 [[[ 142, 4751,  116,  127], [ 63, 120], 38], [ -26,  -81,   52,   82], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['getup-1',                     [[[ 272, 4651,  144,   42], [ 72,  34], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-2',                     [[[ 424, 4631,  119,   62], [ 53,  54], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-3',                     [[[ 980, 1657,   95,   72], [ 38,  64], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-4',                     [[[1083, 1658,   86,   71], [ 31,  64], 38], [ -26,  -55,   52,   56], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-5',                     [[[1131, 1777,  106,  103], [ 34,  96], 38], [ -26,  -81,   52,   82], [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['ko-airborne-1',               [[[  16, 5661,  100,  117], [ 50,  90]]]],
      ['ko-airborne-2',               [[[ 228, 5717,  145,   61], [ 72,  62], 38]]],

      ['ko-impact-1',                 [[[ 750, 5718,  110,   60], [ 55,  56], 38]]],

      ['ko-bounce-1',                 [[[1000, 5717,  145,   61], [ 72,  57], 38]]],

      ['ko-grounded-1',               [[[1153, 5736,  143,   42], [ 71,  38], 38]]],

      ['winner-pose-1',               [[[  16, 7170,   96,  115], [ 47, 108], 38]]],
      ['winner-pose-2',               [[[ 160, 7171,   93,  114], [ 41, 107], 38]]],
      ['winner-pose-3',               [[[ 261, 7165,   95,  120], [ 48, 113], 38]]],
      ['winner-pose-4',               [[[ 364, 7129,   91,  156], [ 45, 149], 38]]],
      ['winner-pose-5',               [[[ 503, 7171,   93,  114], [ 41, 107], 38]]],
      ['winner-pose-6',               [[[ 604, 7170,   96,  115], [ 47, 108], 38]]],
      ['winner-pose-7',               [[[1203, 7171,   89,  114], [ 41, 107], 38]]],
      ['winner-pose-8',               [[[1300, 7171,   95,  114], [ 34, 107], 38]]],

      ['arms-crossed-1',              [[[ 708, 7171,   91,  114], [ 45, 107], 38]]],
      ['arms-crossed-2',              [[[ 807, 7171,   91,  114], [ 45, 107], 38]]],
    ]);

    // prettier-ignore
    this.animations = {
      [FighterState.IDLE]: [
        ['idle-1',  8], ['idle-2',  8], ['idle-3',  8],
        ['idle-2',  8],
      ],

      [FighterState.WALK_FORWARD]: [
        ['forwards-1',  8], ['forwards-2',  8], ['forwards-3',  8],
        ['forwards-4',  8], ['forwards-5',  8], ['forwards-6',  8],
      ],

      [FighterState.WALK_BACKWARD]: [
        ['backwards-1',  8], ['backwards-2',  8], ['backwards-3',  8],
        ['backwards-4',  8], ['backwards-5',  8], ['backwards-6',  8],
      ],

      [FighterState.JUMP_START]: [
        ['crouch-1',     1], ['crouch-2',     1], ['crouch-3',     1],
        ['crouch-2',     1], ['jump-land-1',  1],
        ['jump-land-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP]: [
        ['jump-up-1',  8], ['jump-up-2',  6], ['jump-up-3',  8],
        ['jump-up-2',  6],
        ['jump-up-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_FORWARD]: [
        ['jump-roll-1',  8], ['jump-roll-2',  6], ['jump-roll-3',  8],
        ['jump-roll-2',  6],
        ['jump-roll-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_BACKWARD]: [
        ['jump-roll-1',  8], ['jump-roll-2',  6], ['jump-roll-3',  8],
        ['jump-roll-2',  6],
        ['jump-roll-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_LAND]: [
        ['jump-land-1',  2], ['jump-land-1',  5],
        ['jump-land-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH]: [
        ['crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.CROUCH_DOWN]: [
        ['crouch-1',  2], ['crouch-2',  2],
        ['crouch-3', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_UP]: [
        ['crouch-3',  2], ['crouch-2',  2], ['crouch-1',  2],
        ['crouch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.IDLE_TURN]: [
        ['idle-turn-4',  3], ['idle-turn-3',  3], ['idle-turn-2',  3],
        ['idle-turn-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_TURN]: [
        ['crouch-turn-4',  2], ['crouch-turn-3',  4], ['crouch-turn-2',  5],
        ['crouch-turn-1', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_PUNCH]: [
        ['light-punch-1',  2], ['light-punch-2',  4], ['light-punch-1',  4],
        ['light-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_PUNCH]: [
        ['medium-punch-1',  2], ['medium-punch-2',  2], ['medium-punch-3',  3],
        ['medium-punch-4',  4],
        ['medium-punch-4', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_PUNCH]: [
        ['heavy-punch-1',  3], ['heavy-punch-2',  3], ['heavy-punch-3',  6],
        ['heavy-punch-4', 10], ['heavy-punch-5',  8], ['heavy-punch-2',  6],
        ['heavy-punch-1',  4],
        ['heavy-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_KICK]: [
        ['light-kick-1',  2], ['light-kick-2',  2], ['light-kick-3',  4],
        ['light-kick-3', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_KICK]: [
        ['medium-kick-1',  3], ['medium-kick-2',  3], ['medium-kick-3',  4],
        ['medium-kick-2',  4], ['medium-kick-1',  4],
        ['medium-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_KICK]: [
        ['heavy-kick-1',  4], ['heavy-kick-2',  8], ['heavy-kick-1', 10],
        ['heavy-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_PUNCH]: [
        ['crouch-light-punch-1',  3], ['crouch-light-punch-2',  4],
        ['crouch-light-punch-2', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [
        ['crouch-medium-punch-1',  3], ['crouch-medium-punch-2',  3], ['crouch-medium-punch-3',  8],
        ['crouch-medium-punch-2',  4], ['crouch-medium-punch-1',  4],
        ['crouch-medium-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_PUNCH]: [
        ['crouch-heavy-punch-1',  3], ['crouch-heavy-punch-2',  3], ['crouch-heavy-punch-3',  8],
        ['crouch-heavy-punch-2', 10], ['crouch-heavy-punch-1', 12],
        ['crouch-heavy-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_KICK]: [
        ['crouch-light-kick-1',  3], ['crouch-light-kick-2',  4], ['crouch-light-kick-1',  6],
        ['crouch-light-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_KICK]: [
        ['crouch-medium-kick-1',  3], ['crouch-medium-kick-2',  6], ['crouch-medium-kick-1',  8],
        ['crouch-medium-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_KICK]: [
        ['crouch-heavy-kick-1',  3], ['crouch-heavy-kick-2', 10], ['crouch-heavy-kick-1', 12],
        ['crouch-heavy-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP_LIGHT_PUNCH]: [
        ['jump-up-light-punch-1',  3], ['jump-up-light-punch-2',  3], ['jump-up-light-punch-3',  8],
        ['jump-up-light-punch-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_PUNCH]: [
        ['jump-up-medium-punch-1',  3], ['jump-up-medium-punch-2',  3], ['jump-up-medium-punch-3',  8],
        ['jump-up-medium-punch-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_PUNCH]: [
        ['jump-up-heavy-punch-1',  3], ['jump-up-heavy-punch-2',  3], ['jump-up-heavy-punch-3',  8],
        ['jump-up-heavy-punch-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: [
        ['jump-roll-light-punch-1',  3], ['jump-roll-light-punch-2',  3], ['jump-roll-light-punch-3',  8],
        ['jump-roll-light-punch-4',  3],
        ['jump-roll-light-punch-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: [
        ['jump-roll-medium-punch-1',  3], ['jump-roll-medium-punch-2',  3], ['jump-roll-medium-punch-3',  8],
        ['jump-roll-medium-punch-4',  8],
        ['jump-roll-medium-punch-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: [
        ['jump-roll-heavy-punch-1',  2], ['jump-roll-heavy-punch-2',  3], ['jump-roll-heavy-punch-3',  3],
        ['jump-roll-heavy-punch-4',  7], ['jump-roll-heavy-punch-3',  3], ['jump-roll-heavy-punch-2',  3],
        ['jump-roll-heavy-punch-1',  2],
        ['jump-roll-heavy-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_LIGHT_KICK]: [
        ['jump-up-light-kick-1',  4], ['jump-up-light-kick-2', 38],
        ['jump-up-light-kick-2', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_KICK]: [
        ['jump-up-medium-kick-1',  4], ['jump-up-medium-kick-2', 16], ['jump-up-medium-kick-3',  8],
        ['jump-up-medium-kick-4',  6], ['jump-up-medium-kick-5',  4], ['jump-up-medium-kick-6',  4],
        ['jump-up-medium-kick-6', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_KICK]: [
        ['jump-up-heavy-kick-1',  4], ['jump-up-heavy-kick-2',  8], ['jump-up-heavy-kick-3',  8],
        ['jump-up-heavy-kick-4',  6], ['jump-up-heavy-kick-5',  4], ['jump-up-heavy-kick-6', 12],
        ['jump-up-heavy-kick-6', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: [
        ['jump-roll-light-kick-1',  6], ['jump-roll-light-kick-2', 50],
        ['jump-roll-light-kick-2', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: [
        ['jump-roll-medium-kick-1',  4], ['jump-roll-medium-kick-2', 16], ['jump-roll-medium-kick-3',  8],
        ['jump-roll-medium-kick-4',  6], ['jump-roll-medium-kick-5',  4],
        ['jump-roll-medium-kick-6', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: [
        ['jump-roll-heavy-kick-1',  4], ['jump-roll-heavy-kick-2',  8], ['jump-roll-heavy-kick-3',  8],
        ['jump-roll-heavy-kick-4',  6], ['jump-roll-heavy-kick-5',  4],
        ['jump-roll-heavy-kick-6', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND]: [
        ['block-stand-1',  8],
        ['block-stand-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_LIGHT]: [
        ['block-stand-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_MEDIUM]: [
        ['block-stand-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND_HEAVY]: [
        ['block-stand-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH]: [
        ['block-crouch-1',  8],
        ['block-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_LIGHT]: [
        ['block-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_MEDIUM]: [
        ['block-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_CROUCH_HEAVY]: [
        ['block-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_LIGHT]: [
        ['hit-crouch-1', FIGHTER_HURT_DELAY], ['hit-crouch-1',  2],
        ['hit-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_MEDIUM]: [
        ['hit-crouch-1', FIGHTER_HURT_DELAY], ['hit-crouch-1',  4], ['hit-crouch-2',  8],
        ['hit-crouch-2', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_HEAVY]: [
        ['hit-crouch-1', FIGHTER_HURT_DELAY], ['hit-crouch-1',  4], ['hit-crouch-2',  8],
        ['hit-crouch-2', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_FALL]: [
        ['sweep-fall-1',  6], ['sweep-fall-2',  6], ['sweep-fall-3',  8],
        ['sweep-fall-4',  6], ['sweep-fall-5',  8],
        ['sweep-fall-5', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_GROUNDED]: [
        ['sweep-grounded-1',  8],
        ['sweep-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.GETUP]: [
        ['getup-1',  6], ['getup-2',  6], ['getup-3',  6],
        ['getup-4',  6], ['getup-5',  6],
        ['getup-5', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_LIGHT]: [
        ['hit-face-1', FIGHTER_HURT_DELAY], ['hit-face-1',  3], ['hit-face-2',  8],
        ['hit-face-2', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_MEDIUM]: [
        ['hit-face-1', FIGHTER_HURT_DELAY], ['hit-face-1',  3], ['hit-face-2', 13],
        ['hit-face-2', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_HEAD_HEAVY]: [
        ['hit-face-2',    FIGHTER_HURT_DELAY], ['hit-face-2',     3], ['hit-face-3',     4],
        ['hit-stomach-1',  3], ['hit-stomach-3',  3], ['hit-stomach-4',  3],
        ['hit-stomach-5',  4],
        ['hit-stomach-5', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-2',  8],
        ['hit-stomach-2', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-3',  4],
        ['hit-stomach-4',  4], ['hit-stomach-5',  5],
        ['hit-stomach-5', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-3',  4],
        ['hit-stomach-4',  4], ['hit-stomach-5',  9],
        ['hit-stomach-5', FrameDelay.TRANSITION],
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
        ['winner-pose-2',  8], ['winner-pose-3',  8], ['winner-pose-4',  8, 'grunt'],
        ['winner-pose-3',  8], ['winner-pose-4',  8], ['winner-pose-3',  8],
        ['winner-pose-4',  1],
        ['winner-pose-4', FrameDelay.FREEZE],
      ],

      [FighterState.LOSER_POSE]: [
        ['arms-crossed-1', 20],
        ['arms-crossed-2', FrameDelay.FREEZE],
      ],
    };

    // prettier-ignore
    this.knockdownAnimation = [
      ['knockdown-1',  4], ['knockdown-2',  4],
    ];

    this.winnerAnimations = [
      this.animations[FighterState.WINNER_POSE],
      [
        ['winner-pose-5',   8], ['winner-pose-6',   8], ['arms-crossed-1',  8],
        ['arms-crossed-2',  8], ['arms-crossed-1',  8], ['arms-crossed-2',  8],
        ['arms-crossed-1',  8], ['winner-pose-7',   8], ['winner-pose-8',   8, 'laugh'],
        ['winner-pose-8',  FrameDelay.FREEZE],
      ],
    ];

    // prettier-ignore
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]:   150,
        [FighterState.WALK_BACKWARD]:  -90,
        [FighterState.JUMP_FORWARD]:   157.5,
        [FighterState.JUMP_BACKWARD]: -165,
      },
      jump: {
        [FighterState.JUMP_UP]:       -435,
        [FighterState.JUMP_FORWARD]:  -420,
        [FighterState.JUMP_BACKWARD]: -450,
      },
    };

    this.gravity          = 1237.5;
    this.jumpAcceleration =   70.3125;
  }
}
