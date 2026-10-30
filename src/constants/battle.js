import { FRAME_TIME } from "./game.js";
import { FighterId } from "./fighter.js";

export const TIME_DELAY       = 30 * FRAME_TIME;
export const TIME_FLASH_DELAY =  3 * FRAME_TIME;
export const TIME_FRAME_KEYS = ["time", "time-flash"];

export const KO_FLASH_DELAY  = [4 * FRAME_TIME, 7 * FRAME_TIME];
export const KO_ANIMATION    = ["ko-white", "ko-red"];

export const HEALTH_MAX_HIT_POINTS      = 144;
export const HEALTH_CRITICAL_HIT_POINTS =  45;
export const HEALTH_COLOR        = "#f3f300";
export const HEALTH_DAMAGE_COLOR = "#f30000";

export const RoundState = {
  ROUND:      "ROUND",
  FIGHT:      "FIGHT",
  ACTIVE:     "ACTIVE",
  KO_IMPACT:  "KO_IMPACT",
  KO_SLOW:    "KO_SLOW",
  ROUND_OVER: "ROUND_OVER",
  TIME_OVER:  "TIME_OVER",
  WINNER:     "WINNER",
  BONUS:      "BONUS",
  BONUS_WAIT: "BONUS_WAIT",
  DRAW:       "DRAW",
  FADE_OUT:   "FADE_OUT",
  FADE_WAIT:  "FADE_WAIT",
};

export const RoundDelay = {
  ROUND:      102,
  FIGHT:       58,
  KO_SLOW:    180,
  ROUND_OVER:  40,
  TIME_OVER:  240,
  WINNER:      60,
  BONUS_WAIT: 120,
  DRAW:       180,
  FADE_OUT:    48,
  FADE_WAIT:   13,
};

export const BonusDelay = {
  TIME:   3,
  VITAL: 33,
  TOTAL: 83,
  SOUND:  4 
};

export const BONUS_SCORE_SPEED_MULTIPLIER = 2;
export const PERFECT_BONUS = 30000;
export const MUSIC_CRITICAL_HIT_POINTS = 30;

export const ResultDelay = {
  FADE_IN:   45,
  CHARACTER:  2,
  DISPLAY:  180,
  FADE_OUT:  48,
  BLACK:      8,
};

export const WinnerQuotes = {
  [FighterId.BLANKA]:  [48, "SEEING YOU IN ACTION IS A\nJOKE."],
  [FighterId.CHUNLI]:  [48, "I'M THE STRONGEST WOMAN\nIN THE WORLD."],
  [FighterId.DHALSIM]: [48, "I WILL MEDITATE AND THEN\nDESTROY YOU."],
  [FighterId.EHONDA]:  [24, "CAN'T YOU DO BETTER THAN THAT?"],
  [FighterId.GUILE]:   [48, "ARE YOU MAN ENOUGH TO FIGHT\nWITH ME?"],
  [FighterId.KEN]:     [28, "ATTACK ME IF YOU DARE, I WILL\nCRUSH YOU."],
  [FighterId.RYU]:     [48, "YOU MUST DEFEAT SHENG LONG\nTO STAND A CHANCE."],
  [FighterId.ZANGIEF]: [48, "MY STRENGTH IS MUCH GREATER\nTHAN YOURS."],
};
