import { FIGHTER_HURT_DELAY, FighterAttackReaction, FighterState, FrameDelay, HurtBox, PushBox } from "../../constants/fighter.js";
import { Fighter } from "./Fighter.js";

export class Blanka extends Fighter {
  constructor(playerId, onAttackHit) {
    super(playerId, onAttackHit);
    this.image = document.querySelector("img[alt='blanka']");

    // prettier-ignore
    this.frames = new Map([
      ['idle-1',                      [[[   9,   13,   97,   95], [ 36,  91], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['idle-2',                      [[[ 115,   12,   96,   96], [ 36,  92], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['idle-3',                      [[[ 218,   10,   95,   98], [ 36,  94], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['forwards-1',                  [[[ 335,   31,   82,   72], [ 27,  73], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-2',                  [[[ 439,   34,   79,   68], [ 21,  70], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-3',                  [[[ 542,   30,   77,   77], [ 18,  74], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-4',                  [[[ 639,   25,   86,   82], [ 25,  79], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-5',                  [[[ 751,   30,   77,   77], [ 18,  74], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-6',                  [[[ 852,   34,   79,   73], [ 21,  70], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-7',                  [[[ 945,   31,   85,   76], [ 30,  73], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],
      ['forwards-8',                  [[[1033,   26,   99,   77], [ 41,  78], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.FORWARD]],

      ['backwards-1',                 [[[   5,  124,   96,   90], [ 41,  91], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-2',                 [[[ 118,  128,   78,   90], [ 30,  87], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-3',                 [[[ 215,  132,   78,   86], [ 24,  83], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-4',                 [[[ 314,  125,   79,   93], [ 24,  90], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-5',                 [[[ 413,  124,   84,   94], [ 25,  91], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-6',                 [[[ 518,  125,   79,   93], [ 24,  90], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-7',                 [[[ 620,  132,   78,   81], [ 24,  83], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],
      ['backwards-8',                 [[[ 717,  128,   75,   86], [ 27,  87], 14], PushBox.Blanka.JUMP, HurtBox.Blanka.BACKWARD]],

      ['jump-start-1',                [[[1580,  147,   86,   72], [ 36,  68], 13], PushBox.Blanka.CROUCH, [[  31,  -68,   28,   24], [ -25,  -52,   54,   30], [ -25,  -25,   54,   26]]]],

      ['jump-up-1',                   [[[  19,  245,   71,  121], [ 24, 117], 13], PushBox.Blanka.IDLE, HurtBox.Blanka.JUMP]],
      ['jump-up-2',                   [[[ 105,  251,   70,   99], [ 23, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-3',                   [[[ 186,  260,   70,   85], [ 23, 101], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-4',                   [[[ 262,  264,   73,   74], [ 25,  98], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-forward-1',              [[[  19,  245,   71,  121], [ 24, 117], 13], PushBox.Blanka.IDLE, HurtBox.Blanka.JUMP]],
      ['jump-forward-2',              [[[ 105,  251,   70,   99], [ 23, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-forward-3',              [[[ 346,  267,   75,   75], [ 23,  98], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-forward-4',              [[[ 423,  256,   93,   87], [ 31, 107], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-forward-5',              [[[ 521,  238,  115,  107], [ 42, 124], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-backward-1',             [[[  19,  245,   71,  121], [ 24, 117], 13], PushBox.Blanka.IDLE, HurtBox.Blanka.JUMP]],
      ['jump-backward-2',             [[[ 105,  251,   70,   99], [ 23, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-backward-3',             [[[ 346,  267,   75,   75], [ 23,  98], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-backward-4',             [[[ 423,  256,   93,   87], [ 31, 107], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-backward-5',             [[[ 521,  238,  115,  107], [ 42, 124], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-land-1',                 [[[1478,  132,   93,   87], [ 36,  83], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['crouch-1',                    [[[1478,  132,   93,   87], [ 36,  83], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['crouch-2',                    [[[1580,  147,   86,   72], [ 36,  68], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-3',                    [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['idle-turn-1',                 [[[1033,  267,   78,   98], [ 38,  94]], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['idle-turn-2',                 [[[1118,  266,   87,   99], [ 52,  95]], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['idle-turn-3',                 [[[1217,  270,   84,   95], [ 58,  91]], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['crouch-turn-1',               [[[1338,  302,   75,   61], [ 32,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-turn-2',               [[[1420,  302,   90,   59], [ 47,  59]], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-turn-3',               [[[1517,  302,   75,   61], [ 43,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['light-punch-1',               [[[  11,  436,   97,   94], [ 34,  90], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['light-punch-2',               [[[ 121,  433,  135,   97], [ 33,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE, [  16,  -85,   80,   24]]],
      ['light-punch-3',               [[[ 268,  433,  109,   97], [ 32,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['light-punch-4',               [[[ 121,  433,  135,   97], [ 33,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['medium-punch-1',              [[[ 401,  399,   87,  131], [ 30, 127], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['medium-punch-2',              [[[ 500,  422,  120,  108], [ 31, 104], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE, [  17, -104,   86,   32]]],
      ['medium-punch-3',              [[[ 633,  433,  130,   97], [ 30,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['medium-punch-4',              [[[ 779,  437,  103,   93], [ 30,  89], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['heavy-punch-1',               [[[ 900,  436,  108,   94], [ 33,  90], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['heavy-punch-2',               [[[1025,  433,  128,   97], [ 30,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE, [  17,  -88,   86,   20]]],
      ['heavy-punch-3',               [[[1168,  412,   99,  118], [ 31, 114], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE, [  27, -114,   60,   38]]],
      ['heavy-punch-4',               [[[1025,  433,  128,   97], [ 30,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['light-kick-1',                [[[  10,  730,   81,   97], [ 36,  93], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['light-kick-2',                [[[ 105,  732,   97,   95], [ 34,  91], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['light-kick-3',                [[[ 219,  733,  137,   94], [ 33,  90], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE, [  47,  -76,   56,   32]]],

      ['medium-kick-1',               [[[ 366,  734,   92,   85], [ 34,  89], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['medium-kick-2',               [[[ 486,  733,  102,   85], [ 27,  90], 14], PushBox.Blanka.IDLE, [[  25,  -88,   28,   24], [   0,  -78,   38,   40], [   9,  -42,   32,   40]]]],
      ['medium-kick-3',               [[[ 621,  734,  125,   85], [ 17,  89], 14], PushBox.Blanka.IDLE, [[  25,  -88,   28,   24], [   0,  -78,   38,   40], [   9,  -42,   32,   40]], [  37,  -90,   78,   16]]],

      ['heavy-kick-1',                [[[ 777,  725,   91,   60], [ 15,  98], 14], PushBox.Blanka.IDLE, [[  -5,  -93,   28,   24], [  -8,  -76,   42,   30], [  34,  -85,   16,   38]]]],
      ['heavy-kick-2',                [[[ 882,  722,  163,   53], [ 50, 101], 14], PushBox.Blanka.IDLE, [[ -36,  -82,   28,   24], [ -23, -100,   50,   28], [  23,  -97,   32,   28]], [  27,  -89,   84,   20]]],
      ['heavy-kick-3',                [[[1056,  718,  122,  100], [ 35, 105]], PushBox.Blanka.IDLE, [[ -15,  -63,   28,   24], [ -33,  -92,   34,   34], [  -4, -105,   40,   26]], [   6, -109,   74,   38]]],
      ['heavy-kick-4',                [[[1192,  700,   88,  128], [ 43, 123]], PushBox.Blanka.IDLE, [[ -11,  -59,   28,   24], [ -40,  -69,   28,   34], [ -44,  -94,   26,   30]]]],
      ['heavy-kick-5',                [[[1300,  729,  138,   99], [ 94,  94]], PushBox.Blanka.IDLE, [[ -11,  -59,   28,   24], [ -40,  -69,   28,   34], [ -54,  -83,   32,   26]]]],
      ['heavy-kick-6',                [[[1448,  751,  103,   70], [ 59,  72]], PushBox.Blanka.IDLE, [[  18,  -58,   28,   24], [  -9,  -72,   32,   40], [ -36,  -59,   24,   34]]]],

      ['crouch-light-punch-1',        [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-light-punch-2',        [[[ 539,  914,  110,   57], [ 30,  54], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-light-punch-3',        [[[ 669,  921,  155,   51], [ 29,  47], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]]]],
      ['crouch-light-punch-4',        [[[ 842,  920,  143,   53], [ 27,  48], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]], [  27,  -29,   98,   24]]],

      ['crouch-medium-punch-1',       [[[ 992,  907,   83,   64], [ 45,  61], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-medium-punch-2',       [[[1104,  909,  140,   63], [ 23,  59], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]]]],
      ['crouch-medium-punch-3',       [[[1269,  901,  147,   70], [ 22,  67], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]], [  29,  -51,   96,   24]]],
      ['crouch-medium-punch-4',       [[[1442,  900,  140,   71], [ 21,  68], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]]]],
      ['crouch-medium-punch-5',       [[[1269,  901,  147,   70], [ 22,  67], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]]]],
      ['crouch-medium-punch-6',       [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['crouch-heavy-punch-1',        [[[  16, 1025,   84,   58], [ 28,  55], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-heavy-punch-2',        [[[ 121, 1028,   96,   55], [ 23,  52], 14], PushBox.Blanka.CROUCH, [[  28,  -43,   68,   36], [ -25,  -52,   54,   30], [ -25,  -25,   54,   26]]]],
      ['crouch-heavy-punch-3',        [[[ 245, 1000,  167,   84], [ 23,  80], 14], PushBox.Blanka.CROUCH, [[  27,  -61,  100,   48], [  10,  -46,   40,   28], [ -25,  -25,   54,   26]], [  44,  -62,   98,   24]]],
      ['crouch-heavy-punch-4',        [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['crouch-light-kick-1',         [[[ 426, 1015,   75,   78], [ 33,  65], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-light-kick-2',         [[[ 522, 1013,   75,   79], [ 29,  67], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-light-kick-3',         [[[ 616, 1009,  139,   68], [ 36,  71], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND, [  13,  -26,   78,   24]]],
      ['crouch-light-kick-4',         [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['crouch-medium-kick-1',        [[[ 426, 1015,   75,   78], [ 33,  65], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-medium-kick-2',        [[[ 522, 1013,   75,   79], [ 29,  67], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-medium-kick-3',        [[[ 616, 1009,  139,   68], [ 36,  71], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND, [  15,  -26,   98,   24]]],
      ['crouch-medium-kick-4',        [[[1678,  156,   85,   63], [ 36,  59], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['crouch-heavy-kick-1',         [[[1580,  147,   86,   72], [ 36,  68], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['crouch-heavy-kick-2',         [[[ 779,  998,   72,   81], [ 27,  82], 14], PushBox.Blanka.IDLE, [[ -16,  -77,   28,   24], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]]]],
      ['crouch-heavy-kick-3',         [[[ 880, 1004,   91,   76], [ 26,  76], 14], PushBox.Blanka.IDLE, [[ -16,  -77,   28,   24], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]]]],
      ['crouch-heavy-kick-4',         [[[ 985, 1010,  161,   69], [ 36,  70], 14], PushBox.Blanka.IDLE, [[ -16,  -77,   28,   24], [ -24,  -72,   54,   40], [ -24,  -35,   54,   36]], [  25,  -24,  102,   24], FighterAttackReaction.SWEEP]],

      ['jump-up-light-punch-1',       [[[   6, 1137,   94,   83], [ 37, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-light-punch-2',       [[[ 106, 1138,   84,   81], [ 38, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-light-punch-3',       [[[ 200, 1139,  119,   80], [ 39, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  14,  -77,   72,   30], FighterAttackReaction.JUMP]],

      ['jump-up-medium-punch-1',      [[[   6, 1137,   94,   83], [ 37, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-medium-punch-2',      [[[ 106, 1138,   84,   81], [ 38, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-medium-punch-3',      [[[ 200, 1139,  119,   80], [ 39, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [   8,  -86,   84,   48], FighterAttackReaction.JUMP]],

      ['jump-up-heavy-punch-1',       [[[ 328, 1136,  136,   84], [ 37, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  21,  -95,   90,   32], FighterAttackReaction.JUMP]],
      ['jump-up-heavy-punch-2',       [[[ 478, 1137,   78,   80], [ 26, 109], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-heavy-punch-3',       [[[ 565, 1133,   65,   82], [ 24, 111], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-heavy-punch-4',       [[[ 328, 1136,  136,   84], [ 37, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-heavy-punch-5',       [[[ 105,  251,   70,   99], [ 23, 110], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-up-light-kick-1',        [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-light-kick-2',        [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-light-kick-3',        [[[1251, 1135,  127,   85], [ 43, 111], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  24,  -71,   70,   40], FighterAttackReaction.JUMP]],

      ['jump-up-medium-kick-1',       [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]]]],
      ['jump-up-medium-kick-2',       [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]]]],
      ['jump-up-medium-kick-3',       [[[1251, 1135,  127,   85], [ 43, 111], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]], [  16,  -61,   86,   32], FighterAttackReaction.JUMP]],
      ['jump-up-medium-kick-4',       [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-medium-kick-5',       [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-up-heavy-kick-1',        [[[1385, 1142,   96,   79], [ 34, 108], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-heavy-kick-2',        [[[1482, 1131,  136,   87], [ 63, 112], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-up-heavy-kick-3',        [[[1623, 1125,  170,   88], [ 69, 112], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  21,  -69,   92,   40], FighterAttackReaction.JUMP]],

      ['jump-roll-light-punch-1',     [[[   6, 1137,   94,   83], [ 37, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-light-punch-2',     [[[ 106, 1138,   84,   81], [ 38, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-light-punch-3',     [[[ 200, 1139,  119,   80], [ 39, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  14,  -77,   72,   30], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-punch-1',    [[[   6, 1137,   94,   83], [ 37, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-medium-punch-2',    [[[ 106, 1138,   84,   81], [ 38, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-medium-punch-3',    [[[ 200, 1139,  119,   80], [ 39, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [   8,  -86,   84,   48], FighterAttackReaction.JUMP]],

      ['jump-roll-heavy-punch-1',     [[[ 637, 1110,   85,  117], [ 27, 137], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-heavy-punch-2',     [[[ 734, 1140,  126,   80], [ 26, 105], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-heavy-punch-3',     [[[ 867, 1140,   98,   85], [ 25, 105], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  17,  -70,   64,   52], FighterAttackReaction.JUMP]],
      ['jump-roll-heavy-punch-4',     [[[ 976, 1144,   72,   89], [ 26, 103], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-roll-light-kick-1',      [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-light-kick-2',      [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-light-kick-3',      [[[1251, 1135,  127,   85], [ 43, 111], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  22,  -62,   54,   32], FighterAttackReaction.JUMP]],

      ['jump-roll-medium-kick-1',     [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]]]],
      ['jump-roll-medium-kick-2',     [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]]]],
      ['jump-roll-medium-kick-3',     [[[1251, 1135,  127,   85], [ 43, 111], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [ -20, -102,   48,   36], [ -20,  -68,   48,   26]], [  22,  -69,   68,   40], FighterAttackReaction.JUMP]],
      ['jump-roll-medium-kick-4',     [[[1142, 1138,  102,   86], [ 45, 106], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-medium-kick-5',     [[[1059, 1144,   80,   79], [ 28, 101], 13], PushBox.Blanka.JUMP, [[  10,  -97,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],

      ['jump-roll-heavy-kick-1',      [[[1385, 1142,   96,   79], [ 34, 108], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-heavy-kick-2',      [[[1482, 1131,  136,   87], [ 63, 112], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]]]],
      ['jump-roll-heavy-kick-3',      [[[1623, 1125,  170,   88], [ 69, 112], 13], PushBox.Blanka.JUMP, [[  -8, -106,   28,   24], [ -19,  -93,   46,   26], [ -19,  -68,   46,   20]], [  27,  -61,   62,   32], FighterAttackReaction.JUMP]],

      ['block-stand-1',               [[[ 645,  277,   88,   89], [ 35,  85], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['block-stand-2',               [[[ 737,  278,   80,   87], [ 43,  84], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['block-stand-3',               [[[ 737,  278,   80,   87], [ 43,  84], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['block-crouch-1',              [[[ 837,  313,   87,   53], [ 34,  49], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['block-crouch-2',              [[[ 936,  312,   81,   53], [ 35,  49], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],
      ['block-crouch-3',              [[[ 936,  312,   81,   53], [ 35,  49], 14], PushBox.Blanka.CROUCH, HurtBox.Blanka.BEND]],

      ['hit-face-1',                  [[[   3, 1615,   88,  101], [ 53,  96], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-face-2',                  [[[ 100, 1618,  101,   98], [ 71,  94], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-face-3',                  [[[ 216, 1630,  120,   86], [ 89,  82], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-face-4',                  [[[ 354, 1630,   85,   86], [ 44,  82], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['hit-stomach-1',               [[[ 448, 1631,   96,   85], [ 40,  81], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-stomach-2',               [[[ 549, 1637,  100,   79], [ 48,  75], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-stomach-3',               [[[ 655, 1644,  106,   72], [ 58,  68], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['hit-stomach-4',               [[[ 767, 1625,   96,   90], [ 38,  86]], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['hit-crouch-1',                [[[ 869, 1623,   84,   93], [ 39,  89], 14], PushBox.Blanka.CROUCH, [[ -27,  -88,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],
      ['hit-crouch-2',                [[[ 869, 1623,   84,   93], [ 39,  89], 14], PushBox.Blanka.CROUCH, [[ -27,  -88,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],
      ['hit-crouch-3',                [[[ 958, 1626,  101,   90], [ 59,  86], 14], PushBox.Blanka.CROUCH, [[ -52,  -84,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],
      ['hit-crouch-4',                [[[ 869, 1623,   84,   93], [ 39,  89], 14], PushBox.Blanka.CROUCH, [[ -27,  -88,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],
      ['hit-crouch-5',                [[[ 958, 1626,  101,   90], [ 59,  86], 14], PushBox.Blanka.CROUCH, [[ -52,  -84,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],
      ['hit-crouch-6',                [[[1067, 1638,  109,   78], [ 68,  74], 14], PushBox.Blanka.CROUCH, [[ -65,  -70,   28,   24], [ -33,  -66,   36,   32], [ -25,  -25,   54,   26]]]],

      ['stun-1',                      [[[1110, 1486,   72,  106], [ 43, 102], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['stun-2',                      [[[1198, 1483,   78,  107], [ 43, 105], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['stun-3',                      [[[1293, 1481,   84,  104], [ 40, 100]], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['stun-4',                      [[[1393, 1483,   78,  107], [ 35, 105], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],
      ['stun-5',                      [[[1497, 1486,   72,  106], [ 29, 102], 14], PushBox.Blanka.IDLE, HurtBox.Blanka.IDLE]],

      ['hurt-air-1',                  [[[ 448, 1631,   96,   85], [ 40,  81], 13], PushBox.Blanka.IDLE]],
      ['hurt-air-2',                  [[[   5, 1765,  144,   62], [ 76,  83], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-3',                  [[[ 531, 1265,   76,   59], [ 34,  91], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-4',                  [[[ 448, 1260,   67,   68], [ 31,  96], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-5',                  [[[1075, 1271,   82,   56], [ 40,  85], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-6',                  [[[ 976, 1273,   88,   55], [ 41,  83], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-7',                  [[[ 891, 1268,   76,   59], [ 32,  88], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-8',                  [[[ 810, 1265,   67,   68], [ 25,  91], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-9',                  [[[ 711, 1265,   82,   56], [ 33,  91], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-10',                 [[[ 615, 1269,   88,   55], [ 39,  91], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-11',                 [[[ 354, 1759,  127,   68], [ 59,  93], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-12',                 [[[1056,  718,  122,  100], [ 35, 105], 13], PushBox.Blanka.JUMP]],
      ['hurt-air-13',                 [[[1192,  700,   88,  128], [ 43, 123], 13], PushBox.Blanka.IDLE]],
      ['hurt-air-14',                 [[[1300,  729,  138,   99], [ 94,  94], 13], PushBox.Blanka.IDLE]],
      ['hurt-air-15',                 [[[1448,  751,  103,   70], [ 59,  72], 13], PushBox.Blanka.IDLE]],

      ['sweep-fall-1',                [[[1184, 1619,   87,   88], [ 44, 120], 13], PushBox.Blanka.JUMP, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-2',                [[[1279, 1629,  101,   84], [ 66,  92], 13], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-3',                [[[1385, 1631,  110,   81], [ 77,  65], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-4',                [[[1502, 1654,  161,   55], [ 83,  64], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['sweep-fall-5',                [[[1668, 1669,  177,   39], [ 97,  30], 14], PushBox.Blanka.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['sweep-grounded-1',            [[[1668, 1669,  177,   39], [ 97,  30], 14], PushBox.Blanka.CROUCH, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['knockdown-1',                 [[[ 448, 1631,   96,   85], [ 40,  81], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['knockdown-2',                 [[[ 549, 1637,  100,   79], [ 48,  75], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['getup-1',                     [[[   2, 1959,  141,   66], [ 96,  63], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-2',                     [[[ 234, 1351,  104,   99], [ 57,  96], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-3',                     [[[ 263, 1919,   92,  106], [ 50, 103], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-4',                     [[[ 371, 1932,  125,   90], [ 79,  90], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],
      ['getup-5',                     [[[   9,   13,   97,   95], [ 36,  91], 14], PushBox.Blanka.IDLE, [[   0,    0,    0,    0], [   0,    0,    0,    0], [   0,    0,    0,    0]]]],

      ['ko-airborne-1',               [[[1184, 1619,   87,   88], [ 43,  76]]]],
      ['ko-airborne-2',               [[[1279, 1629,  101,   84], [ 50,  74]]]],

      ['ko-impact-1',                 [[[1385, 1631,  110,   81], [ 55,  77]]]],

      ['ko-bounce-1',                 [[[1503, 1655,  160,   54], [ 80,  50]]]],

      ['ko-grounded-1',               [[[1668, 1669,  177,   39], [ 88,  35], 14]]],

      ['winner-pose-1',               [[[1238, 1913,   80,  113], [ 36, 109], 14]]],
      ['winner-pose-2',               [[[1326, 1896,   94,  130], [ 63, 126], 14]]],
      ['winner-pose-3',               [[[1439, 1875,   87,  151], [ 56, 147], 14]]],
      ['winner-pose-4',               [[[   9, 2108,   85,   63], [ 36,  59], 14]]],
      ['winner-pose-5',               [[[ 104, 2099,   86,   72], [ 36,  68], 14]]],
      ['winner-pose-6',               [[[ 201, 2084,   93,   87], [ 36,  83], 14]]],
      ['winner-pose-7',               [[[ 304, 2099,   86,   72], [ 36,  68], 14]]],
      ['winner-pose-8',               [[[ 403, 2084,   93,   87], [ 36,  83], 14]]],
      ['winner-pose-9',               [[[ 515, 2050,   71,  121], [ 24, 117], 13]]],
      ['winner-pose-10',              [[[ 597, 2049,   93,   86], [ 37, 118], 13]]],
      ['winner-pose-11',              [[[ 696, 2052,   88,   55], [ 39, 115], 13]]],
      ['winner-pose-12',              [[[ 793, 2052,   76,   59], [ 34, 115], 13]]],
      ['winner-pose-13',              [[[ 884, 2059,   67,   68], [ 31, 108], 13]]],
      ['winner-pose-14',              [[[ 965, 2057,   93,   86], [ 56, 110], 13]]],
      ['winner-pose-15',              [[[1069, 2090,  104,   70], [ 59,  77], 13]]],
      ['winner-pose-16',              [[[1183, 2084,   93,   87], [ 36,  83], 14]]],

      ['loser-pose-1',                [[[1110, 1486,   72,  106], [ 43, 102], 14]]],
      ['loser-pose-2',                [[[1198, 1483,   78,  107], [ 43, 105], 14]]],
    ]);

    // prettier-ignore
    this.animations = {
      [FighterState.IDLE]: [
        ['idle-1',  8], ['idle-2',  8], ['idle-3',  8],
        ['idle-2',  8],
      ],

      [FighterState.WALK_FORWARD]: [
        ['forwards-1',  5], ['forwards-2',  5], ['forwards-3',  5],
        ['forwards-4',  5], ['forwards-5',  5], ['forwards-6',  5],
        ['forwards-7',  5], ['forwards-8',  5],
      ],

      [FighterState.WALK_BACKWARD]: [
        ['backwards-1',  5], ['backwards-2',  5], ['backwards-3',  5],
        ['backwards-4',  5], ['backwards-5',  5], ['backwards-6',  5],
        ['backwards-7',  5], ['backwards-8',  5],
      ],

      [FighterState.JUMP_START]: [
        ['idle-1',        1], ['crouch-1',      1], ['jump-start-1',  1],
        ['crouch-1',      2],
        ['crouch-1',     FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP]: [
        ['jump-up-1', 10], ['jump-up-2',  4], ['jump-up-3',  4],
        ['jump-up-4',  6], ['jump-up-3',  4], ['jump-up-2',  4],
        ['jump-up-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_FORWARD]: [
        ['jump-forward-1',  4], ['jump-forward-2',  4], ['jump-up-3',       4],
        ['jump-up-4',       4], ['jump-forward-3',  4], ['jump-forward-4',  4],
        ['jump-forward-5',  4], ['jump-forward-4',  4], ['jump-forward-3',  4],
        ['jump-up-4',       4], ['jump-up-3',       4], ['jump-forward-2',  4],
        ['jump-forward-1', FrameDelay.FREEZE],
      ],

      [FighterState.JUMP_BACKWARD]: [
        ['jump-backward-1', 10], ['jump-backward-2',  4], ['jump-up-3',        4],
        ['jump-up-4',        6], ['jump-up-3',        4], ['jump-backward-2',  4],
        ['jump-backward-1', FrameDelay.FREEZE],
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
        ['idle-turn-3',  2], ['idle-turn-2',  2], ['idle-turn-1',  2],
        ['idle-1',      FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_TURN]: [
        ['crouch-turn-3',  2], ['crouch-turn-2',  2], ['crouch-turn-1',  2],
        ['crouch-1',      FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_PUNCH]: [
        ['idle-1',         2], ['light-punch-1',  2], ['light-punch-2',  3],
        ['light-punch-3',  4], ['light-punch-4',  3], ['light-punch-1',  3],
        ['idle-1',        FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_PUNCH]: [
        ['idle-1',          3], ['medium-punch-1',  2], ['medium-punch-2',  2],
        ['medium-punch-3',  3], ['medium-punch-4',  3],
        ['idle-1',         FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_PUNCH]: [
        ['idle-1',         2], ['heavy-punch-1',  3], ['heavy-punch-2',  4],
        ['heavy-punch-3',  6], ['heavy-punch-4', 10], ['heavy-punch-1',  7],
        ['idle-1',        FrameDelay.TRANSITION],
      ],

      [FighterState.LIGHT_KICK]: [
        ['idle-1',        2], ['light-kick-1',  2], ['light-kick-2',  2],
        ['light-kick-3',  4], ['light-kick-2',  3], ['light-kick-1',  3],
        ['idle-1',       FrameDelay.TRANSITION],
      ],

      [FighterState.MEDIUM_KICK]: [
        ['idle-1',         2], ['medium-kick-1',  2], ['medium-kick-2',  2],
        ['medium-kick-3',  4], ['medium-kick-2',  3], ['medium-kick-1',  3],
        ['idle-1',        FrameDelay.TRANSITION],
      ],

      [FighterState.HEAVY_KICK]: [
        ['idle-1',        3], ['heavy-kick-1',  3], ['heavy-kick-2',  6],
        ['heavy-kick-3',  5], ['heavy-kick-4',  5], ['heavy-kick-5',  5],
        ['heavy-kick-6',  5], ['jump-land-1',   5],
        ['idle-1',       FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_PUNCH]: [
        ['crouch-light-punch-1',  2], ['crouch-light-punch-2',  2], ['crouch-light-punch-3',  4],
        ['crouch-light-punch-4',  3], ['crouch-light-punch-3',  3], ['crouch-light-punch-2',  3],
        ['crouch-light-punch-1', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_PUNCH]: [
        ['crouch-medium-punch-1',  3], ['crouch-medium-punch-2',  3], ['crouch-medium-punch-3',  3],
        ['crouch-medium-punch-4',  7], ['crouch-medium-punch-5',  3], ['crouch-medium-punch-2',  3],
        ['crouch-medium-punch-1',  3],
        ['crouch-medium-punch-6', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_PUNCH]: [
        ['crouch-heavy-punch-1',  3], ['crouch-heavy-punch-2',  4], ['crouch-heavy-punch-3',  6],
        ['crouch-heavy-punch-2', 10], ['crouch-heavy-punch-1',  7],
        ['crouch-heavy-punch-4', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_LIGHT_KICK]: [
        ['crouch-light-kick-1',  2], ['crouch-light-kick-2',  2], ['crouch-light-kick-3',  4],
        ['crouch-light-kick-2',  3], ['crouch-light-kick-1',  3],
        ['crouch-light-kick-4', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_MEDIUM_KICK]: [
        ['crouch-medium-kick-1',  2], ['crouch-medium-kick-2',  2], ['crouch-medium-kick-3',  4],
        ['crouch-medium-kick-2',  3], ['crouch-medium-kick-1',  3],
        ['crouch-medium-kick-4', FrameDelay.TRANSITION],
      ],

      [FighterState.CROUCH_HEAVY_KICK]: [
        ['crouch-heavy-kick-1',  2], ['crouch-heavy-kick-2',  2], ['crouch-heavy-kick-3',  3],
        ['crouch-heavy-kick-4',  4], ['crouch-heavy-kick-3', 10], ['crouch-heavy-kick-2',  7],
        ['crouch-heavy-kick-1', FrameDelay.TRANSITION],
      ],

      [FighterState.JUMP_UP_LIGHT_PUNCH]: [
        ['jump-up-light-punch-1',  3], ['jump-up-light-punch-2',  3], ['jump-up-light-punch-3', 20],
        ['jump-up-light-punch-2',  3], ['jump-up-light-punch-1',  3], ['jump-up-light-punch-1',  3],
      ],

      [FighterState.JUMP_UP_MEDIUM_PUNCH]: [
        ['jump-up-medium-punch-1',  3], ['jump-up-medium-punch-2',  3], ['jump-up-medium-punch-3', 12],
        ['jump-up-medium-punch-2',  3], ['jump-up-medium-punch-1',  3], ['jump-up-medium-punch-1',  3],
      ],

      [FighterState.JUMP_UP_HEAVY_PUNCH]: [
        ['jump-up-heavy-punch-1',  3], ['jump-up-heavy-punch-2',  3], ['jump-up-heavy-punch-3',  6],
        ['jump-up-heavy-punch-2',  3], ['jump-up-heavy-punch-4',  3], ['jump-up-heavy-punch-5',  3],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: [
        ['jump-roll-light-punch-1',  3], ['jump-roll-light-punch-2',  3], ['jump-roll-light-punch-3', 20],
        ['jump-roll-light-punch-2',  3], ['jump-roll-light-punch-1',  3], ['jump-roll-light-punch-1',  3],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: [
        ['jump-roll-medium-punch-1',  3], ['jump-roll-medium-punch-2',  3], ['jump-roll-medium-punch-3', 12],
        ['jump-roll-medium-punch-2',  3], ['jump-roll-medium-punch-1',  3], ['jump-roll-medium-punch-1',  3],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: [
        ['jump-roll-heavy-punch-1',  3], ['jump-roll-heavy-punch-2',  3], ['jump-roll-heavy-punch-3',  6],
        ['jump-roll-heavy-punch-4',  3], ['jump-roll-heavy-punch-4',  3],
      ],

      [FighterState.JUMP_UP_LIGHT_KICK]: [
        ['jump-up-light-kick-1',  3], ['jump-up-light-kick-2',  3], ['jump-up-light-kick-3', 20],
        ['jump-up-light-kick-2',  3], ['jump-up-light-kick-1',  3],
      ],

      [FighterState.JUMP_UP_MEDIUM_KICK]: [
        ['jump-up-medium-kick-1',  3], ['jump-up-medium-kick-2',  3], ['jump-up-medium-kick-3', 12],
        ['jump-up-medium-kick-4',  3], ['jump-up-medium-kick-5',  3],
      ],

      [FighterState.JUMP_UP_HEAVY_KICK]: [
        ['jump-up-heavy-kick-1',  3], ['jump-up-heavy-kick-2',  3], ['jump-up-heavy-kick-3',  6],
        ['jump-up-heavy-kick-2',  3], ['jump-up-heavy-kick-1',  3],
      ],

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: [
        ['jump-roll-light-kick-1',  3], ['jump-roll-light-kick-2',  3], ['jump-roll-light-kick-3', 20],
        ['jump-roll-light-kick-2',  3], ['jump-roll-light-kick-1',  3],
      ],

      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: [
        ['jump-roll-medium-kick-1',  3], ['jump-roll-medium-kick-2',  3], ['jump-roll-medium-kick-3', 12],
        ['jump-roll-medium-kick-4',  3], ['jump-roll-medium-kick-5',  3],
      ],

      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: [
        ['jump-roll-heavy-kick-1',  3], ['jump-roll-heavy-kick-2',  3], ['jump-roll-heavy-kick-3',  6],
        ['jump-roll-heavy-kick-2',  3], ['jump-roll-heavy-kick-1',  3],
      ],

      [FighterState.BLOCK_STAND]: [
        ['block-stand-1',  3],
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
        ['block-crouch-1',  3],
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
        ['hit-crouch-4', FIGHTER_HURT_DELAY], ['hit-crouch-4',  8], ['hit-crouch-5',  4],
        ['hit-crouch-6', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_FALL]: [
        ['sweep-fall-1',  6], ['sweep-fall-2',  6], ['sweep-fall-3',  8],
        ['sweep-fall-4',  6],
        ['sweep-fall-5', FrameDelay.FREEZE],
      ],

      [FighterState.SWEEP_GROUNDED]: [
        ['sweep-grounded-1', FrameDelay.FREEZE],
      ],

      [FighterState.GETUP]: [
        ['getup-1',  6], ['getup-2',  6], ['getup-3',  6],
        ['getup-4',  6],
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
        ['hit-face-3', FIGHTER_HURT_DELAY], ['hit-face-3',  7], ['hit-face-4', 13],
        ['hit-face-4', FrameDelay.TRANSITION],
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
        ['hurt-air-1',  3 + FIGHTER_HURT_DELAY], ['hurt-air-2',  14], ['hurt-air-3',   2],
        ['hurt-air-4',   2], ['hurt-air-5',   2], ['hurt-air-6',   2],
        ['hurt-air-7',   2], ['hurt-air-8',   2], ['hurt-air-9',   2],
        ['hurt-air-10',  2], ['hurt-air-11',  4], ['hurt-air-12',  4],
        ['hurt-air-13',  4], ['hurt-air-14',  4],
        ['hurt-air-15', FrameDelay.FREEZE],
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
        ['winner-pose-1',  7], ['winner-pose-1',  1, 'blanka-scream'], ['winner-pose-2',  8],
        ['winner-pose-3', 11], ['winner-pose-2',  8], ['winner-pose-3', 11],
        ['winner-pose-2',  8], ['winner-pose-1',  7], ['winner-pose-1',  1, 'blanka-scream'],
        ['winner-pose-2',  8], ['winner-pose-3', 11], ['winner-pose-2',  8],
        ['winner-pose-3', 11], ['winner-pose-2',  8], ['winner-pose-1',  7],
        ['winner-pose-1',  1, 'blanka-scream'], ['winner-pose-2',  8], ['winner-pose-3', 11],
        ['winner-pose-2',  8],
        ['winner-pose-3', FrameDelay.FREEZE],
      ],

      [FighterState.LOSER_POSE]: [
        ['loser-pose-1', 12], ['loser-pose-2', 12],
      ],
    };

    this.jumpAttackLoopFrames = {
      [FighterState.JUMP_UP_LIGHT_PUNCH]: 0,
      [FighterState.JUMP_UP_MEDIUM_PUNCH]: 0,
      [FighterState.JUMP_UP_HEAVY_PUNCH]: 0,

      [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: 0,
      [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: 0,
      [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: 0,

      [FighterState.JUMP_UP_LIGHT_KICK]: 0,
      [FighterState.JUMP_UP_MEDIUM_KICK]: 0,
      [FighterState.JUMP_UP_HEAVY_KICK]: 0,

      [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: 0,
      [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: 0,
      [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: 0,
    };

    this.knockdownAnimation = [
      ['knockdown-1',  4],
      ['knockdown-2', FrameDelay.FREEZE],
    ];

    this.winnerAnimations = [
      this.animations[FighterState.WINNER_POSE],
      [
        ['winner-pose-4',   5], ['winner-pose-5',   5], ['winner-pose-6',   5],
        ['winner-pose-7',   5], ['winner-pose-8',   5], ['winner-pose-9',   5],
        ['winner-pose-10',  3], ['winner-pose-11',  3], ['winner-pose-12',  3],
        ['winner-pose-13',  3], ['winner-pose-14',  3], ['winner-pose-15',  3],
        ['winner-pose-16',  5], ['winner-pose-5',   5], ['winner-pose-4',   5],
        ['winner-pose-5',   5], ['winner-pose-16',  5], ['idle-1',          5],
      ],
    ];

    // prettier-ignore
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]:   135,
        [FighterState.WALK_BACKWARD]: -112.5,
        [FighterState.JUMP_FORWARD]:   210,
        [FighterState.JUMP_BACKWARD]: -215.625,
      },
      jump: {
        [FighterState.JUMP_UP]:       -667.5,
        [FighterState.JUMP_FORWARD]:  -660,
        [FighterState.JUMP_BACKWARD]: -675,
      },
    };

    this.gravity          = 2025;
    this.jumpAcceleration =   70.3125;
  }
}
