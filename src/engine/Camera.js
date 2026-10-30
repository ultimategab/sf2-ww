import { SCROLL_BOUNDRY, STAGE_HEIGHT, STAGE_PADDING, STAGE_WIDTH } from "../constants/stage.js";

export class Camera {
  constructor(x, y, fighters) {
    this.position = { x, y };
    this.fighters = fighters;
    this.previousFighterX = fighters.map((fighter) => fighter.position.x);
  }

  // prettier-ignore
  update(time, context) {
    this.position.y = -6 + Math.floor(Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10);

    const lowX =  Math.min(this.fighters[1].position.x, this.fighters[0].position.x);
    const highX = Math.max(this.fighters[1].position.x, this.fighters[0].position.x);
    
    const movementX = this.fighters.map((fighter, index) => fighter.position.x - this.previousFighterX[index]);
    this.previousFighterX = this.fighters.map(fighter => fighter.position.x);

    if (highX - lowX > context.canvas.width - SCROLL_BOUNDRY * 2) {
      this.position.x += (movementX[0] + movementX[1]) / 2;
    } else {
      let scrollMovementX = 0;
      for (const [index, fighter] of this.fighters.entries()) {
        const velocityX = (fighter.velocity.x + fighter.slideVelocity) * fighter.direction;
        if ((fighter.position.x < this.position.x + SCROLL_BOUNDRY && velocityX < 0 && movementX[index] < 0) || (fighter.position.x > this.position.x + context.canvas.width - SCROLL_BOUNDRY && velocityX > 0 && movementX[index] > 0)) {
          if (Math.abs(movementX[index]) > Math.abs(scrollMovementX)) scrollMovementX = movementX[index];
        }
      }
      this.position.x += scrollMovementX;
    }

    for (const fighter of this.fighters) {
      const nextX = fighter.position.x + fighter.velocity.x * fighter.direction * time.secondsPassed;
      if (nextX < this.position.x + fighter.boxes.push.width) this.position.x = nextX - fighter.boxes.push.width;
      if (nextX > this.position.x + context.canvas.width - fighter.boxes.push.width) this.position.x = nextX + fighter.boxes.push.width - context.canvas.width;
    }

    const minCameraX = Math.max(...this.fighters.map(fighter => fighter.position.x + fighter.boxes.push.width - context.canvas.width));
    const maxCameraX = Math.min(...this.fighters.map(fighter => fighter.position.x - fighter.boxes.push.width));
    if (minCameraX <= maxCameraX) this.position.x = Math.max(minCameraX, Math.min(this.position.x, maxCameraX));

    if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING;
    if (this.position.x > STAGE_WIDTH + STAGE_PADDING - context.canvas.width) this.position.x = STAGE_WIDTH + STAGE_PADDING - context.canvas.width;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > STAGE_HEIGHT - context.canvas.height) this.position.y = STAGE_HEIGHT - context.canvas.height;
  }
}