import { FighterId } from "./fighter.js";

export const SelectState = {
  SELECT:   "SELECT",
  PLANE:    "PLANE",
  ARRIVED:  "ARRIVED",
  FADE_OUT: "FADE_OUT",
};

export const SelectDelay = {
  INTRO:       30,
  CONFIRM:     45,
  PLANE:       50,
  COUNTRY:     50,
  EXIT:        60,
  FADE_IN:     15,
  FADE_OUT:    48,
  BLACK:        8,
  PUSH_START:  16,
};

export const VersusDelay = {
  FADE_IN:  45,
  DISPLAY: 180,
  FADE_OUT: 48,
  BLACK:     8,
};

export const PlaneVelocity = [
  [   0,  672], [  75,  668], [ 149,  658], [ 222,  642],
  [ 293,  620], [ 361,  591], [ 426,  558], [ 486,  519],
  [ 542,  474], [ 593,  425], [ 638,  372], [ 676,  316],
  [ 708,  256], [ 734,  194], [ 752,  130], [ 764,   65],
  [ 768,    0], [ 764,  -65], [ 752, -130], [ 734, -194],
  [ 708, -256], [ 676, -316], [ 638, -372], [ 593, -425],
  [ 542, -474], [ 486, -519], [ 426, -558], [ 361, -591],
  [ 293, -620], [ 222, -642], [ 149, -658], [  75, -668],
  [   0, -672], [ -75, -668], [-149, -658], [-222, -642],
  [-293, -620], [-361, -591], [-426, -558], [-486, -519],
  [-542, -474], [-593, -425], [-638, -372], [-676, -316],
  [-708, -256], [-734, -194], [-752, -130], [-764,  -65],
  [-768,    0], [-764,   65], [-752,  130], [-734,  194],
  [-708,  256], [-676,  316], [-638,  372], [-593,  425],
  [-542,  474], [-486,  519], [-426,  558], [-361,  591],
  [-293,  620], [-222,  642], [-149,  658], [ -75,  668],
];

export const SelectFighters = [
  {
    id:             FighterId.BLANKA,
    country:        "brazil",
    selectPosition: [2, 0],
    flag:           [264,  96],
    city:           [300, 100],
    nameX:          [  0, 288],
    versusNameX:    [ 28, 260],
  },
  {
    id:             FighterId.CHUNLI,
    country:        "china",
    selectPosition: [1, 1],
    flag:           [156,  36],
    city:           [174,  58],
    nameX:          [  0, 285],
    versusNameX:    [ 28, 260],
  },
  {
    id:             FighterId.DHALSIM,
    country:        "india",
    selectPosition: [3, 1],
    flag:           [109,  72],
    city:           [146,  77],
    nameX:          [  0, 288],
    versusNameX:    [ 34, 254],
  },
  {
    id:             FighterId.EHONDA,
    country:        "japan",
    selectPosition: [1, 0],
    flag:           [200,  40],
    city:           [196,  61],
    nameX:          [  0, 288],
    versusNameX:    [ 28, 260],
  },
  {
    id:             FighterId.GUILE,
    country:        "usa",
    selectPosition: [3, 0],
    flag:           [280,  60],
    city:           [279,  68],
    nameX:          [  9, 295],
    versusNameX:    [ 36, 268],
  },
  {
    id:             FighterId.KEN,
    country:        "usa",
    selectPosition: [0, 1],
    flag:           [276,  26],
    city:           [274,  53],
    nameX:          [ 20, 308],
    versusNameX:    [ 52, 280],
  },
  {
    id:             FighterId.RYU,
    country:        "japan",
    selectPosition: [0, 0],
    flag:           [184,  76],
    city:           [190,  69],
    nameX:          [ 23, 310],
    versusNameX:    [ 52, 284],
  },
  {
    id:             FighterId.ZANGIEF,
    country:        "ussr",
    selectPosition: [2, 1],
    flag:           [102,  36],
    city:           [136,  49],
    nameX:          [  0, 288],
    versusNameX:    [ 28, 258],
  },
];

export const FirstStageIds = SelectFighters.map(fighter => fighter.id);
