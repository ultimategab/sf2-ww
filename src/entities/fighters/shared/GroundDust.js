import { FRAME_TIME } from "../../../constants/game.js";
import { HitSplash } from "./HitSplash.js";

export class GroundDust extends HitSplash {
  constructor(x, y, direction, time, onEnd) {
    super(x, y, 0, onEnd);

    this.direction = direction;
    this.animationFrame = 0;
    this.animationTimer = time.previous;

    // prettier-ignore
    this.frames = [
      [[ 12, 150, 22, 18], [11, 18]],
      [[ 41, 149, 24, 20], [12, 20]],
      [[ 72, 148, 26, 22], [13, 22]],
      [[106, 147, 28, 24], [14, 24]],
      [[144, 146, 31, 26], [16, 26]],
    ];

    // prettier-ignore
    this.animation = [
      [ 0,  0, 1], [48,  0, 0], [24,  0, 0], [64,  0, 0],
      [ 0, 15, 2], [48,  3, 1], [24,  0, 0], [64,  0, 0],
      [ 0, 24, 3], [48, 18, 2], [24,  8, 1], [64,  0, 0],
      [ 0, 29, 4], [48, 26, 3], [24, 20, 2], [64, 12, 1],
      [ 0, 32, 5], [48, 30, 4], [24, 27, 3], [64, 22, 2],
      [ 0,  0, 0], [48, 33, 5], [24, 31, 4], [64, 28, 3],
      [ 0,  0, 0], [48,  0, 0], [24, 33, 5], [64, 32, 4],
      [ 0,  0, 0], [48,  0, 0], [24,  0, 0], [64, 33, 5],
    ];
  }

  update(time) {
    if (this.animationFrame >= this.animation.length) return;

    this.animationFrame = Math.round((time.previous - this.animationTimer) / FRAME_TIME);

    if (this.animationFrame >= this.animation.length) this.onEnd(this);
  }

  draw(context, camera) {
    if (this.animationFrame >= this.animation.length) return;

    const [offsetX, offsetY, frame] = this.animation[this.animationFrame];

    if (frame === 0) return;

    const [[x, y, width, height], [originX, originY]] = this.frames[frame - 1];

    context.save();
    context.translate(
      Math.floor(this.position.x - camera.position.x),
      Math.floor(this.position.y - camera.position.y),
    );
    context.scale(this.direction, 1);
    context.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      offsetX - originX,
      -offsetY - originY,
      width,
      height,
    );
    context.restore();
  }
}
