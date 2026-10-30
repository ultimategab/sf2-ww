import { FIGHTER_HURT_DELAY, FighterAttackReaction, FighterState, FrameDelay, HurtBox, PushBox } from "../../constants/fighter.js";
import { Fighter } from "./Fighter.js";
import { playSound } from "../../engine/soundHandler.js";

export class EHonda extends Fighter {
  constructor(playerId, onAttackHit) {
    super(playerId, onAttackHit);
    this.image = document.querySelector("img[alt='e-honda']");

    // prettier-ignore
    this.frames = new Map([
      ['idle-1',                      [[[  16,   26,  101,   94], [ 53,  88], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['idle-2',                      [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['idle-3',                      [[[ 240,   33,  115,   87], [ 56,  81], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['idle-4',                      [[[ 363,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['forwards-1',                  [[[  16,  160,   99,   92], [ 50,  86], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['forwards-2',                  [[[ 123,  162,  100,   90], [ 53,  84], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['forwards-3',                  [[[ 231,  164,  100,   88], [ 53,  82], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['forwards-4',                  [[[ 339,  162,  100,   90], [ 53,  84], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['forwards-5',                  [[[ 447,  160,   99,   92], [ 50,  86], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['forwards-6',                  [[[ 554,  161,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['backwards-1',                 [[[ 669,  161,  108,   91], [ 56,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['backwards-2',                 [[[ 785,  163,  124,   89], [ 64,  83], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['backwards-3',                 [[[ 917,  164,  142,   88], [ 74,  82], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['backwards-4',                 [[[1067,  163,  124,   89], [ 64,  83], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['backwards-5',                 [[[1199,  161,  108,   91], [ 56,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['backwards-6',                 [[[1315,  161,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['jump-up-1',                   [[[ 327, 3304,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-up-2',                   [[[ 412, 3096,   97,   94], [ 58, 118], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],
      ['jump-up-3',                   [[[ 517, 3089,   95,   83], [ 56, 113], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],
      ['jump-up-4',                   [[[ 620, 3089,   94,   65], [ 57, 107], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],

      ['jump-forward-1',              [[[ 327, 4201,  119,  142], [ 70, 136]], PushBox.EHonda.JUMP, [[  -4, -107,   30,   26], [ -31,  -89,   40,   34], [ -50,  -57,   58,   28]]]],
      ['jump-forward-2',              [[[ 706, 1792,  108,   75], [ 66, 119], 15], PushBox.EHonda.JUMP, [[  15,  -79,   30,   26], [ -16, -101,   38,   40], [ -43, -109,   22,   52]]]],
      ['jump-forward-3',              [[[ 822, 1795,   81,   79], [ 34, 118], 15], PushBox.EHonda.JUMP, [[ -27,  -62,   30,   26], [ -16,  -82,   46,   30], [ -22, -100,   58,   20]]]],
      ['jump-forward-4',              [[[ 911, 1796,  109,   88], [ 53, 119], 15], PushBox.EHonda.JUMP, [[ -56,  -79,   30,   26], [ -28,  -82,   42,   38], [  -1, -101,   32,   40]]]],
      ['jump-forward-5',              [[[ 776, 4154,  113,   94], [ 51, 124], 15], PushBox.EHonda.JUMP, [[ -54, -103,   30,   26], [ -45,  -88,   44,   42], [  -1,  -84,   28,   46]]]],
      ['jump-forward-6',              [[[ 897, 4160,  129,  128], [ 87, 127]], PushBox.EHonda.JUMP, [[ -58, -103,   30,   26], [ -52,  -82,   34,   34], [ -34,  -64,   34,   34]]]],

      ['jump-backward-1',             [[[ 327, 3304,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-backward-2',             [[[ 412, 3096,   97,   94], [ 58, 118], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],
      ['jump-backward-3',             [[[ 517, 3089,   95,   83], [ 56, 113], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],
      ['jump-backward-4',             [[[ 620, 3089,   94,   65], [ 57, 107], 15], PushBox.EHonda.JUMP, HurtBox.EHonda.JUMP]],

      ['jump-land-1',                 [[[1028, 1853,   94,   70], [ 48,  64]], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['jump-land-2',                 [[[1130, 1848,   96,   76], [ 48,  70], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['jump-land-3',                 [[[1234, 1840,   97,   84], [ 51,  78], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['jump-land-4',                 [[[1339, 1833,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['crouch-1',                    [[[ 158, 1327,   97,   84], [ 51,  78], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['crouch-2',                    [[[ 263, 1335,   96,   76], [ 48,  70], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-3',                    [[[ 367, 1341,   94,   70], [ 48,  64], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],

      ['idle-turn-1',                 [[[ 518,   29,   97,   91], [ 58,  84]], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['idle-turn-2',                 [[[ 623,   28,  100,   92], [ 53,  86]], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['idle-turn-3',                 [[[ 731,   29,  107,   91], [ 53,  85]], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['crouch-turn-1',               [[[ 509, 1341,  101,   70], [ 50,  64]], PushBox.EHonda.CROUCH, [[ -28,  -65,   30,   28], [ -30,  -54,   62,   30], [ -43,  -24,   80,   24]]]],
      ['crouch-turn-2',               [[[ 618, 1340,  107,   71], [ 57,  64]], PushBox.EHonda.CROUCH, [[ -14,  -65,   30,   28], [ -30,  -54,   62,   30], [ -43,  -24,   80,   24]]]],
      ['crouch-turn-3',               [[[ 733, 1341,  101,   70], [ 51,  64], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],

      ['light-punch-1',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['light-punch-2',               [[[ 131,  294,  122,   89], [ 53,  84], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['light-punch-3',               [[[ 261,  301,  147,   82], [ 57,  77], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -37,  -77,   63,   72], [   0,    0,    0,    0]], [  12,  -63,   75,   17]]],
      ['light-punch-4',               [[[ 131,  294,  122,   89], [ 53,  84], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['light-punch-5',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['medium-punch-1',              [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-punch-2',              [[[ 131,  426,   96,   88], [ 48,  83], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -34,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-punch-3',              [[[ 235,  430,  121,   84], [ 51,  79], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -32,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-punch-4',              [[[ 364,  429,  145,   85], [ 46,  80], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -28,  -77,   63,   72], [   0,    0,    0,    0]], [  25,  -71,   72,   26]]],
      ['medium-punch-5',              [[[ 235,  430,  121,   84], [ 51,  79], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -32,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-punch-6',              [[[ 131,  426,   96,   88], [ 48,  83], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -34,  -77,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-punch-7',              [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['heavy-punch-1',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-2',               [[[ 131,  557,  104,  115], [ 51, 109], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-3',               [[[ 243,  554,  109,  118], [ 48, 112], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -38,  -76,   63,   72], [   0,    0,    0,    0]], [  12, -111,   42,   47]]],
      ['heavy-punch-4',               [[[ 360,  582,  161,   90], [ 53,  84], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -42,  -76,   63,   72], [   0,    0,    0,    0]], [  32,  -66,   74,   30]]],
      ['heavy-punch-5',               [[[ 529,  584,  117,   88], [ 57,  82], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -43,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-6',               [[[ 360,  582,  161,   90], [ 53,  84], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -42,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-7',               [[[ 243,  554,  109,  118], [ 48, 112], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -38,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-8',               [[[ 131,  557,  104,  115], [ 51, 109], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-punch-9',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['light-kick-1',                [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['light-kick-2',                [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['light-kick-3',                [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['light-kick-4',                [[[ 327,  724,  134,   80], [ -6,  83], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -37,  -75,   63,   72], [   0,    0,    0,    0]], [  44,  -45,   95,   31]]],
      ['light-kick-5',                [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['light-kick-6',                [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['light-kick-7',                [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['medium-kick-1',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-kick-2',               [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-kick-3',               [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-kick-4',               [[[ 327,  724,  134,   80], [ -6,  83], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -37,  -75,   63,   72], [   0,    0,    0,    0]], [  44,  -45,   95,   31]]],
      ['medium-kick-5',               [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-kick-6',               [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['medium-kick-7',               [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['heavy-kick-1',                [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-kick-2',                [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-kick-3',                [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-kick-4',                [[[ 327,  724,  134,   80], [ -6,  83], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -37,  -75,   63,   72], [   0,    0,    0,    0]], [  44,  -45,   95,   31]]],
      ['heavy-kick-5',                [[[ 241,  715,   78,   89], [ 15,  92], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -33,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-kick-6',                [[[ 131,  716,  102,   88], [ 45,  91], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -35,  -75,   63,   72], [   0,    0,    0,    0]]]],
      ['heavy-kick-7',                [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [ -36,  -76,   63,   72], [   0,    0,    0,    0]]]],

      ['crouch-light-punch-1',        [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-light-punch-2',        [[[  16, 1452,  135,   69], [ 47,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-light-punch-3',        [[[ 159, 1455,  154,   66], [ 44,  60], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  38,  -56,   74,   24]]],

      ['crouch-medium-punch-1',       [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-medium-punch-2',       [[[ 504, 1452,   99,   69], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-medium-punch-3',       [[[ 611, 1454,  128,   67], [ 48,  61], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-medium-punch-4',       [[[ 747, 1451,  149,   70], [ 44,  64], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  36,  -67,   78,   46]]],

      ['crouch-heavy-punch-1',        [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-heavy-punch-2',        [[[  16, 1561,  123,   74], [ 45,  68], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-heavy-punch-3',        [[[ 147, 1568,  155,   67], [ 39,  61], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  25,  -33,   94,   32], FighterAttackReaction.SWEEP]],
      ['crouch-heavy-punch-4',        [[[ 310, 1569,  127,   66], [ 38,  60], 17], PushBox.EHonda.CROUCH, [[  40,  -65,   30,   26], [  -9,  -58,   72,   30], [ -25,  -29,   82,   30]]]],
      ['crouch-heavy-punch-5',        [[[ 445, 1563,  127,   72], [ 36,  66], 17], PushBox.EHonda.CROUCH, [[  40,  -65,   30,   26], [  -9,  -58,   72,   30], [ -25,  -29,   82,   30]]]],
      ['crouch-heavy-punch-6',        [[[ 147, 1568,  155,   67], [ 39,  61], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],

      ['crouch-light-kick-1',         [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-light-kick-2',         [[[  16, 1678,  108,   74], [ 53,  67], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-light-kick-3',         [[[ 132, 1680,  118,   72], [ 56,  65], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-light-kick-4',         [[[ 258, 1681,  146,   71], [ 58,  64], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  20,  -66,   58,   40]]],

      ['crouch-medium-kick-1',        [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-medium-kick-2',        [[[  16, 1678,  108,   74], [ 53,  67], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-medium-kick-3',        [[[ 132, 1680,  118,   72], [ 56,  65], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [   5,  -55,   56,   30]]],
      ['crouch-medium-kick-4',        [[[ 258, 1681,  146,   71], [ 58,  64], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  23,  -66,   74,   40]]],
      ['crouch-medium-kick-5',        [[[ 132, 1680,  118,   72], [ 56,  65], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],

      ['crouch-heavy-kick-1',         [[[  16, 1341,   94,   70], [ 48,  63], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-heavy-kick-2',         [[[ 694, 1678,  109,   74], [ 53,  67], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['crouch-heavy-kick-3',         [[[ 811, 1675,  140,   77], [ 56,  69], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH, [  17,  -24,   72,   26], FighterAttackReaction.SWEEP]],
      ['crouch-heavy-kick-4',         [[[ 959, 1677,   82,   75], [ 58,  65], 17], PushBox.EHonda.CROUCH, [[ -60,  -67,   30,   26], [ -54,  -53,   50,   30], [ -54,  -26,   56,   26]]]],
      ['crouch-heavy-kick-5',         [[[1049, 1683,  109,   69], [121,  66], 17], PushBox.EHonda.CROUCH, [[ -49,  -70,   30,   26], [ -65,  -57,   46,   32], [ -78,  -27,   62,   26]], [-130,  -24,   72,   26], FighterAttackReaction.SWEEP]],
      ['crouch-heavy-kick-6',         [[[1166, 1679,   93,   73], [ 77,  68], 17], PushBox.EHonda.CROUCH, [[ -60,  -67,   30,   26], [ -54,  -53,   50,   30], [ -54,  -26,   56,   26]]]],

      ['jump-up-light-punch-1',       [[[ 930, 3088,   77,  130], [ 48, 130]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-up-light-punch-2',       [[[ 412, 3311,  116,  123], [ 76, 139]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-light-punch-3',       [[[ 536, 3320,  115,  114], [ 55, 125]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-light-punch-4',       [[[ 659, 3333,  147,  101], [ 53, 104]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8,  -79,   84,   32], FighterAttackReaction.JUMP]],
      ['jump-up-light-punch-5',       [[[ 814, 3499,  106,  105], [ 70, 108]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-up-medium-punch-1',      [[[ 930, 3088,   77,  130], [ 48, 130]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-up-medium-punch-2',      [[[ 412, 3311,  116,  123], [ 76, 139]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-medium-punch-3',      [[[ 536, 3320,  115,  114], [ 55, 125]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8, -124,   62,   46], FighterAttackReaction.JUMP]],
      ['jump-up-medium-punch-4',      [[[ 659, 3333,  147,  101], [ 53, 105]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8,  -88,   84,   50], FighterAttackReaction.JUMP]],
      ['jump-up-medium-punch-5',      [[[ 814, 3499,  106,  105], [ 70, 108]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-medium-punch-6',      [[[ 930, 3088,   77,  130], [ 50, 129]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-up-medium-punch-7',      [[[ 536, 3320,  115,  114], [ 55, 125]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-up-heavy-punch-1',       [[[ 930, 3088,   77,  130], [ 48, 130]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-up-heavy-punch-2',       [[[ 412, 3682,   90,   92], [ 51, 106]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-heavy-punch-3',       [[[ 510, 3679,  139,   95], [ 58, 108]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [  13,  -96,   74,   50], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-punch-4',       [[[ 657, 3675,  132,   99], [ 62, 109]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-up-heavy-punch-5',       [[[ 510, 3679,  139,   95], [ 58, 108]], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-up-light-kick-1',        [[[ 412, 3875,   95,   69], [ 41, 108]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-light-kick-2',        [[[ 515, 3868,  103,   76], [ 45, 117]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-light-kick-3',        [[[ 626, 3864,  148,   80], [ 57, 120]], PushBox.EHonda.JUMP, [[ -33, -122,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]], [  18,  -75,   72,   30], FighterAttackReaction.JUMP]],

      ['jump-up-medium-kick-1',       [[[ 412, 3875,   95,   69], [ 41, 108]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-medium-kick-2',       [[[ 515, 3868,  103,   76], [ 45, 117]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-medium-kick-3',       [[[ 626, 3864,  148,   80], [ 57, 120]], PushBox.EHonda.JUMP, [[   0,    0,    0,    0], [ -31,  -89,   40,   34], [   0,    0,    0,    0]], [  18,  -75,   72,   30], FighterAttackReaction.JUMP]],
      ['jump-up-medium-kick-4',       [[[ 620, 3089,   94,   65], [ 59, 107]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-medium-kick-5',       [[[ 722, 3084,   95,   83], [ 58, 112]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-medium-kick-6',       [[[ 825, 3087,   97,   94], [ 59, 117]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-medium-kick-7',       [[[ 930, 3088,   77,  130], [ 48, 130]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],

      ['jump-up-heavy-kick-1',        [[[ 412, 3875,   95,   69], [ 41, 108]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-heavy-kick-2',        [[[ 515, 3868,  103,   76], [ 45, 117]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-heavy-kick-3',        [[[ 626, 3864,  148,   80], [ 57, 120]], PushBox.EHonda.JUMP, [[   0,    0,    0,    0], [ -31,  -89,   40,   34], [   0,    0,    0,    0]], [  18,  -75,   72,   30], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-kick-4',        [[[ 620, 3089,   94,   65], [ 59, 107]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-heavy-kick-5',        [[[ 722, 3084,   95,   83], [ 58, 112]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-heavy-kick-6',        [[[ 825, 3087,   97,   94], [ 59, 117]], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-up-heavy-kick-7',        [[[ 930, 3088,   77,  130], [ 48, 130]], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],

      ['jump-roll-light-punch-1',     [[[ 930, 3088,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-roll-light-punch-2',     [[[ 412, 3311,  116,  123], [ 76, 139], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-light-punch-3',     [[[ 536, 3320,  115,  114], [ 55, 125], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-light-punch-4',     [[[ 659, 3333,  147,  101], [ 54, 104], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8,  -79,   84,   32], FighterAttackReaction.JUMP]],
      ['jump-roll-light-punch-5',     [[[ 814, 3499,  106,  105], [ 70, 108], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-roll-medium-punch-1',    [[[ 930, 3088,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-roll-medium-punch-2',    [[[ 412, 3311,  116,  123], [ 76, 139], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-medium-punch-3',    [[[ 536, 3320,  115,  114], [ 55, 125], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8, -124,   62,   46], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-punch-4',    [[[ 659, 3333,  147,  101], [ 53, 105], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [   8,  -88,   84,   50], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-punch-5',    [[[ 814, 3499,  106,  105], [ 70, 108], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-medium-punch-6',    [[[ 930, 3088,   77,  130], [ 50, 129], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-roll-medium-punch-7',    [[[ 536, 3320,  115,  114], [ 55, 125], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-roll-heavy-punch-1',     [[[ 930, 3088,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],
      ['jump-roll-heavy-punch-2',     [[[ 412, 3682,   90,   92], [ 51, 106], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-heavy-punch-3',     [[[ 510, 3679,  139,   95], [ 58, 108], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]], [  13,  -96,   74,   50], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-punch-4',     [[[ 657, 3675,  132,   99], [ 62, 109], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],
      ['jump-roll-heavy-punch-5',     [[[ 510, 3679,  139,   95], [ 58, 108], 15], PushBox.EHonda.JUMP, [[   0, -107,   30,   26], [ -29,  -98,   48,   38], [ -40,  -62,   50,   26]]]],

      ['jump-roll-light-kick-1',      [[[ 454, 4417,  125,  108], [ 67, 113], 15], PushBox.EHonda.JUMP, [[ -35, -102,   30,   26], [ -42,  -90,   48,   46], [ -29,  -60,   58,   28]]]],
      ['jump-roll-light-kick-2',      [[[ 587, 4453,  116,   72], [ 59,  80], 15], PushBox.EHonda.JUMP, [[ -14,  -71,   30,   26], [ -28,  -60,   52,   42], [ -11,  -43,   52,   12]]]],
      ['jump-roll-light-kick-3',      [[[ 711, 4469,   98,   56], [ 51,  68], 15], PushBox.EHonda.JUMP, [[ -14,  -71,   30,   26], [ -28,  -60,   52,   42], [ -11,  -43,   52,   12]], [ -29,  -46,   54,   32], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-kick-1',     [[[ 454, 4631,  112,   76], [ 59, 102], 15], PushBox.EHonda.JUMP, [[   7, -105,   30,   26], [ -28,  -95,   56,   34], [ -35,  -65,   52,   18]]]],
      ['jump-roll-medium-kick-2',     [[[ 574, 4643,  129,   64], [ 83,  91], 15], PushBox.EHonda.JUMP, [[   7,  -81,   30,   26], [ -38,  -73,   62,   30], [ -60,  -59,   42,   28]]]],
      ['jump-roll-medium-kick-3',     [[[ 711, 4634,  155,   73], [ 96,  96], 15], PushBox.EHonda.JUMP, [[   7,  -81,   30,   26], [ -38,  -73,   62,   30], [ -60,  -59,   42,   28]], [ -64,  -72,  106,   44], FighterAttackReaction.JUMP]],

      ['jump-roll-heavy-kick-1',      [[[ 412, 3875,   95,   69], [ 41, 108], 15], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-roll-heavy-kick-2',      [[[ 515, 3868,  103,   76], [ 45, 117], 15], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-roll-heavy-kick-3',      [[[ 626, 3864,  148,   80], [ 58, 119], 15], PushBox.EHonda.JUMP, [[ -33, -122,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]], [  18,  -75,   72,   30], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-kick-4',      [[[ 620, 3089,   94,   65], [ 59, 107], 15], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-roll-heavy-kick-5',      [[[ 722, 3084,   95,   83], [ 58, 112], 15], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-roll-heavy-kick-6',      [[[ 825, 3087,   97,   94], [ 59, 117], 15], PushBox.EHonda.JUMP, [[  -8, -109,   30,   26], [ -28,  -95,   54,   28], [ -35,  -69,   68,   14]]]],
      ['jump-roll-heavy-kick-7',      [[[ 930, 3088,   77,  130], [ 48, 130], 15], PushBox.EHonda.JUMP, [[ -24, -131,   30,   26], [ -34, -113,   42,   46], [ -38,  -67,   50,   30]]]],

      ['block-stand-1',               [[[ 131, 1816,   98,   99], [ 54,  93], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['block-stand-2',               [[[ 237, 1810,  104,  105], [ 60,  99], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['block-stand-3',               [[[ 237, 1810,  104,  105], [ 60,  99], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['block-crouch-1',              [[[ 380, 4957,  106,   77], [ 52,  71], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['block-crouch-2',              [[[ 494, 4954,   95,   80], [ 51,  72], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],
      ['block-crouch-3',              [[[ 494, 4954,   95,   80], [ 51,  72], 17], PushBox.EHonda.CROUCH, HurtBox.EHonda.CROUCH]],

      ['hit-face-1',                  [[[  16, 5074,   96,   97], [ 52,  91], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['hit-face-2',                  [[[ 427, 5078,   83,   93], [ 56,  87], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['hit-face-3',                  [[[ 753, 5080,   80,   91], [ 64,  85], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['hit-stomach-1',               [[[ 160, 5085,  115,   86], [ 56,  80], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['hit-stomach-2',               [[[1199, 5098,  108,   73], [ 56,  71], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['hit-stomach-3',               [[[1315, 5087,  101,   84], [ 56,  82], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['hit-crouch-1',                [[[  16, 5230,   96,   81], [ 52,  75], 17], PushBox.EHonda.CROUCH, [[ -40,  -77,   28,   26], [ -49,  -57,   52,   32], [ -43,  -24,   80,   24]]]],
      ['hit-crouch-2',                [[[  16, 5230,   96,   81], [ 52,  75], 17], PushBox.EHonda.CROUCH, [[ -40,  -77,   28,   26], [ -49,  -57,   52,   32], [ -43,  -24,   80,   24]]]],
      ['hit-crouch-3',                [[[ 473, 5234,  108,   77], [ 64,  69], 17], PushBox.EHonda.CROUCH, [[ -64,  -74,   28,   26], [ -49,  -57,   52,   32], [ -43,  -24,   80,   24]]]],
      ['hit-crouch-4',                [[[  16, 5230,   96,   81], [ 52,  75], 17], PushBox.EHonda.CROUCH, [[ -40,  -77,   28,   26], [ -49,  -57,   52,   32], [ -43,  -24,   80,   24]]]],
      ['hit-crouch-5',                [[[ 473, 5234,  108,   77], [ 64,  69], 17], PushBox.EHonda.CROUCH, [[ -64,  -74,   28,   26], [ -49,  -57,   52,   32], [ -43,  -24,   80,   24]]]],

      ['stun-1',                      [[[1055, 5211,  106,  100], [ 58,  99], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['stun-2',                      [[[ 944, 5211,  103,  100], [ 55,  94], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],
      ['stun-3',                      [[[ 838, 5218,   98,   93], [ 51,  87], 17], PushBox.EHonda.IDLE, HurtBox.EHonda.IDLE]],

      ['hurt-air-1',                  [[[  16, 5372,  103,   88], [ 67,  80], 15], PushBox.EHonda.JUMP]],
      ['hurt-air-2',                  [[[ 911, 1796,  109,   88], [ 66,  84]], PushBox.EHonda.JUMP]],
      ['hurt-air-3',                  [[[ 822, 1795,   81,   79], [ 34, 118], 15], PushBox.EHonda.JUMP]],
      ['hurt-air-4',                  [[[ 706, 1792,  108,   75], [ 66, 119], 15], PushBox.EHonda.JUMP]],
      ['hurt-air-5',                  [[[1028, 1853,   94,   70], [ 48,  64], 17], PushBox.EHonda.CROUCH]],
      ['hurt-air-6',                  [[[1130, 1848,   96,   76], [ 48,  70], 17], PushBox.EHonda.CROUCH]],
      ['hurt-air-7',                  [[[1234, 1840,   97,   84], [ 51,  78], 17], PushBox.EHonda.CROUCH]],
      ['hurt-air-8',                  [[[1339, 1833,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE]],

      ['sweep-fall-1',                [[[  16, 5500,  117,   92], [ 67,  91], 15], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-2',                [[[ 141, 5542,  120,   50], [ 75,  96], 15], PushBox.EHonda.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-3',                [[[ 269, 5642,   82,   82], [ 66,  86], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-4',                [[[ 359, 5665,  131,   59], [ 80,  57], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['sweep-grounded-1',            [[[ 498, 5682,  175,   42], [118,  34], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['knockdown-1',                 [[[ 160, 5085,  115,   86], [ 56,  80], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-2',                 [[[1199, 5098,  108,   73], [ 56,  71], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['getup-1',                     [[[ 446, 5536,  150,   56], [ 77,  49], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-2',                     [[[ 604, 5523,  105,   69], [ 61,  69], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-3',                     [[[ 822, 1795,   81,   79], [ 34, 118], 15], PushBox.EHonda.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-4',                     [[[ 706, 1792,  108,   75], [ 66, 119], 15], PushBox.EHonda.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-5',                     [[[  16, 1341,   94,   70], [ 48,  64], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-6',                     [[[ 263, 1335,   96,   76], [ 48,  70], 17], PushBox.EHonda.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-7',                     [[[ 158, 1327,   97,   84], [ 51,  78], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-8',                     [[[ 125,   29,  107,   91], [ 54,  85], 17], PushBox.EHonda.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['ko-airborne-1',               [[[  16, 5500,  117,   92], [ 58,  78]]]],
      ['ko-airborne-2',               [[[ 141, 5542,  120,   50], [ 60,  57]]]],

      ['ko-impact-1',                 [[[ 269, 5550,  169,   42], [ 84,  38]]]],

      ['ko-bounce-1',                 [[[ 446, 5536,  150,   56], [ 75,  52], 17]]],

      ['ko-grounded-1',               [[[ 269, 5550,  169,   42], [ 84,  38]]]],

      ['winner-pose-1',               [[[ 165, 7122,  100,   87], [ 56,  81], 17]]],
      ['winner-pose-2',               [[[ 273, 7109,  101,  100], [ 50,  96]]]],
      ['winner-pose-3',               [[[ 382, 7073,   92,  136], [ 46, 132]]]],
      ['winner-pose-4',               [[[  16, 7267,  107,   91], [ 54,  85], 17]]],
      ['winner-pose-5',               [[[ 131, 7269,  122,   89], [ 53,  83], 17]]],
      ['winner-pose-6',               [[[ 261, 7276,  147,   82], [ 57,  76], 17]]],
      ['winner-pose-7',               [[[ 416, 7276,  147,   82], [ 57,  76], 17]]],
      ['winner-pose-8',               [[[ 571, 7273,  147,   85], [ 57,  79], 17]]],
      ['winner-pose-9',               [[[ 726, 7273,  147,   85], [ 57,  79], 17]]],
      ['winner-pose-10',              [[[ 881, 7273,  147,   85], [ 57,  79], 17]]],
      ['winner-pose-11',              [[[1036, 7276,  147,   82], [ 57,  76], 17]]],

      ['loser-pose-1',                [[[ 838, 5218,   98,   93], [ 51,  87], 17]]],
      ['loser-pose-2',                [[[ 944, 5211,  103,  100], [ 55,  94], 17]]],
      ['loser-pose-3',                [[[1055, 5211,  106,  100], [ 58,  99], 17]]],
    ]);

    // prettier-ignore
    this.animations = {
      [FighterState.IDLE]: [
        ['idle-1',  8], ['idle-2',  8], ['idle-3',  8],
        ['idle-2',  8],
      ],

      [FighterState.WALK_FORWARD]: [
        ['forwards-1',   4], ['forwards-2',   4], ['forwards-3',   4],
        ['forwards-2',   4], ['forwards-1',   4], ['forwards-6',   4],
        ['backwards-1',  4], ['backwards-2',  4], ['backwards-3',  4],
        ['backwards-2',  4], ['backwards-1',  4], ['forwards-6',   4],
      ],

      [FighterState.WALK_BACKWARD]: [
        ['forwards-1',   4], ['forwards-2',   4], ['forwards-3',   4],
        ['forwards-2',   4], ['forwards-1',   4], ['backwards-6',  4],
        ['backwards-1',  4], ['backwards-2',  4], ['backwards-3',  4],
        ['backwards-2',  4], ['backwards-1',  4], ['backwards-6',  4],
      ],

      [FighterState.JUMP_START]: [
        ['crouch-1',  2], ['crouch-2',  2], ['crouch-3',  2],
        ['crouch-3', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP]: [
        ['jump-up-1', 10], ['jump-up-2',  5], ['jump-up-3',  5],
        ['jump-up-4',  5], ['jump-up-3',  5], ['jump-up-2',  5],
        ['jump-up-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_FORWARD]: [
        ['jump-forward-1', 10], ['jump-forward-2',  6], ['jump-forward-3',  4],
        ['jump-forward-4',  4], ['jump-forward-5',  6],
        ['jump-forward-6', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_BACKWARD]: [
        ['jump-up-1', 10], ['jump-up-2',  5], ['jump-up-3',  5],
        ['jump-up-4',  5], ['jump-up-3',  5], ['jump-up-2',  5],
        ['jump-up-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_LAND]: [
        ['jump-land-4',  2], ['jump-land-4',  5],
        ['jump-land-4', FrameDelay.TRANSITION],
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
        ['idle-turn-3',  2], ['idle-turn-2',  2], ['idle-turn-1',  4],
        ['idle-turn-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_TURN]: [
        ['crouch-turn-3',  3], ['crouch-turn-2',  3], ['crouch-turn-1',  3],
        ['crouch-1',      FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_PUNCH]: [
        ['light-punch-1',  3], ['light-punch-2',  2], ['light-punch-3',  4],
        ['light-punch-4',  2],
        ['light-punch-5', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_PUNCH]: [
        ['medium-punch-1',  3], ['medium-punch-2',  2], ['medium-punch-3',  2],
        ['medium-punch-4',  4], ['medium-punch-5',  2], ['medium-punch-6',  2],
        ['medium-punch-7', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_PUNCH]: [
        ['heavy-punch-1',  4], ['heavy-punch-2',  3], ['heavy-punch-3',  3],
        ['heavy-punch-4',  4], ['heavy-punch-5',  7], ['heavy-punch-6',  5],
        ['heavy-punch-7',  3], ['heavy-punch-8',  2],
        ['heavy-punch-9', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_KICK]: [
        ['light-kick-1',  4], ['light-kick-2',  3], ['light-kick-3',  3],
        ['light-kick-4',  4], ['light-kick-5',  3], ['light-kick-6',  3],
        ['light-kick-7', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_KICK]: [
        ['medium-kick-1',  4], ['medium-kick-2',  3], ['medium-kick-3',  3],
        ['medium-kick-4',  4], ['medium-kick-5',  5], ['medium-kick-6',  6],
        ['medium-kick-7', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_KICK]: [
        ['heavy-kick-1',  4], ['heavy-kick-2',  3], ['heavy-kick-3',  3],
        ['heavy-kick-4',  6], ['heavy-kick-5',  8], ['heavy-kick-6', 10],
        ['heavy-kick-7', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_PUNCH]: [
        ['crouch-light-punch-1',  2], ['crouch-light-punch-2',  2], ['crouch-light-punch-3',  8],
        ['crouch-light-punch-2',  2],
        ['crouch-light-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [
        ['crouch-medium-punch-1',  2], ['crouch-medium-punch-2',  2], ['crouch-medium-punch-3',  2],
        ['crouch-medium-punch-4',  8], ['crouch-medium-punch-3',  6], ['crouch-medium-punch-2',  4],
        ['crouch-medium-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_PUNCH]: [
        ['crouch-heavy-punch-1',  2], ['crouch-heavy-punch-2',  3], ['crouch-heavy-punch-3',  4],
        ['crouch-heavy-punch-4',  6], ['crouch-heavy-punch-5',  8], ['crouch-heavy-punch-4',  6],
        ['crouch-heavy-punch-6',  4], ['crouch-heavy-punch-2',  3],
        ['crouch-heavy-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_KICK]: [
        ['crouch-light-kick-1',  3], ['crouch-light-kick-2',  3], ['crouch-light-kick-3',  3],
        ['crouch-light-kick-4',  3], ['crouch-light-kick-3',  3], ['crouch-light-kick-2',  3],
        ['crouch-light-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_KICK]: [
        ['crouch-medium-kick-1',  3], ['crouch-medium-kick-2',  3], ['crouch-medium-kick-3',  3],
        ['crouch-medium-kick-4',  6], ['crouch-medium-kick-5',  5], ['crouch-medium-kick-2',  4],
        ['crouch-medium-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_KICK]: [
        ['crouch-heavy-kick-1',  3], ['crouch-heavy-kick-2',  4], ['crouch-heavy-kick-3',  6],
        ['crouch-heavy-kick-4',  4], ['crouch-heavy-kick-5',  8], ['crouch-heavy-kick-6',  6],
        ['crouch-heavy-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP_LIGHT_PUNCH]: [
        ['jump-up-light-punch-1',  4], ['jump-up-light-punch-2',  4], ['jump-up-light-punch-3',  4],
        ['jump-up-light-punch-4', 30],
        ['jump-up-light-punch-5', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_PUNCH]: [
        ['jump-up-medium-punch-1',  4], ['jump-up-medium-punch-2',  4], ['jump-up-medium-punch-3',  4],
        ['jump-up-medium-punch-4', 12], ['jump-up-medium-punch-5',  8], ['jump-up-medium-punch-6',  4],
        ['jump-up-medium-punch-7',  4],
        ['jump-up-medium-punch-2', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_PUNCH]: [
        ['jump-up-heavy-punch-1',  4], ['jump-up-heavy-punch-2',  4], ['jump-up-heavy-punch-3',  6],
        ['jump-up-heavy-punch-4',  8], ['jump-up-heavy-punch-5',  4], ['jump-up-heavy-punch-2',  4],
        ['jump-up-heavy-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: [
        ['jump-roll-light-punch-1',  4], ['jump-roll-light-punch-2',  4], ['jump-roll-light-punch-3',  4],
        ['jump-roll-light-punch-4', 30],
        ['jump-roll-light-punch-5', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: [
        ['jump-roll-medium-punch-1',  4], ['jump-roll-medium-punch-2',  4], ['jump-roll-medium-punch-3',  4],
        ['jump-roll-medium-punch-4', 12], ['jump-roll-medium-punch-5',  8], ['jump-roll-medium-punch-6',  4],
        ['jump-roll-medium-punch-7',  4],
        ['jump-roll-medium-punch-2', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: [
        ['jump-roll-heavy-punch-1',  4], ['jump-roll-heavy-punch-2',  4], ['jump-roll-heavy-punch-3',  6],
        ['jump-roll-heavy-punch-4',  8], ['jump-roll-heavy-punch-5',  4], ['jump-roll-heavy-punch-2',  4],
        ['jump-roll-heavy-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_LIGHT_KICK]: [
        ['jump-up-light-kick-1',  4], ['jump-up-light-kick-2',  4], ['jump-up-light-kick-3', 30],
        ['jump-up-light-kick-2',  4],
        ['jump-up-light-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_KICK]: [
        ['jump-up-medium-kick-1',  4], ['jump-up-medium-kick-2',  4], ['jump-up-medium-kick-3', 12],
        ['jump-up-medium-kick-2',  4], ['jump-up-medium-kick-1',  4], ['jump-up-medium-kick-4',  4],
        ['jump-up-medium-kick-5',  4], ['jump-up-medium-kick-6',  4],
        ['jump-up-medium-kick-7', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_KICK]: [
        ['jump-up-heavy-kick-1',  4], ['jump-up-heavy-kick-2',  4], ['jump-up-heavy-kick-3',  6],
        ['jump-up-heavy-kick-2',  4], ['jump-up-heavy-kick-1', 10], ['jump-up-heavy-kick-4',  4],
        ['jump-up-heavy-kick-5',  4], ['jump-up-heavy-kick-6',  4],
        ['jump-up-heavy-kick-7', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: [
        ['jump-roll-light-kick-1',  4], ['jump-roll-light-kick-2',  4],
        ['jump-roll-light-kick-3', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: [
        ['jump-roll-medium-kick-1',  4], ['jump-roll-medium-kick-2',  4],
        ['jump-roll-medium-kick-3', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: [
        ['jump-roll-heavy-kick-1',  4], ['jump-roll-heavy-kick-2',  4], ['jump-roll-heavy-kick-3', 12],
        ['jump-roll-heavy-kick-2',  4], ['jump-roll-heavy-kick-1',  4], ['jump-roll-heavy-kick-4',  4],
        ['jump-roll-heavy-kick-5',  4], ['jump-roll-heavy-kick-6',  4],
        ['jump-roll-heavy-kick-7', FrameDelay.FREEZE],
      ],

      [FighterState.BLOCK_STAND]: [
        ['block-stand-1',  8],
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
        ['block-crouch-1',  8],
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
        ['hit-crouch-1', FIGHTER_HURT_DELAY],
        ['hit-crouch-1', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_MEDIUM]: [
        ['hit-crouch-2', FIGHTER_HURT_DELAY], ['hit-crouch-2',  8],
        ['hit-crouch-3', FrameDelay.FREEZE],
      ],

      [FighterState.HURT_CROUCH_HEAVY]: [
        ['hit-crouch-4', FIGHTER_HURT_DELAY], ['hit-crouch-4', 12],
        ['hit-crouch-5', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_FALL]: [
        ['sweep-fall-1',  6], ['sweep-fall-2',  6], ['sweep-fall-3', 16],
        ['sweep-fall-4', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_GROUNDED]: [
        ['sweep-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.GETUP]: [
        ['getup-1',  6], ['getup-2',  6], ['getup-3',  6],
        ['getup-4',  6], ['getup-5',  1], ['getup-6',  1],
        ['getup-7',  1],
        ['getup-8', FrameDelay.TRANSITION],
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
        ['hit-stomach-1',  4], ['hit-stomach-2',  4], ['hit-stomach-3',  5],
        ['hit-stomach-3', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1', 11],
        ['hit-stomach-1', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1', 16],
        ['hit-stomach-1', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY], ['hit-stomach-1',  3], ['hit-stomach-2',  4],
        ['hit-stomach-3', 13],
        ['hit-stomach-3', FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_AIR]: [
        ['hurt-air-1', 30 + FIGHTER_HURT_DELAY], ['hurt-air-2',  3], ['hurt-air-3',  3],
        ['hurt-air-4',  3], ['hurt-air-5',  3], ['hurt-air-6',  3],
        ['hurt-air-7',  3],
        ['hurt-air-8', FrameDelay.FREEZE],
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
        ['winner-pose-1',  8], ['winner-pose-2',  8],
        ['winner-pose-3', FrameDelay.FREEZE],
      ],

      [FighterState.LOSER_POSE]: [
        ['loser-pose-1',  8], ['loser-pose-2',  8], ['loser-pose-3', 12],
        ['loser-pose-2',  8],
      ],
    };


    this.knockdownAnimation = [
      ['knockdown-1',  4],
      ['knockdown-2', FrameDelay.FREEZE],
    ];

    // prettier-ignore
    this.winnerAnimations = [
      this.animations[FighterState.WINNER_POSE],
      [
        ['winner-pose-4',   8], ['winner-pose-5',   8], ['winner-pose-6',  16, 'e-honda-dosukoi'],
        ['winner-pose-7',   8], ['winner-pose-8',   8], ['winner-pose-9',   8],
        ['winner-pose-10',  8],
        ['winner-pose-11', FrameDelay.FREEZE],
      ],
    ];

    // prettier-ignore
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]:   142.5,
        [FighterState.WALK_BACKWARD]:  -97.5,
        [FighterState.JUMP_FORWARD]:   195,
        [FighterState.JUMP_BACKWARD]: -202.5,
      },
      jump: {
        [FighterState.JUMP_UP]:       -397.5,
        [FighterState.JUMP_FORWARD]:  -390,
        [FighterState.JUMP_BACKWARD]: -397.5,
      },
    };

    this.gravity          = 1068.75;
    this.jumpAcceleration =   70.3125;
  }

  handleWinnerPoseInit(time) {
    super.handleWinnerPoseInit(time);
    if (this.winnerPose === 0) playSound(document.querySelector("audio#laugh"));
  }
}
