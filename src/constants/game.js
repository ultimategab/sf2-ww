import { getCanvas } from "../utils/context.js";

export const ENABLE_DEBUG = false;

// cps-1 uses a pixel clock of 8 mhz, 512 clocks per line, and 262 lines per frame
// based on these values, the calculated rate is approximately 59.6374 hz, equivalent to 16.768 ms per frame
export const FPS = 59.63740458015267;
export const FRAME_TIME = 1000 / FPS;

const canvas = getCanvas();
export const SCREEN_WIDTH  = canvas.width;
export const SCREEN_HEIGHT = canvas.height;
