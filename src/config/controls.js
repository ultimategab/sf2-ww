import { GamepadThumbstick, Control } from "../constants/control.js";

export const controls = [
  {
    // Player 1
    gamePad: {
      [GamepadThumbstick.DEAD_ZONE]:         0.5,
      [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
      [GamepadThumbstick.VERTICAL_AXE_ID]:   1,

      [Control.LEFT]:  14,
      [Control.RIGHT]: 15,
      [Control.UP]:    12,
      [Control.DOWN]:  13,

      [Control.START]: 9,
      [Control.COIN]:  8,
      
      [Control.LIGHT_PUNCH]:  2,
      [Control.MEDIUM_PUNCH]: 3,
      [Control.HEAVY_PUNCH]:  5,
      [Control.LIGHT_KICK]:   0,
      [Control.MEDIUM_KICK]:  1,
      [Control.HEAVY_KICK]:   7,
    },
    keyboard: {
      [Control.UP]:    "KeyS",
      [Control.LEFT]:  "KeyZ",
      [Control.DOWN]:  "KeyX",
      [Control.RIGHT]: "KeyC",

      [Control.START]: "KeyA",
      [Control.COIN]:  "KeyD",

      [Control.LIGHT_PUNCH]:  "Digit1",
      [Control.MEDIUM_PUNCH]: "Digit2",
      [Control.HEAVY_PUNCH]:  "Digit3",
      [Control.LIGHT_KICK]:   "KeyQ",
      [Control.MEDIUM_KICK]:  "KeyW",
      [Control.HEAVY_KICK]:   "KeyE",
    },
  },
  {
    // Player 2
    gamePad: {
      [GamepadThumbstick.DEAD_ZONE]:         0.5,
      [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
      [GamepadThumbstick.VERTICAL_AXE_ID]:   1,

      [Control.LEFT]:  14,
      [Control.RIGHT]: 15,
      [Control.UP]:    12,
      [Control.DOWN]:  13,

      [Control.START]: 9,
      [Control.COIN]:  8,
      
      [Control.LIGHT_PUNCH]:  2,
      [Control.MEDIUM_PUNCH]: 3,
      [Control.HEAVY_PUNCH]:  5,
      [Control.LIGHT_KICK]:   0,
      [Control.MEDIUM_KICK]:  1,
      [Control.HEAVY_KICK]:   7,
    },
    keyboard: {
      [Control.UP]:    "KeyL",
      [Control.LEFT]:  "Comma",
      [Control.DOWN]:  "Period",
      [Control.RIGHT]: "Slash",

      [Control.START]:        "Quote",
      [Control.COIN]:         "Enter",

      [Control.LIGHT_PUNCH]:  "Minus",
      [Control.MEDIUM_PUNCH]: "Equal",
      [Control.HEAVY_PUNCH]:  "Backspace",
      [Control.LIGHT_KICK]:   "BracketLeft",
      [Control.MEDIUM_KICK]:  "BracketRight",
      [Control.HEAVY_KICK]:   "Backslash",
    },
  },
];
