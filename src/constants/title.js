export const SelfTestDelay = {
  FINISH:       104,
  FADE_OUT:       8,
  VERSION:      120,
  VERSION_HOLD: 180,
  BLACK:         18,
};

export const SelfTestChecks = [
  ["SCR 1",   0,  18],
  ["SCR 2",  18,  30],
  ["SCR 3",  30,  42],
  ["OBJECT", 42,  62],
  ["WORK",   62, 100],
];

export const VersionText = [
  "S T R E E T   F I G H T E R  2",
  "          9 1 0 5 2 2",
  "             E T C",
];

export const WarningDelay = {
  CHARACTER:  1,
  DISPLAY:   60,
  FADE_IN:   80,
  FADE_OUT:  48,
  BLACK:      8,

  // sf2ww warning timing; fade transition happens within one CPS tick.
  FAST_FADE_IN_END: 68,
  FAST_FADE_IN:      9,
  FAST:             32,
};

export const WarningText = [
  "                 WARNING                  ",
  " This game is for use in all countries    ",
  "excluding the United States of America,   ",
  "Canada, Mexico and Japan.             ",
  "Sales, export or operation inside these",
  "countries may be construed as copyright",
  "and trademark infringement and is strictly",
  "prohibited.",
  "Violators are subject to severe penalties",
  "and will be prosecuted to the full extent",
  "of the law.",
];

export const IntroDelay = {
  WINDUP:          240,
  IMPACT:          256,
  HIT_STOP:          6,
  IMPACT_FLASH:      7,
  SCROLL_START:    318,
  SCROLL_END:      574,
  BACKGROUND_FADE:  48,
  CROWD_FRAME:      32,
};

export const IntroTeethVelocity = [
  [2.75, 2], [3, 1], [3.25, 3], [2.5, 0],
];

export const TitleDelay = {
  LOGO_HOLD:         181,
  LOGO_SPIN:          32,
  SUBTITLE_START:     17,
  INSERT_COIN:        24,
  FADE_OUT:           48,
  BLACK:               8,
};

export const TitleSubtitleOffsets = [
  -175, 170, -170, 166, -166, 162, -161, 156, -156, 152, -152, 148, -147, 142, -142, 138,
  -138, 134, -133, 128, -128, 124, -124, 120, -119, 114, -114, 110, -110, 106, -105, 101,
  -101,  96,  -96,  92,  -92,  88,  -87,  82,  -82,  78,  -78,  74,  -73,  68,  -68,  64,
   -64,  60,  -59,  54,  -54,  50,  -50,  46,  -45,  40,  -40,  36,  -36,  32,  -31,  27,
   -27,  22,  -22,  18,  -18,  14,    8,  -8,    4,  -4,    0,  -1,
];
