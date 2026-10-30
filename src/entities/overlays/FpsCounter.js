import { ENABLE_DEBUG } from "../../constants/game.js";

export class FpsCounter {
  constructor() {
    this.fps = 0;
  }

  update(time) {
    this.fps = Math.trunc(1 / time.secondsPassed);
  }

  draw(context) {
    if (!ENABLE_DEBUG) return;

    context.font = "16px Arial";
    context.fillStyle = "#00ff00";
    context.textAlign = "right";
    context.fillText(`${this.fps}`, context.canvas.width - 2, context.canvas.height - 2);
  }
}
