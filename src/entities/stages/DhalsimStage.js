import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from "../../constants/stage.js";
import { playSound } from "../../engine/soundHandler.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class DhalsimStage extends Stage {
  elephantSound = document.querySelector("audio#elephant");

  // prettier-ignore
  frames = new Map([
    ["stage-background", [  8,   8, 768, 176]],
    ["floor-bottom",     [  8, 256, 896,  16]],
    ["front-left-1",     [  8, 712, 192, 224]],
    ["front-left-2",     [208, 712, 192, 224]],
    ["front-right-1",    [403, 712, 128, 224]],
    ["front-right-2",    [539, 712, 192, 224]],
    ["pot-left",         [808, 712,  31,  29]],
    ["pot-right",        [848, 712,  32,  32]],
  ]);

  // prettier-ignore
  backLeftElephant = new BackgroundAnimation(
    this.image,
    [
      ["back-left-1",     [  8, 280, 114, 84]],
      ["back-left-2",     [130, 280, 114, 84]],
      ["back-left-3",     [252, 280, 114, 84]],
    ],
    [["back-left-1", 749], ["back-left-2", 199], ["back-left-3", 666], ["back-left-2", 199]],
  );

  // prettier-ignore
  backRightElephant = new BackgroundAnimation(
    this.image,
    [
      ["back-right-1",    [374, 280, 114, 84]],
      ["back-right-2",    [496, 280, 114, 84]],
      ["back-right-3",    [618, 280, 114, 84]],
    ],
    [["back-right-1", 749], ["back-right-2", 199], ["back-right-3", 666], ["back-right-2", 199]],
  );

  // prettier-ignore
  middleLeftElephant = new BackgroundAnimation(
    this.image,
    [
      ["middle-left-1",   [  8, 376, 288, 160]],
      ["middle-left-2",   [304, 376, 288, 160]],
      ["middle-left-3",   [600, 376, 288, 160]],
    ],
    [["middle-left-1", 749], ["middle-left-2", 199], ["middle-left-3", 666], ["middle-left-2", 199]],
  );

  // prettier-ignore
  middleRightElephant = new BackgroundAnimation(
    this.image,
    [
      ["middle-right-1",  [  8, 544, 288, 160]],
      ["middle-right-2",  [304, 544, 288, 160]],
      ["middle-right-3",  [600, 544, 288, 160]],
    ],
    [["middle-right-1", 749], ["middle-right-2", 199], ["middle-right-3", 666], ["middle-right-2", 199]],
  );

  elephants = [
    { animation: this.backLeftElephant, active: false },
    { animation: this.backRightElephant, active: false },
    { animation: this.middleLeftElephant, active: false },
    { animation: this.middleRightElephant, active: false },
  ];
  
  elephantsTimer = null;
  elephantsDelay = this.getElephantDelay();
  celebrationStarted = false;

  constructor() {
    super("dhalsim", [8, 192, 896, 64]);
  }

  getElephantDelay() {
    const delays = [54, 120, 180, 60, 120, 60, 180, 120];
    return delays[Math.floor(Math.random() * delays.length)] * FRAME_TIME;
  }

  startElephant(elephant, time) {
    const animation = elephant.animation;
    animation.animationFrame = 0;
    animation.animationTimer = time.previous;
    animation.frameDelay = animation.animation[0][1];
    elephant.active = true;
  }

  handleAttackHit() {
    playSound(this.elephantSound);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;

    super.setFightOver(fightOver);
    this.celebrationStarted = false;

    if (fightOver) return;

    for (const elephant of this.elephants) {
      elephant.animation.animationFrame = 0;
      elephant.active = false;
    }

    this.elephantsTimer = null;
  }

  updateElephants(time) {
    if (this.elephantsTimer === null) this.elephantsTimer = time.previous;

    for (const elephant of this.elephants) {
      if (!elephant.active) continue;

      const previousFrame = elephant.animation.animationFrame;

      elephant.animation.update(time);
      if (previousFrame === 3 && elephant.animation.animationFrame === 0 && !this.celebrationStarted) elephant.active = false;
    }

    if (this.fightOver) {
      if (!this.celebrationStarted && this.elephants.every(elephant => !elephant.active)) {
        for (const elephant of this.elephants) this.startElephant(elephant, time);
        this.celebrationStarted = true;
        playSound(this.elephantSound);
      }

      return;
    }

    if (time.previous < this.elephantsTimer + this.elephantsDelay) return;
    
    const elephant = this.elephants[Math.floor(Math.random() * this.elephants.length)];

    if (!elephant.active) this.startElephant(elephant, time);

    this.elephantsTimer = time.previous;
    this.elephantsDelay = this.getElephantDelay();
  }

  update(time) {
    super.update(time);
    this.updateElephants(time);
  }

  drawPalace(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y = -Math.floor(camera.position.y);
    this.drawFrame(context, "stage-background", x, y);
    this.backLeftElephant.draw(context, x + 191, y + 78);
    this.backRightElephant.draw(context, x + 463, y + 78);
  }

  drawSkewedFloor(context, camera) {
    this.floor.draw(context, camera, STAGE_FLOOR - 40);
    const x = STAGE_PADDING - 64 - Math.floor(camera.position.x) - this.getRowOffset(camera, -24);
    const y = STAGE_FLOOR + 24 - Math.floor(camera.position.y);
    this.drawFrame(context, "floor-bottom", x, y);
  }

  drawMiddleElephants(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 24);
    const y = 32 - Math.floor(camera.position.y);
    this.middleLeftElephant.draw(context, x, y);
    this.middleRightElephant.draw(context, x + 480, y);
  }

  drawFrontElephants(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x);
    const y = -Math.floor(camera.position.y);
    const pose = this.celebrationStarted && this.backLeftElephant.animationFrame === 2 ? 2 : 1;
    this.drawFrame(context, `front-left-${pose}`, x, y);
    this.drawFrame(context, `front-right-${pose}`, x + (pose === 1 ? 640 : 576), y);
  }

  drawPots(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const floorStartX = STAGE_PADDING - 64;
    const skew = -5.15 - (camera.position.x - (STAGE_MID_POINT * 2 + STAGE_PADDING)) / 112;
    const x = 32 - camera.position.x / 1.55 + 36 * skew;
    const y = STAGE_FLOOR - 4 - Math.floor(camera.position.y);
    this.drawFrame(context, "pot-left", Math.floor(midPoint - 325 - floorStartX + x), y - 30);
    this.drawFrame(context, "pot-right", Math.floor(midPoint + 288 - floorStartX + x), y - 32);
  }

  drawBackground(context, camera) {
    context.save();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();

    this.drawPalace(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawMiddleElephants(context, camera);
    this.drawFrontElephants(context, camera);
    this.drawPots(context, camera);
  }
}
