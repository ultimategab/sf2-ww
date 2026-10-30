import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_ROW_SCROLL_STEP, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class EHondaStage extends Stage {
  // prettier-ignore
  frames = new Map([
    ["stage-ceiling",    [ 88,   8, 768,  48]],
    ["stage-entrance",   [120, 128,  96, 200]],
    ["stage-background", [216, 176, 576, 136]],
    ["stage-bath-top",   [312, 312, 336,  15]],
    ["stage-bath-rim",   [312, 327, 336,   5]],
    ["stage-bath-front", [312, 336, 336,  32]],
    ["stage-bucket",     [232, 312,  32,  32]],
    ["stage-lantern",    [ 16, 144,  88, 152]],
  ]);

  // prettier-ignore
  sun = new BackgroundAnimation(
    this.image,
    [
      ["sun-1",          [224,  64, 224, 104]],
      ["sun-2",          [456,  64, 224, 104]],
    ],
    [["sun-1", 83], ["sun-2", 83]],
  );

  // prettier-ignore
  sign = new BackgroundAnimation(
    this.image,
    [
      ["sign-1",         [688,  64,  96, 104]],
      ["sign-2",         [792,  64,  64, 104]],
    ],
    [["sign-1", 266], ["sign-2", 266]],
  );

  // prettier-ignore
  water = new BackgroundAnimation(
    this.image,
    [
      ["water-1",        [  8, 448, 284,   8]],
      ["water-2",        [296, 448, 284,  16]],
      ["water-3",        [588, 448, 284,  24]],
    ],
    [
      ["water-1", 166], ["water-1", 166], ["water-2", 166],
      ["water-3", 166], ["water-2",  83], ["water-1",  83],
    ],
  );

  waterState = {
    active: false,
    animationTimer: null,
    animationDelay: this.getWaterDelay(),
  };

  // prettier-ignore
  waterDrop = new BackgroundAnimation(
    this.image,
    [
      ["drop-1",         [  8, 480, 16, 16]],
      ["drop-2",         [ 32, 480, 16, 16]],
      ["drop-3",         [ 56, 480, 16, 16]],
      ["drop-4",         [ 80, 480, 16, 16]],
      ["drop-5",         [104, 480, 16, 16]],
      ["drop-splash-1",  [128, 480, 16, 16]],
      ["drop-splash-2",  [152, 480, 16, 16]],
    ],
    [
      ["drop-1", 133], ["drop-2",        133], ["drop-3",        133], ["drop-4", 133],
      ["drop-5", 133], ["drop-splash-1", 133], ["drop-splash-2", 133], ["drop-1", 133],
    ],
  );

  // prettier-ignore
  waterDrops = [
    this.createWaterDrop(619, 28, 220, true ),
    this.createWaterDrop(363, 28, 222, true ),
    this.createWaterDrop(811, 28, 224, true ),
    this.createWaterDrop(635, 48, 144, false),
    this.createWaterDrop(571, 48, 146, false),
    this.createWaterDrop(731, 48, 148, false),
  ];
  
  waterDropsTimer = null;
  muralStarted = false;

  constructor() {
    super("e-honda", [8, 376, 896, 64]);
  }

  getWaterDelay() {
    const delays = [60, 120, 60, 120, 120, 60, 180, 120];

    return delays[Math.floor(Math.random() * delays.length)];
  }

  getWaterDropDelay() {
    const delays = [1000, 2000, 3000, 4000, 4000, 3000, 2000, 1000];

    return delays[Math.floor(Math.random() * delays.length)];
  }

  createWaterDrop(x, y, groundY, foreground) {
    return {
      position: { x, y },
      startY: y,
      groundY,
      depth: y - 8,
      foreground,
      velocity: 0,
      animation: new BackgroundAnimation(this.image, this.waterDrop.frames, this.waterDrop.animation),
    };
  }

  updateWaterDrops(time) {
    if (this.waterDropsTimer === null) {
      this.waterDropsTimer = time.previous;
      for (const drop of this.waterDrops) drop.animation.animationTimer = time.previous;
      return;
    }

    while (time.previous + 0.000001 >= this.waterDropsTimer + FRAME_TIME) {
      this.waterDropsTimer += FRAME_TIME;
      const dropTime = { previous: this.waterDropsTimer };

      for (const drop of this.waterDrops) {
        const animation = drop.animation;
        const frame = animation.animationFrame;

        if (frame === 4) {
          drop.velocity = Math.min(drop.velocity + 24 / 256, 4);
          drop.position.y += drop.velocity;

          if (Math.ceil(drop.position.y) >= drop.groundY) {
            animation.animationFrame = 5;
            animation.animationTimer = dropTime.previous;
            animation.frameDelay = animation.animation[5][1];
          }

          continue;
        }

        animation.update(dropTime);

        if (frame !== 2 && animation.animationFrame === 2) {
          animation.frameDelay += this.getWaterDropDelay();
        } else if (frame !== 0 && animation.animationFrame === 0) {
          drop.position.y = drop.startY;
          drop.velocity = 0;
        }
      }
    }
  }

  updateWater(time) {
    if (this.waterState.animationTimer === null) this.waterState.animationTimer = time.previous;

    if (time.previous >= this.waterState.animationTimer + this.waterState.animationDelay * FRAME_TIME) {
      this.waterState.active = !this.waterState.active;
      this.waterState.animationTimer = time.previous;
      this.waterState.animationDelay = this.waterState.active ? 50 : this.getWaterDelay();
      this.water.animationFrame = 0;
      this.water.animationTimer = time.previous;
      this.water.frameDelay = this.water.animation[0][1];
    }

    if (this.waterState.active) this.water.update(time);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    super.setFightOver(fightOver);
    this.muralStarted = false;
  }

  updateMural(time) {
    if (!this.fightOver) return;

    if (!this.muralStarted) {
      this.sun.animationFrame = 0;
      this.sun.animationTimer = time.previous;
      this.sun.frameDelay = this.sun.animation[0][1];
      this.sign.animationFrame = 0;
      this.sign.animationTimer = time.previous;
      this.sign.frameDelay = this.sign.animation[0][1];
      this.muralStarted = true;
    }

    this.sun.update(time);
    this.sign.update(time);
  }

  update(time) {
    super.update(time);
    this.updateWater(time);
    this.updateWaterDrops(time);
    this.updateMural(time);
  }

  drawCeiling(context, camera) {
    const cameraX = Math.floor(camera.position.x);
    const cameraXOffset = cameraX - STAGE_SCROLL_CENTER_X;
    const x = STAGE_PADDING + 32 - cameraX - this.getRowOffset(camera, -8);

    context.save();
    context.setTransform(1, 0, cameraXOffset * STAGE_ROW_SCROLL_STEP, 1, x, -Math.floor(camera.position.y));
    this.drawFrame(context, "stage-ceiling", 0, 0);
    context.restore();
  }

  // prettier-ignore
  drawBathhouse(context, camera) {
    const x = STAGE_PADDING + 64 - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y =                     -Math.floor(camera.position.y);

    this.drawFrame(context, "stage-entrance",   x,      y     );
    this.drawFrame(context, "stage-background", x + 96, y + 48);

    if (!this.fightOver) return;

    this.sun.draw(context, x + 192, y + 56);
    const [frameKey] = this.sign.animation[this.sign.animationFrame];
    const [, , width] = this.sign.frames.get(frameKey);
    this.sign.draw(context, x + 512 - width, y + 56);
  }

  drawSkewedFloor(context, camera) {
    this.floor.draw(context, camera, STAGE_FLOOR - 40);
  }

  drawBath(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const cameraX = Math.floor(camera.position.x);
    const cameraY = Math.floor(camera.position.y);
    const x = midPoint - 128 - cameraX - this.getRowOffset(camera, 24);
    const y = STAGE_FLOOR - 56 - cameraY;
    const topX = midPoint - 128 - cameraX - this.getRowOffset(camera, 39);

    context.save();
    context.setTransform(1, 0, -(cameraX - STAGE_SCROLL_CENTER_X) * STAGE_ROW_SCROLL_STEP, 1, topX, y - 20);
    this.drawFrame(context, "stage-bath-top", 0, 0);
    context.restore();

    this.drawFrame(context, "stage-bath-rim", x, y - 5);
    this.drawFrame(context, "stage-bath-front", x, y);
    this.water.draw(context, x + 32, y - 8);
  }

  drawBucket(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const x = midPoint - 202 - Math.floor(camera.position.x) - this.getRowOffset(camera, 26);
    const y = STAGE_FLOOR - 49 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-bucket", x, y);
  }

  drawLantern(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const x = midPoint + 259 - Math.floor(camera.position.x) - this.getRowOffset(camera, 13);
    const y = -13 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-lantern", x, y);
  }

  drawWaterDrops(context, camera, foreground) {
    for (const drop of this.waterDrops) {
      if (drop.foreground !== foreground) continue;

      const frame = drop.animation.animationFrame;
      const splashOffset = frame === 5 ? -1 : frame >= 6 ? 3 : 0;
      const x = drop.position.x - Math.floor(camera.position.x) - this.getRowOffset(camera, drop.depth);
      const y = Math.ceil(drop.position.y) - Math.floor(camera.position.y) + splashOffset;
      drop.animation.draw(context, x, y);
    }
  }

  drawBackground(context, camera) {
    context.save();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();

    this.drawSkewedFloor(context, camera);
    this.drawBathhouse(context, camera);
    this.drawCeiling(context, camera);
    this.drawBath(context, camera);
    this.drawBucket(context, camera);
    this.drawLantern(context, camera);
    this.drawWaterDrops(context, camera, false);
  }

  drawForeground(context, camera) {
    this.drawWaterDrops(context, camera, true);
  }
}