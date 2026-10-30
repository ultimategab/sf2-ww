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
      [Control.UP]:    "KeyW",
      [Control.LEFT]:  "KeyA",
      [Control.DOWN]:  "KeyS",
      [Control.RIGHT]: "KeyD",

      [Control.START]: "KeyZ",
      [Control.COIN]:  "KeyX",

      [Control.LIGHT_PUNCH]:  "KeyU",
      [Control.MEDIUM_PUNCH]: "KeyI",
      [Control.HEAVY_PUNCH]:  "KeyO",
      [Control.LIGHT_KICK]:   "KeyJ",
      [Control.MEDIUM_KICK]:  "KeyK",
      [Control.HEAVY_KICK]:   "KeyL",
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
      [Control.UP]:    "ArrowUp",
      [Control.LEFT]:  "ArrowLeft",
      [Control.DOWN]:  "ArrowDown",
      [Control.RIGHT]: "ArrowRight",

      [Control.START]:        "Numpad1",
      [Control.COIN]:         "Numpad2",

      [Control.LIGHT_PUNCH]:  "Numpad7",
      [Control.MEDIUM_PUNCH]: "Numpad8",
      [Control.HEAVY_PUNCH]:  "Numpad9",
      [Control.LIGHT_KICK]:   "Numpad4",
      [Control.MEDIUM_KICK]:  "Numpad5",
      [Control.HEAVY_KICK]:   "Numpad6",
    },
  },
];
