import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class RyuStage extends Stage {
  decorations = [
    { position: { x: 368, y: STAGE_FLOOR }, direction: 1 },
    { position: { x: 912, y: STAGE_FLOOR }, direction: 1 },
  ];
  decorationBox = { x: -17, y: -98, width: 34, height: 100 };
  breakSound = document.querySelector("audio#break-wood");
  fragmentDuration = 55;
  fragmentBlinkFrame = 25;
  fragmentsBounce = false;

  // prettier-ignore
  frames = new Map([
    ["stage-sky-moon",    [  9,  10, 512, 144]],
    ["stage-sky",         [529,  10, 512, 144]],
    ["stage-castle",      [105, 224, 139,  76]],
    ["stage-roof-1",      [277, 166, 544, 167]],
    ["stage-roof-2",      [277, 333, 538,  45]],
    ["stage-roof-ridge",  [837, 206,  32,  16]],
    ["stage-near-roof-1", [  8, 245,  96, 134]],
    ["stage-near-roof-2", [104, 301, 173,  78]],
    ["stage-near-roof-3", [  8, 379, 672,  74]],
    ["stage-floor-edge",  [  8, 505, 896,  12]],
    ["stage-sign",        [815, 333,  35, 103]],
    ["stage-sign-broken", [866, 366,  35,  69]],

    ["sign-fragment-1",   [917, 366,  16,  26]],
    ["sign-fragment-2",   [917, 393,  23,  29]],
    ["sign-fragment-3",   [941, 366,  21,  42]],
    ["sign-fragment-4",   [941, 408,  21,  27]],
  ]);

  sky = {
    position: { x: 96 },
    velocity: 250 / FRAME_TIME,
    hasMoon: true,
  };

  // prettier-ignore
  bat = new BackgroundAnimation(
    this.image,
    [
      ["bat-1", [837, 246,  16,  16]], ["bat-2", [861, 246,  16,  16]],
      ["bat-3", [885, 246,  16,  16]], ["bat-4", [909, 246,  16,  16]],
      ["bat-5", [933, 246,  16,  16]], ["bat-6", [957, 246,  16,  16]],
      ["bat-7", [981, 246,  16,  16]], ["bat-8", [1005, 246,  16,  16]],
      ["bat-hidden", [904, 160,  16,  16]],
    ],
    [
      ["bat-1", 66,  0], ["bat-1", 66,  1], ["bat-1", 66,  2], ["bat-1", 66,  3],
      ["bat-1", 66,  4], ["bat-1", 66,  5], ["bat-1", 66,  6], ["bat-1", 33,  7],
      ["bat-hidden", 33, 0],
      ["bat-2", 33,  8], ["bat-2", 33,  9], ["bat-2", 33, 10], ["bat-2", 33, 11],
      ["bat-2", 33, 12], ["bat-2", 33, 13], ["bat-2", 33, 14],
      ["bat-hidden", 33, 0],
      ["bat-3", 33, 15], ["bat-3", 33, 18], ["bat-3", 33, 19], ["bat-4", 33, 20],
      ["bat-4", 33, 22], ["bat-3", 33, 26], ["bat-3", 33, 28], ["bat-3", 33, 30],
      ["bat-5", 33, 33], ["bat-5", 33, 35], ["bat-5", 33, 37], ["bat-5", 33, 38],
      ["bat-6", 99, 37], ["bat-7",166, 35], ["bat-6", 99, 37], ["bat-8",166, 38],
      ["bat-6", 99, 37], ["bat-7",133, 35], ["bat-6",133, 37], ["bat-8",133, 38],
      ["bat-6",166, 37], ["bat-7", 99, 35], ["bat-6",133, 37], ["bat-8",133, 38],
      ["bat-6",133, 37], ["bat-7",133, 35], ["bat-6",133, 37], ["bat-8",133, 38],
      ["bat-3", 33, 35], ["bat-3", 33, 34], ["bat-4", 33, 30], ["bat-4", 33, 28],
      ["bat-4", 33, 26], ["bat-3", 33, 25], ["bat-3", 33, 23],
      ["bat-hidden", 33, 0],
      ["bat-2", 33, 21], ["bat-2", 33, 18], ["bat-2", 33, 19],
      ["bat-hidden", 33, 0],
      ["bat-1", 33, 15], ["bat-1", 33, 14], ["bat-1", 33, 13], ["bat-1", 33, 12],
      ["bat-1", 33, 11], ["bat-1", 33, 10],
    ],
  );
  
  bats = [this.createBat(), this.createBat(), this.createBat()];
  batsTimer = null;

  constructor() {
    super("ryu", [8, 461, 896, 36]);
  }

  createBat() {
    return {
      active: false,
      position: { x: 0, y: 0 },
      animation: new BackgroundAnimation(this.image, this.bat.frames, this.bat.animation),
    };
  }

  updateBats(time) {
    if (this.batsTimer === null) this.batsTimer = time.previous;
    for (const bat of this.bats) {
      if (!bat.active) continue;
      const frame = bat.animation.animationFrame;
      bat.animation.update(time);
      if (frame !== 0 && bat.animation.animationFrame === 0) bat.active = false;
    }

    if (time.previous < this.batsTimer + 500) return;
    this.batsTimer = time.previous;
    const bat = this.bats.find((bat) => !bat.active);
    if (!bat || Math.floor(Math.random() * 4) !== 0) return;

    const positions = [[672, 168], [672, 208], [688, 192], [720, 184], [752, 208], [784, 160], [800, 216], [832, 176]];
    const [x, y] = positions[Math.floor(Math.random() * positions.length)];
    bat.position.x = x - 8;
    bat.position.y = 248 - y;
    bat.active = true;
    bat.animation.animationFrame = 0;
    bat.animation.animationTimer = time.previous;
    bat.animation.frameDelay = bat.animation.animation[0][1];
  }

  updateSky(time) {
    this.sky.position.x += this.sky.velocity * time.secondsPassed;
    if (this.sky.position.x >= 512) {
      this.sky.position.x %= 512;
      this.sky.hasMoon = false;
    }
  }

  update(time) {
    super.update(time);
    this.updateSky(time);
    this.updateBats(time);
  }

  breakDecoration(decoration, time) {
    for (const [frameKey, x, y, velocityX, velocityY] of [
      ["sign-fragment-1", -8, -70, -0.75, -5],
      ["sign-fragment-2",  0, -54, -0.5,  -4],
      ["sign-fragment-3",  8, -54,  1,    -5],
      ["sign-fragment-4",  8, -38,  0.625, -4],
    ]) {
      this.addFragment(frameKey,
        { x: decoration.position.x + x, y: decoration.position.y + y },
        { x: velocityX, y: velocityY }, 1, time);
    }
  }

  drawSky(context, camera) {
    const x = 128 - Math.floor(this.sky.position.x);
    const y = -8 - Math.ceil(camera.position.y / 2);

    this.drawFrame(context, "stage-sky", x - 512, y);
    this.drawFrame(context, this.sky.hasMoon ? "stage-sky-moon" : "stage-sky", x, y);
    this.drawFrame(context, "stage-sky", x + 512, y);
  }

  drawCastle(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const x = midPoint - 27 - Math.floor(camera.position.x) - this.getRowOffset(camera, 64);
    const y = 48 - Math.floor(camera.position.y / 2);
    this.drawFrame(context, "stage-castle", x, y);
  }

  drawRoof(context, camera) {
    const x = Math.floor(camera.position.x) + this.getRowOffset(camera, 56);
    const y = Math.ceil( camera.position.y * 0.75);
    this.drawFrame(context, "stage-roof-1", STAGE_PADDING + 160 - x, 8 - y);
    this.drawFrame(context, "stage-roof-2", STAGE_PADDING + 160 - x, 175 - y);
    this.drawFrame(context, "stage-roof-ridge", STAGE_PADDING + 336 - x, 124 - y);
  }

  drawNearRoof(context, camera) {
    const x = STAGE_PADDING + 48 - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y = -16 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-near-roof-1", x, y);
    this.drawFrame(context, "stage-near-roof-2", x + 96, y + 56);
    this.drawFrame(context, "stage-near-roof-3", x, y + 134);
  }

  drawSkewedFloor(context, camera) {
    const floorCamera = {
      position: {
        x: STAGE_SCROLL_CENTER_X - 0.8 + (camera.position.x - STAGE_SCROLL_CENTER_X) / 0.859447,
        y: camera.position.y,
      },
    };

    this.floor.draw(context, floorCamera, STAGE_FLOOR - 24);
    const x = STAGE_PADDING - 63 - Math.floor(camera.position.x) - this.getRowOffset(camera, -12);
    const y = STAGE_FLOOR + 12 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-floor-edge", x, y);
  }

  drawSigns(context, camera) {
    for (const sign of this.decorations) {
      this.drawFrame(context, sign.brokenAt === undefined ? "stage-sign" : "stage-sign-broken",
        sign.position.x - 16 - Math.floor(camera.position.x),
        sign.position.y - (sign.brokenAt === undefined ? 99 : 65) - Math.floor(camera.position.y));
    }
  }

  drawBats(context, camera) {
    const x = Math.floor(camera.position.x) + this.getRowOffset(camera, 64);
    const y = Math.floor(camera.position.y);
    for (const bat of this.bats) {
      if (!bat.active) continue;
      const [, , offsetY] = bat.animation.animation[bat.animation.animationFrame];
      bat.animation.draw(context, bat.position.x - x, bat.position.y + offsetY - y);
    }
  }

  drawBackground(context, camera) {
    context.save();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();

    this.drawSky(context, camera);
    this.drawCastle(context, camera);
    this.drawRoof(context, camera);
    this.drawNearRoof(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawSigns(context, camera);
    this.drawBats(context, camera);
  }
}
