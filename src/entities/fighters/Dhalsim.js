import { FIGHTER_HURT_DELAY, FighterAttackReaction, FighterAttackStrength, FighterState, FrameDelay, HurtBox, PushBox } from "../../constants/fighter.js";
import { Fighter } from "./Fighter.js";

export class Dhalsim extends Fighter {
  constructor(playerId, onAttackHit) {
    super(playerId, onAttackHit);
    this.image = document.querySelector("img[alt='dhalsim']");

    // prettier-ignore
    this.frames = new Map([
      ['idle-1',                      [[[  14,    6,   73,  100], [ 28,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-2',                      [[[  99,    6,   68,  100], [ 28,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-3',                      [[[ 185,   10,   68,   96], [ 28,  93], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-4',                      [[[ 274,   15,   73,   91], [ 28,  88], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-5',                      [[[ 367,   16,   77,   90], [ 28,  87], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-6',                      [[[ 458,   12,   75,   94], [ 28,  91], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['forwards-1',                  [[[   9,  136,   87,   95], [ 45,  92], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-2',                  [[[ 107,  133,   79,   98], [ 38,  95], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-3',                  [[[ 206,  131,   73,  100], [ 28,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-4',                  [[[ 297,  130,   69,  101], [ 21,  98], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-5',                  [[[ 383,  131,   66,  100], [ 25,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-6',                  [[[ 464,  133,   69,   98], [ 29,  95], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['forwards-7',                  [[[ 550,  134,   76,   97], [ 38,  94], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['backwards-1',                 [[[ 705,  133,   87,   99], [ 45,  96], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-2',                 [[[ 809,  130,   72,  102], [ 38,  99], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-3',                 [[[ 907,  128,   65,  104], [ 30, 101], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-4',                 [[[ 994,  127,   69,  105], [ 31, 102], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-5',                 [[[1078,  128,   66,  104], [ 35, 101], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-6',                 [[[1161,  130,   74,  102], [ 41,  99], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],
      ['backwards-7',                 [[[1254,  131,   84,  101], [ 46,  98], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.BACKWARD]],

      ['jump-up-1',                   [[[ 125,  957,   58,  123], [ 26, 125], 27], [ -22, -106,   44,   52], [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-2',                   [[[ 213,  957,   58,   89], [ 21, 112], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-3',                   [[[ 293,  964,   59,   70], [ 24, 112], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-4',                   [[[ 125,  957,   58,  123], [ 26, 125], 27], [ -22, -106,   44,   52], HurtBox.Dhalsim.JUMP]],

      ['jump-roll-1',                 [[[ 728,  964,   57,  115], [ 21, 113]], [ -22, -106,   44,   52], HurtBox.Dhalsim.JUMP]],
      ['jump-roll-2',                 [[[ 816,  961,   67,   90], [ 25, 101]], PushBox.Dhalsim.JUMP, [[  16, -104,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-3',                 [[[ 911,  955,   60,   68], [ 19, 115]], PushBox.Dhalsim.JUMP, [[ -14,  -65,   24,   20], [ -13,  -92,   50,   32], [ -13, -108,   50,   20]]]],
      ['jump-roll-4',                 [[[ 992,  960,   95,   91], [ 30, 106]], PushBox.Dhalsim.JUMP, [[ -32,  -87,   22,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],

      ['jump-backward-1',             [[[ 816,  961,   67,   90], [ 25, 101], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],

      ['jump-land-1',                 [[[  31,  997,   64,   88], [ 26,  85], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['crouch-1',                    [[[  29, 1431,   64,   88], [ 26,  85], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['crouch-2',                    [[[ 123, 1443,   57,   76], [ 26,  73], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['crouch-3',                    [[[ 218, 1455,   60,   64], [ 23,  61], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],

      ['idle-turn-1',                 [[[ 594,   11,   62,   95], [ 26,  92]], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-turn-2',                 [[[ 673,   11,   66,   95], [ 38,  92]], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['idle-turn-3',                 [[[ 761,   11,   73,   95], [ 47,  92]], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['crouch-turn-1',               [[[ 352, 1448,   58,   71], [ 24,  68]], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-turn-2',               [[[ 431, 1448,   59,   71], [ 26,  68]], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-turn-3',               [[[ 514, 1452,   57,   67], [ 30,  64]], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],

      ['light-punch-1',               [[[  17,  268,   91,   87], [ 28,  84], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-punch-2',               [[[ 127,  271,   84,   84], [ 26,  81], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-punch-3',               [[[ 231,  274,  136,   81], [ 23,  78], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]], [  32,  -71,   82,   22]]],
      ['light-punch-4',               [[[ 127,  271,   84,   84], [ 26,  81], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-punch-5',               [[[ 127,  271,   84,   84], [ 26,  81], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],

      ['medium-punch-1',              [[[ 413,  255,   75,  100], [ 47,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['medium-punch-2',              [[[ 510,  277,   87,   78], [ 23,  75]], PushBox.Dhalsim.IDLE, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['medium-punch-3',              [[[ 617,  308,  151,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [  86,  -54,   52,   28]]],
      ['medium-punch-4',              [[[ 791,  308,  215,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  54,  -50,  110,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [ 139,  -54,   52,   28]]],
      ['medium-punch-5',              [[[ 617,  308,  151,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['medium-punch-6',              [[[ 510,  277,   87,   78], [ 23,  75]], PushBox.Dhalsim.IDLE, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['medium-punch-7',              [[[ 413,  255,   75,  100], [ 47,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['heavy-punch-1',               [[[ 413,  255,   75,  100], [ 47,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['heavy-punch-2',               [[[ 510,  277,   87,   78], [ 23,  75]], PushBox.Dhalsim.IDLE, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['heavy-punch-3',               [[[ 217,  438,  152,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [  84,  -54,   52,   28]]],
      ['heavy-punch-4',               [[[ 386,  438,  248,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  52,  -46,  124,   32], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [ 119,  -54,   82,   28]]],
      ['heavy-punch-5',               [[[ 217,  438,  152,   47], [ 23,  44]], PushBox.Dhalsim.IDLE, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['heavy-punch-6',               [[[ 510,  277,   87,   78], [ 23,  75]], PushBox.Dhalsim.IDLE, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['heavy-punch-7',               [[[ 510,  277,   87,   78], [ 23,  75]], PushBox.Dhalsim.IDLE, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],

      ['light-kick-1',                [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-kick-2',                [[[ 778,  374,  119,  110], [ 10, 108]], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-kick-3',                [[[ 917,  374,  166,  110], [ 10, 108]], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   72], [  24,  -91,  104,   32]], [  92,  -99,   70,   26]]],
      ['light-kick-4',                [[[ 778,  374,  119,  110], [ 10, 108]], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-kick-5',                [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  13,  -90,   78,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['light-kick-6',                [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],

      ['medium-kick-1',               [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['medium-kick-2',               [[[ 108,  528,  116,   96], [  3,  95]], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['medium-kick-3',               [[[ 243,  508,  178,  116], [  3, 115]], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   72], [  24,  -91,  104,   32]], [ 107, -106,   70,   26]]],
      ['medium-kick-4',               [[[ 108,  528,  116,   96], [  2,  93]], PushBox.Dhalsim.IDLE, [[  18,  -87,   78,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['medium-kick-5',               [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['medium-kick-6',               [[[ 692,  391,   59,   93], [ 15,  91], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],

      ['heavy-kick-1',                [[[ 487,  527,   74,   97], [ 18,  95], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-2',                [[[ 581,  517,   55,  107], [ -2, 105], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-3',                [[[ 667,  519,   52,  105], [-11, 103], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-4',                [[[ 749,  521,  104,  103], [-10, 101], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-5',                [[[ 876,  517,  185,  108], [-10, 106], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   72], [  24,  -91,  104,   32]], [ 120, -110,   72,   34]]],
      ['heavy-kick-6',                [[[ 749,  521,  104,  103], [-10, 101], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-7',                [[[1085,  533,   67,   92], [-10,  90], 29], PushBox.Dhalsim.IDLE, [[  23,  -87,   22,   20], [  -4,  -72,   50,   38], [  -4,  -48,   50,   50]]]],
      ['heavy-kick-8',                [[[  14,    6,   73,  100], [ 28,  97], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['crouch-light-punch-1',        [[[  20, 1558,   83,   75], [ 46,  72], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-light-punch-2',        [[[ 135, 1580,   84,   53], [ 23,  50], 29], PushBox.Dhalsim.CROUCH, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-light-punch-3',        [[[ 239, 1598,  135,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-light-punch-4',        [[[ 399, 1598,  199,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  52,  -29,   98,   30], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [ 117,  -27,   60,   24]]],

      ['crouch-light-punch-close-1',  [[[ 660, 1570,   67,   63], [ 23,  60], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-light-punch-close-2',  [[[ 750, 1571,  112,   62], [ 15,  59], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH, [  31,  -60,   66,   24]]],

      ['crouch-medium-punch-1',       [[[  20, 1558,   83,   75], [ 46,  72], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-medium-punch-2',       [[[ 135, 1580,   84,   53], [ 23,  50], 29], PushBox.Dhalsim.CROUCH, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-medium-punch-3',       [[[ 239, 1598,  135,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-medium-punch-4',       [[[ 399, 1598,  199,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  52,  -29,   98,   30], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [  91,  -27,   96,   24]]],

      ['crouch-medium-punch-close-1', [[[ 660, 1570,   67,   63], [ 23,  60], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-medium-punch-close-2', [[[ 750, 1571,  112,   62], [ 15,  59], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH, [  27,  -60,   82,   24]]],

      ['crouch-heavy-punch-1',        [[[  20, 1558,   83,   75], [ 46,  72], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-heavy-punch-2',        [[[ 135, 1580,   84,   53], [ 23,  50], 29], PushBox.Dhalsim.CROUCH, [[  44,  -65,   24,   20], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-heavy-punch-3',        [[[ 239, 1598,  135,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  50,  -54,   28,   22], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]]]],
      ['crouch-heavy-punch-4',        [[[ 399, 1598,  199,   35], [ 23,  32], 29], PushBox.Dhalsim.CROUCH, [[  52,  -29,   98,   30], [  12,  -45,   42,   46], [ -12,  -45,   30,   46]], [  74,  -49,  112,   50]]],

      ['crouch-light-kick-1',         [[[ 218, 1455,   60,   64], [ 23,  61], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-light-kick-2',         [[[ 925, 1570,   65,   63], [ 25,  60], 29], PushBox.Dhalsim.CROUCH, [[  -6, -100,   24,   22], [ -17,  -49,   46,   26], [   0,    0,    0,    0]]]],
      ['crouch-light-kick-3',         [[[1016, 1590,  150,   44], [ 72,  40], 29], PushBox.Dhalsim.CROUCH, [[ -55,  -39,   22,   22], [ -60,  -35,   60,   38], [  -1,  -35,   68,   38]], [ -14,  -28,   90,   26]]],
      ['crouch-light-kick-4',         [[[ 925, 1570,   65,   63], [ 25,  60], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],

      ['crouch-medium-kick-1',        [[[ 218, 1455,   60,   64], [ 23,  61], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-medium-kick-2',        [[[ 925, 1570,   65,   63], [ 25,  60], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-medium-kick-3',        [[[1016, 1590,  150,   44], [ 72,  40], 29], PushBox.Dhalsim.CROUCH, [[ -55,  -39,   22,   22], [ -60,  -35,   60,   38], [  -1,  -35,   68,   38]], [ -14,  -28,   90,   26]]],

      ['crouch-heavy-kick-1',         [[[ 218, 1455,   60,   64], [ 23,  61], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-heavy-kick-2',         [[[ 925, 1570,   65,   63], [ 25,  60], 29], PushBox.Dhalsim.CROUCH, HurtBox.Dhalsim.CROUCH]],
      ['crouch-heavy-kick-3',         [[[1016, 1590,  150,   44], [ 72,  40], 29], PushBox.Dhalsim.CROUCH, [[ -55,  -39,   22,   22], [ -60,  -35,   60,   38], [  -1,  -35,   68,   38]], [ -14,  -28,   90,   26], FighterAttackReaction.SWEEP]],

      ['jump-up-light-punch-1',       [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-light-punch-2',       [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-light-punch-3',       [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26]]],

      ['jump-up-medium-punch-1',      [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-medium-punch-2',      [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-medium-punch-3',      [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26]]],

      ['jump-up-heavy-punch-1',       [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-heavy-punch-2',       [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-heavy-punch-3',       [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26], FighterAttackReaction.JUMP]],

      ['jump-up-light-kick-1',        [[[ 507, 1131,   77,   91], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-light-kick-2',        [[[ 608, 1137,  134,   72], [ 28, 119], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-light-kick-3',        [[[ 766, 1137,  203,   83], [ 28, 119], 27], PushBox.Dhalsim.JUMP, [[  84,  -65,   66,   24], [  27,  -78,   66,   24], [ -17, -108,   46,   50]], [ 110,  -73,   66,   38]]],

      ['jump-up-medium-kick-1',       [[[ 507, 1131,   77,   91], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-medium-kick-2',       [[[ 608, 1137,  134,   72], [ 28, 119], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-up-medium-kick-3',       [[[ 766, 1137,  203,   83], [ 28, 119], 27], PushBox.Dhalsim.JUMP, [[  84,  -65,   66,   24], [  27,  -78,   66,   24], [ -17, -108,   46,   50]], [ 110,  -73,   66,   38]]],

      ['jump-up-heavy-kick-1',        [[[ 487,  527,   74,   97], [ 45, 111], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-heavy-kick-2',        [[[ 581,  517,   55,  107], [ 23, 121], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-heavy-kick-3',        [[[ 667,  519,   52,  105], [ 20, 119], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-heavy-kick-4',        [[[ 749,  521,  104,  103], [ 25, 118], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-heavy-kick-5',        [[[ 876,  517,  185,  108], [ 25, 123], 27], PushBox.Dhalsim.JUMP, [[  89, -111,   54,   24], [  25,  -98,   66,   24], [ -17, -108,   46,   50]], [  89, -121,   72,   46], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-kick-6',        [[[1085,  533,   67,   92], [ 27, 111], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-up-heavy-kick-7',        [[[ 125,  957,   58,  123], [ 26, 125], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],

      ['jump-roll-light-punch-1',     [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-light-punch-2',     [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-light-punch-3',     [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26]]],

      ['jump-roll-medium-punch-1',    [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-medium-punch-2',    [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-medium-punch-3',    [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26]]],

      ['jump-roll-heavy-punch-1',     [[[  32, 1133,   59,   89], [ 23, 116], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-heavy-punch-2',     [[[ 120, 1145,  112,   77], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-heavy-punch-3',     [[[ 267, 1145,  174,   86], [ 31, 117], 27], PushBox.Dhalsim.JUMP, [[  64,  -77,   48,   24], [  25,  -93,   48,   24], [ -17, -108,   46,   50]], [  92,  -58,   54,   26], FighterAttackReaction.JUMP]],

      ['jump-roll-light-kick-1',      [[[ 507, 1131,   77,   91], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-light-kick-2',      [[[ 608, 1137,  134,   72], [ 28, 119], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-light-kick-3',      [[[ 766, 1137,  203,   83], [ 28, 119], 27], PushBox.Dhalsim.JUMP, [[  84,  -65,   66,   24], [  27,  -78,   66,   24], [ -17, -108,   46,   50]], [ 110,  -73,   66,   38]]],

      ['jump-roll-medium-kick-1',     [[[ 507, 1131,   77,   91], [ 31, 117], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-medium-kick-2',     [[[ 608, 1137,  134,   72], [ 28, 119], 27], PushBox.Dhalsim.JUMP, HurtBox.Dhalsim.JUMP]],
      ['jump-roll-medium-kick-3',     [[[ 766, 1137,  203,   83], [ 28, 119], 27], PushBox.Dhalsim.JUMP, [[  84,  -65,   66,   24], [  27,  -78,   66,   24], [ -17, -108,   46,   50]], [ 110,  -73,   66,   38]]],

      ['jump-roll-heavy-kick-1',      [[[ 487,  527,   74,   97], [ 45, 111], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-heavy-kick-2',      [[[ 581,  517,   55,  107], [ 23, 121], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-heavy-kick-3',      [[[ 667,  519,   52,  105], [ 20, 119], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-heavy-kick-4',      [[[ 749,  521,  104,  103], [ 25, 118], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-heavy-kick-5',      [[[ 876,  517,  185,  108], [ 25, 123], 27], PushBox.Dhalsim.JUMP, [[  89, -111,   54,   24], [  25,  -98,   66,   24], [ -17, -108,   46,   50]], [  89, -121,   72,   46], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-kick-6',      [[[1085,  533,   67,   92], [ 27, 111], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],
      ['jump-roll-heavy-kick-7',      [[[ 125,  957,   58,  123], [ 26, 125], 27], PushBox.Dhalsim.JUMP, [[ -16, -120,   24,   20], [ -17, -108,   46,   32], [ -17,  -78,   46,   20]]]],

      ['block-stand-1',               [[[ 450, 2822,   56,   99], [ 28,  96], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['block-stand-2',               [[[ 534, 2826,   62,   95], [ 34,  92], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['block-stand-3',               [[[ 534, 2826,   62,   95], [ 34,  92], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['block-crouch-1',              [[[  37, 2856,   64,   67], [ 25,  64], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['block-crouch-2',              [[[ 116, 2855,   61,   68], [ 30,  65], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['block-crouch-3',              [[[ 116, 2855,   61,   68], [ 30,  65], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],

      ['hit-face-1',                  [[[ 393, 2579,   73,   95], [ 30,  92], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-face-2',                  [[[ 481, 2580,   70,   94], [ 31,  91], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-face-3',                  [[[ 578, 2576,   73,   97], [ 47,  94], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-face-4',                  [[[ 673, 2576,   87,   97], [ 63,  94], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['hit-stomach-1',               [[[  29, 2582,   68,   92], [ 29,  89], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-stomach-2',               [[[ 109, 2585,   81,   89], [ 42,  89], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-stomach-3',               [[[ 201, 2587,   72,   87], [ 44,  96], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['hit-stomach-4',               [[[ 289, 2594,   77,   80], [ 45,  95], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['hit-crouch-1',                [[[ 234, 2851,   59,   72], [ 25,  69], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['hit-crouch-2',                [[[ 234, 2851,   59,   72], [ 25,  69], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['hit-crouch-3',                [[[ 313, 2853,   62,   70], [ 31,  67], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['hit-crouch-4',                [[[ 234, 2851,   59,   72], [ 25,  69], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],
      ['hit-crouch-5',                [[[ 313, 2853,   62,   70], [ 31,  67], 29], PushBox.Dhalsim.BEND, HurtBox.Dhalsim.CROUCH]],

      ['stun-1',                      [[[ 821, 2835,   73,   86], [ 25,  83], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['stun-2',                      [[[ 737, 2831,   68,   90], [ 26,  87], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],
      ['stun-3',                      [[[ 652, 2827,   65,   94], [ 28,  91], 29], PushBox.Dhalsim.IDLE, HurtBox.Dhalsim.IDLE]],

      ['hurt-air-1',                  [[[ 922, 2591,  126,   53], [ 94,  63], 27], PushBox.Dhalsim.CROUCH]],

      ['sweep-fall-1',                [[[ 790, 2577,   95,   85], [ 46,  88], 27], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-2',                [[[1103, 2611,   97,   43], [ 62,  97], 27], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-3',                [[[1220, 2597,  100,   57], [ 60,  59], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['sweep-grounded-1',            [[[ 180, 2760,   97,   32], [ 54,  28], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['knockdown-1',                 [[[  29, 2582,   68,   92], [ 29,  89], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-2',                 [[[ 673, 2576,   87,   97], [ 63,  94], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-3',                 [[[ 922, 2591,  126,   53], [ 94,  63]], PushBox.Dhalsim.BEND, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['getup-1',                     [[[ 299, 2760,  132,   32], [104,  28], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-2',                     [[[ 458, 2744,  123,   47], [ 95,  44], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-3',                     [[[ 607, 2723,  117,   71], [ 89,  68], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-4',                     [[[ 748, 2692,   85,  101], [ 57,  99], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-5',                     [[[  14,    6,   73,  100], [ 28,  97], 29], PushBox.Dhalsim.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['ko-airborne-1',               [[[ 790, 2577,   95,   85], [ 47,  74]]]],
      ['ko-airborne-2',               [[[ 922, 2591,  126,   53], [ 63,  58]]]],

      ['ko-impact-1',                 [[[1103, 2611,   97,   43], [ 48,  39]]]],

      ['ko-bounce-1',                 [[[  35, 2733,  124,   61], [ 62,  57], 27]]],

      ['ko-grounded-1',               [[[ 299, 2760,  132,   32], [ 66,  28], 29]]],

      ['winner-pose-1',               [[[  18, 2946,  102,  108], [ 51, 106], 29]]],
      ['winner-pose-2',               [[[ 139, 2948,  103,  106], [ 51, 104], 29]]],
      ['winner-pose-3',               [[[ 268, 2948,  103,  106], [ 51, 104], 29]]],
      ['winner-pose-4',               [[[ 401, 2962,  121,   92], [ 56,  90], 29]]],
      ['winner-pose-5',               [[[ 545, 2962,  121,   92], [ 56,  90], 29]]],
      ['winner-pose-6',               [[[ 689, 2971,  133,   83], [ 67,  81], 29]]],
      ['winner-pose-7',               [[[ 838, 2971,  133,   83], [ 66,  81], 29]]],
      ['winner-pose-8',               [[[  14,    6,   73,  100], [ 28,  97], 29]]],
      ['winner-pose-9',               [[[ 452, 3114,   64,   88], [ 26,  85], 29]]],
      ['winner-pose-10',              [[[ 534, 3074,   58,  123], [ 26, 125], 27]]],
      ['winner-pose-11',              [[[ 612, 3087,   58,   89], [ 21, 112], 27]]],
      ['winner-pose-12',              [[[ 686, 3087,   59,   70], [ 24, 112], 27]]],
      ['winner-pose-13',              [[[ 762, 3085,   74,   75], [ 25, 114], 27]]],

      ['loser-pose-1',                [[[ 652, 2827,   65,   94], [ 28,  91], 29]]],
      ['loser-pose-2',                [[[ 737, 2831,   68,   90], [ 26,  87], 29]]],
      ['loser-pose-3',                [[[ 821, 2835,   73,   86], [ 25,  83], 29]]],
    ]);

    // prettier-ignore
    this.animations = {
      [FighterState.IDLE]: [
        ['idle-1',  8], ['idle-2',  8], ['idle-3',  8],
        ['idle-4',  8], ['idle-5',  8], ['idle-6',  8],
      ],

      [FighterState.WALK_FORWARD]: [
        ['forwards-2',  4], ['forwards-1',  4], ['forwards-2',  4],
        ['forwards-3',  4], ['forwards-4',  4], ['forwards-5',  4],
        ['forwards-6',  4], ['forwards-7',  4], ['forwards-6',  4],
        ['forwards-5',  4], ['forwards-4',  4], ['forwards-3',  4],
      ],

      [FighterState.WALK_BACKWARD]: [
        ['backwards-2',  4], ['backwards-1',  4], ['backwards-2',  4],
        ['backwards-3',  4], ['backwards-4',  4], ['backwards-5',  4],
        ['backwards-6',  4], ['backwards-7',  4], ['backwards-6',  4],
        ['backwards-5',  4], ['backwards-4',  4], ['backwards-3',  4],
      ],

      [FighterState.JUMP_START]: [
        ['crouch-1',  2],
        ['crouch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP]: [
        ['jump-up-1', 15], ['jump-up-2',  8], ['jump-up-3',  8],
        ['jump-up-2', 15],
        ['jump-up-4', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_FORWARD]: [
        ['jump-roll-1', 15], ['jump-roll-2',  8], ['jump-roll-3',  8],
        ['jump-roll-4',  8],
        ['jump-roll-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_BACKWARD]: [
        ['jump-roll-1',     15], ['jump-roll-4',      8], ['jump-roll-3',      8],
        ['jump-backward-1',  8],
        ['jump-roll-1',     FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_LAND]: [
        ['crouch-1',  2], ['crouch-1',  5],
        ['crouch-1', FrameDelay.TRANSITION],
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
        ['idle-turn-3',  3], ['idle-turn-2',  3], ['idle-turn-1',  3],
        ['idle-1',      FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_TURN]: [
        ['crouch-turn-3',  3], ['crouch-turn-2',  3], ['crouch-turn-1',  3],
        ['crouch-1',      FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_PUNCH]: [
        ['light-punch-1',  3], ['light-punch-2',  3], ['light-punch-3',  6],
        ['light-punch-4',  4],
        ['light-punch-5', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_PUNCH]: [
        ['medium-punch-1',  4], ['medium-punch-2',  4], ['medium-punch-3',  4],
        ['medium-punch-4',  6], ['medium-punch-5',  4], ['medium-punch-6',  4],
        ['medium-punch-7', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_PUNCH]: [
        ['heavy-punch-1',  4], ['heavy-punch-2',  4], ['heavy-punch-3',  4],
        ['heavy-punch-4',  6], ['heavy-punch-5', 10], ['heavy-punch-6',  8],
        ['heavy-punch-7', FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_KICK]: [
        ['light-kick-1',  3], ['light-kick-2',  3], ['light-kick-3',  8],
        ['light-kick-4',  4], ['light-kick-5',  4],
        ['light-kick-6', FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_KICK]: [
        ['medium-kick-1',  3], ['medium-kick-2',  3], ['medium-kick-3',  8],
        ['medium-kick-4',  4], ['medium-kick-5',  5],
        ['medium-kick-6', FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_KICK]: [
        ['heavy-kick-1',  2], ['heavy-kick-2',  2], ['heavy-kick-3',  3],
        ['heavy-kick-4',  4], ['heavy-kick-5',  6], ['heavy-kick-6', 10],
        ['heavy-kick-7',  8],
        ['heavy-kick-8', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_PUNCH]: [
        ['crouch-light-punch-1',  3], ['crouch-light-punch-2',  3], ['crouch-light-punch-3',  3],
        ['crouch-light-punch-4',  6], ['crouch-light-punch-3',  4], ['crouch-light-punch-2',  4],
        ['crouch-light-punch-2', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [
        ['crouch-medium-punch-1',  3], ['crouch-medium-punch-2',  3], ['crouch-medium-punch-3',  3],
        ['crouch-medium-punch-4',  6], ['crouch-medium-punch-3',  4], ['crouch-medium-punch-2',  4],
        ['crouch-medium-punch-2', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_PUNCH]: [
        ['crouch-heavy-punch-1',  4], ['crouch-heavy-punch-2',  4], ['crouch-heavy-punch-3',  4],
        ['crouch-heavy-punch-4',  6], ['crouch-heavy-punch-3', 10], ['crouch-heavy-punch-2',  8],
        ['crouch-heavy-punch-2', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_KICK]: [
        ['crouch-light-kick-1',  4], ['crouch-light-kick-2',  4], ['crouch-light-kick-3', 14],
        ['crouch-light-kick-4',  4],
        ['crouch-light-kick-4', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_KICK]: [
        ['crouch-medium-kick-1',  4], ['crouch-medium-kick-2',  4], ['crouch-medium-kick-3', 16],
        ['crouch-medium-kick-2',  4],
        ['crouch-medium-kick-2', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_KICK]: [
        ['crouch-heavy-kick-1',  4], ['crouch-heavy-kick-2',  4], ['crouch-heavy-kick-3', 18],
        ['crouch-heavy-kick-2', 20],
        ['crouch-heavy-kick-2', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP_LIGHT_PUNCH]: [
        ['jump-up-light-punch-1',  4], ['jump-up-light-punch-2',  4], ['jump-up-light-punch-3',  4],
        ['jump-up-light-punch-2',  4],
        ['jump-up-light-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_PUNCH]: [
        ['jump-up-medium-punch-1',  4], ['jump-up-medium-punch-2',  4], ['jump-up-medium-punch-3',  4],
        ['jump-up-medium-punch-2',  4],
        ['jump-up-medium-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_PUNCH]: [
        ['jump-up-heavy-punch-1',  4], ['jump-up-heavy-punch-2',  4], ['jump-up-heavy-punch-3',  4],
        ['jump-up-heavy-punch-2',  4],
        ['jump-up-heavy-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: [
        ['jump-roll-light-punch-1',  4], ['jump-roll-light-punch-2',  4], ['jump-roll-light-punch-3',  4],
        ['jump-roll-light-punch-2',  4],
        ['jump-roll-light-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: [
        ['jump-roll-medium-punch-1',  4], ['jump-roll-medium-punch-2',  4], ['jump-roll-medium-punch-3',  4],
        ['jump-roll-medium-punch-2',  4],
        ['jump-roll-medium-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: [
        ['jump-roll-heavy-punch-1',  4], ['jump-roll-heavy-punch-2',  4], ['jump-roll-heavy-punch-3',  4],
        ['jump-roll-heavy-punch-2',  4],
        ['jump-roll-heavy-punch-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_LIGHT_KICK]: [
        ['jump-up-light-kick-1',  5], ['jump-up-light-kick-2',  6], ['jump-up-light-kick-3',  6],
        ['jump-up-light-kick-2',  4],
        ['jump-up-light-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_MEDIUM_KICK]: [
        ['jump-up-medium-kick-1',  5], ['jump-up-medium-kick-2',  6], ['jump-up-medium-kick-3',  6],
        ['jump-up-medium-kick-2',  4],
        ['jump-up-medium-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_UP_HEAVY_KICK]: [
        ['jump-up-heavy-kick-1',  2], ['jump-up-heavy-kick-2',  2], ['jump-up-heavy-kick-3',  3],
        ['jump-up-heavy-kick-4',  4], ['jump-up-heavy-kick-5',  6], ['jump-up-heavy-kick-4',  4],
        ['jump-up-heavy-kick-6',  3],
        ['jump-up-heavy-kick-7', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: [
        ['jump-roll-light-kick-1',  5], ['jump-roll-light-kick-2',  6], ['jump-roll-light-kick-3',  6],
        ['jump-roll-light-kick-2',  4],
        ['jump-roll-light-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: [
        ['jump-roll-medium-kick-1',  5], ['jump-roll-medium-kick-2',  6], ['jump-roll-medium-kick-3',  6],
        ['jump-roll-medium-kick-2',  4],
        ['jump-roll-medium-kick-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: [
        ['jump-roll-heavy-kick-1',  2], ['jump-roll-heavy-kick-2',  2], ['jump-roll-heavy-kick-3',  3],
        ['jump-roll-heavy-kick-4',  4], ['jump-roll-heavy-kick-5',  6], ['jump-roll-heavy-kick-4',  4],
        ['jump-roll-heavy-kick-6',  3],
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
        ['sweep-fall-1',  8], ['sweep-fall-2',  8],
        ['sweep-fall-3', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_GROUNDED]: [
        ['sweep-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.GETUP]: [
        ['getup-1',  7], ['getup-2',  6], ['getup-3',  5],
        ['getup-4',  4],
        ['getup-5', FrameDelay.TRANSITION],
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
        ['hit-face-3', FIGHTER_HURT_DELAY], ['hit-face-3',  7], ['hit-face-4',  4],
        ['stun-3',      9],
        ['stun-3',     FrameDelay.TRANSITION],
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
        ['hit-stomach-2', FIGHTER_HURT_DELAY], ['hit-stomach-2',  3], ['hit-stomach-3',  4],
        ['hit-stomach-4',  4], ['stun-3',         9],
        ['stun-3',        FrameDelay.TRANSITION],
      ],

      [FighterState.HURT_AIR]: [
        ['hurt-air-1', FrameDelay.FREEZE],
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
        ['winner-pose-1',  8], ['winner-pose-2',  8], ['winner-pose-3',  8],
        ['winner-pose-4',  8], ['winner-pose-5',  8], ['winner-pose-6',  7],
        ['winner-pose-6',  1], ['winner-pose-7',  8], ['winner-pose-4',  8],
        ['winner-pose-5',  8], ['winner-pose-2',  8], ['winner-pose-3',  8],
        ['winner-pose-3', FrameDelay.TRANSITION],
      ],

      [FighterState.LOSER_POSE]: [
        ['loser-pose-1', 12], ['loser-pose-2', 12],
        ['loser-pose-3', FrameDelay.FREEZE],
      ],
    };

    this.crouchAttackAnimations = {
      [FighterState.CROUCH_LIGHT_PUNCH]: [47, this.animations[FighterState.CROUCH_LIGHT_PUNCH], [
        ['crouch-light-punch-close-1',  4], ['crouch-light-punch-close-2',  6], ['crouch-light-punch-close-1',  4],
        ['crouch-light-punch-close-1', FrameDelay.TRANSITION],
      ]],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [47, this.animations[FighterState.CROUCH_MEDIUM_PUNCH], [
        ['crouch-medium-punch-close-1',  8], ['crouch-medium-punch-close-2',  8], ['crouch-medium-punch-close-1',  6],
        ['crouch-medium-punch-close-1', FrameDelay.TRANSITION],
      ]],
    };

    this.knockdownAnimation = [
      ['knockdown-1',  4], ['knockdown-2',  4],
      ['knockdown-3', FrameDelay.FREEZE],
    ];

    this.winnerAnimations = [
      this.animations[FighterState.WINNER_POSE],
      [
        ['winner-pose-8',   8], ['winner-pose-9',   8], ['winner-pose-10',  8],
        ['winner-pose-11',  8], ['winner-pose-12',  8],
        ['winner-pose-13', FrameDelay.FREEZE],
      ],
    ];

    this.winnerFloatSteps = [
      0, 49, 97, 142, 180, 212, 236, 250, 256, 250, 236, 212, 180, 142, 97, 49,
      0, -49, -97, -142, -180, -212, -236, -250, -256, -250, -236, -212, -180, -142, -97, -49,
    ];

    // prettier-ignore
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]:   120,
        [FighterState.WALK_BACKWARD]:  -82.5,
        [FighterState.JUMP_FORWARD]:   135,
        [FighterState.JUMP_BACKWARD]: -142.5,
      },
      jump: {
        [FighterState.JUMP_UP]:       -360,
        [FighterState.JUMP_FORWARD]:  -360,
        [FighterState.JUMP_BACKWARD]: -367.5,
      },
    };

    this.gravity          = 675;
    this.jumpAcceleration =  70.3125;
  }

  handleCrouchAttackInit(time) {
    super.handleCrouchAttackInit(time);
    this.crouchSlideStarted = false;
  }

  handleCrouchAttackState(time) {
    if ([
      FighterState.CROUCH_LIGHT_KICK,
      FighterState.CROUCH_MEDIUM_KICK,
      FighterState.CROUCH_HEAVY_KICK,
    ].includes(this.currentState)) {
      if (this.animationFrame === 2 && !this.crouchSlideStarted) {
        this.velocity.x = {
          [FighterAttackStrength.LIGHT]:  600,
          [FighterAttackStrength.MEDIUM]: 720,
          [FighterAttackStrength.HEAVY]:  840,
        }[this.states[this.currentState].attackStrength];
        this.crouchSlideStarted = true;
      } else if (this.crouchSlideStarted) {
        this.velocity.x = Math.max(0, this.velocity.x - 3600 * time.secondsPassed);
      }

      if (this.isAnimationCompleted()) this.changeState(FighterState.CROUCH, time);
      return;
    }

    super.handleCrouchAttackState(time);
  }

  handleWinnerPoseInit(time) {
    super.handleWinnerPoseInit(time);
    this.winnerFloatFrame = 0;
    this.previousWinnerFrame = -1;
  }

  handleWinnerPoseState(time) {
    super.handleWinnerPoseState(time);
    if (this.winnerPose === 0) {
      if (this.animationFrame === 8 && this.previousWinnerFrame !== 8) this.direction *= -1;
      this.previousWinnerFrame = this.animationFrame;
    } else if (this.animationFrame === 5) {
      this.position.y -= this.winnerFloatSteps[this.winnerFloatFrame] / 256;
      this.winnerFloatFrame = (this.winnerFloatFrame + 1) % this.winnerFloatSteps.length;
    }
  }
}
