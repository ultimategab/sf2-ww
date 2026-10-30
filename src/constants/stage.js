import { FighterId } from "./fighter.js";

export const STAGE_FLOOR     = 216;

export const STAGE_WIDTH     = 768;
export const STAGE_HEIGHT    = 256;
export const STAGE_MID_POINT = STAGE_WIDTH / 2;
export const STAGE_PADDING   = 256;

export const STAGE_SCROLL_CENTER_X = STAGE_MID_POINT + STAGE_PADDING - 384 / 2;
export const STAGE_ROW_SCROLL_STEP = 630 / 65536;

export const SCROLL_BOUNDRY  = 100;

export const StageFragment = {
  TYPES:      [0, 4, 2, 3, 0, 1, 3, 2, 1, 4, 3, 2, 0, 1, 4, 2],
  VELOCITY_X: [2, -1.25, 1.5, -1.375, 1.375, -1.5, 1.25, -2],
  VELOCITY_Y: [-4.875, -3.75, -4.6875, -3.5625, -5.625, -3.9375, -5.0625, -4.5],
  OFFSET_X:   [-48, 21, 0, 32, -21, -32, 16, -16],
  OFFSET_Y:   [-32, 0, -8, -5, -21, -19, -16, -23],
  FLOOR:      [0, 4, -4, -2, 2, -1, 1, 3],
  BOUNCE:     [-2.5, -2.625, -2.25, -2.375, -2.3125, -2.6875, -2.5625, -2.4375],
};

// set to undefined for a random stage, or to a FighterId to force its stage.
export const FORCE_SELECTED_STAGE = undefined;
