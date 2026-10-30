import { FRAME_TIME } from "../../../constants/game.js";
import { HitSplash } from "./HitSplash.js";

export class BlockSplash extends HitSplash {
  constructor(x, y, playerId, onEnd) {
    super(x, y, 0, onEnd);

    // prettier-ignore
    this.frames = [
      [[ 15, 116, 11, 11], [ 7,  7]],
      [[ 44, 112, 15, 21], [ 8, 10]],
      [[ 73, 112, 23, 20], [12, 11]],
      [[104, 109, 31, 30], [15, 14]],
      [[144, 106, 32, 32], [16, 16]],
    ];
  }

  update(time) {
    if (time.previous < this.animationTimer + 6 * FRAME_TIME) return;

    this.animationFrame += 1;
    this.animationTimer = time.previous;

    if (this.animationFrame >= this.frames.length) this.onEnd(this);
  }
}
