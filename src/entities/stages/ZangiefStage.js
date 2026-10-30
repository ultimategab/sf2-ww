import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class ZangiefStage extends Stage {
  // prettier-ignore
  frames = new Map([
    ["stage-factory",       [  8,   8, 768, 256]],
    ["stage-railing",       [  8, 344, 768, 232]],
    ["stage-fence",         [  8, 584, 428, 109]],
    ["stage-chain",         [848,   8, 112, 240]],
    ["stage-extinguisher",  [968, 256,  16,  32]],
  ]);

  // prettier-ignore
  spectators = new BackgroundAnimation(
    this.image,
    [
      ["spectators-1",      [448, 584, 128, 160]],
      ["spectators-2",      [584, 584, 128, 160]],
      ["spectators-3",      [720, 584, 128, 160]],
    ],
    [["spectators-1", 199], ["spectators-2", 199], ["spectators-3", 199]],
  );

  constructor() {
    super("zangief", [8, 264, 896, 74]);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    super.setFightOver(fightOver);

    const spectator = this.spectators;

    if (!spectator.normalAnimation) spectator.normalAnimation = spectator.animation;

    if (fightOver) spectator.animation = spectator.normalAnimation.map(([frame, delay]) => [frame, delay / 2]);
    else spectator.animation = spectator.normalAnimation;
    
    spectator.animationFrame = 0;
    spectator.animationTimer = this.animationTimer;
    spectator.frameDelay = spectator.animation[0][1];
  }

  update(time) {
    super.update(time);
    this.spectators.update(time);
  }

  drawFactory(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 50);
    const y = -8 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-factory", x, y);
  }

  getFloorCameraX(camera) {
    return STAGE_SCROLL_CENTER_X - 0.8 + (camera.position.x - STAGE_SCROLL_CENTER_X) / 0.948733;
  }

  drawSkewedFloor(context, camera) {
    const floorCamera = {
      position: {
        x: this.getFloorCameraX(camera),
        y: camera.position.y,
      },
    };

    this.floor.draw(context, floorCamera, STAGE_FLOOR - 34);
  }

  // prettier-ignore
  drawRailingSpectators(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 34);
    const y = -48 - Math.floor(camera.position.y);

    this.drawFrame(context, "stage-railing", x,       y);
    this.spectators.draw(   context,                  x + 112, y + 64);
  }

  drawExtinguisher(context, camera) {
    const cameraX = this.getFloorCameraX(camera);
    const skew = -5.15 - (cameraX - (STAGE_MID_POINT * 2 + STAGE_PADDING)) / 112;
    const floorX = 32 - cameraX / 1.55 + 4 * skew;
    const x = STAGE_MID_POINT + STAGE_PADDING + 9 - (STAGE_PADDING - 64) + floorX;
    const y = 155 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-extinguisher", Math.floor(x), y);
  }

  drawBackground(context, camera) {
    this.drawFactory(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawRailingSpectators(context, camera);
    this.drawExtinguisher(context, camera);
  }

  // prettier-ignore
  drawForeground(context, camera) {
    const x =  Math.floor(camera.position.x) + this.getRowOffset(camera, -24);
    const y = -Math.floor(camera.position.y);

    this.drawFrame(context, "stage-fence", 128 - x, 147 + y);
    this.drawFrame(context, "stage-chain", 896 - x,  -2 + y);
  }
}
