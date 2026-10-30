import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class ChunliStage extends Stage {
  // prettier-ignore
  frames = new Map([
    ["stage-background", [   8, 312, 768, 224]],
    ["stage-shops",      [ 176,   8, 704, 208]],
    ["stage-rock",       [ 888, 200,  32,  16]],

    ["bike-torso",       [ 984, 656,  48,  24]],
    ["bike-handlebar",   [ 960, 656,  16,  24]],
    ["bike-mudguard",    [ 888, 488,  32,   8]],
    ["bike-shadow",      [ 904, 472,  16,   8]],
    ["bike-rear-1",      [ 888, 504,  32,  32]],
    ["bike-rear-2",      [ 888, 544,  32,  32]],
    ["bike-rear-3",      [ 888, 584,  32,  32]],
    ["bike-front-1",     [ 888, 688,  32,  32]],
    ["bike-front-2",     [ 928, 688,  32,  32]],
    ["bike-front-3",     [ 968, 688,  32,  32]],

    ["bike-woman-red",   [ 960, 624,  16,  24]],
    ["bike-woman-green", [ 984, 624,  16,  24]],
    ["bike-woman-blue",  [1008, 624,  16,  24]],
    ["bike-man-1",       [ 888, 624,  16,  24]],
    ["bike-man-2",       [ 912, 624,  16,  24]],
    ["bike-man-3",       [ 936, 624,  16,  24]],
    ["bike-man-4",       [ 888, 656,  16,  24]],
    ["bike-man-5",       [ 912, 656,  16,  24]],
    ["bike-man-6",       [ 936, 656,  16,  24]],

    ["bike-red-1",       [ 784, 728,  48,  48]],
    ["bike-red-2",       [ 840, 728,  48,  48]],
    ["bike-red-3",       [ 896, 728,  48,  48]],
    ["bike-red-4",       [ 952, 728,  48,  48]],
    ["bike-red-5",       [ 784, 784,  48,  48]],
    ["bike-red-6",       [ 840, 784,  48,  48]],
    ["bike-green-1",     [ 896, 784,  48,  48]],
    ["bike-green-2",     [ 952, 784,  48,  48]],
    ["bike-green-3",     [ 784, 840,  48,  48]],
    ["bike-green-4",     [ 840, 840,  48,  48]],
    ["bike-green-5",     [ 896, 840,  48,  48]],
    ["bike-green-6",     [ 952, 840,  48,  48]],
    ["bike-blue-1",      [ 784, 896,  48,  48]],
    ["bike-blue-2",      [ 840, 896,  48,  48]],
    ["bike-blue-3",      [ 896, 896,  48,  48]],
    ["bike-blue-4",      [ 952, 896,  48,  48]],
    ["bike-blue-5",      [ 784, 952,  48,  48]],
    ["bike-blue-6",      [ 840, 952,  48,  48]],
  ]);

  // prettier-ignore
  family = new BackgroundAnimation(
    this.image,
    [
      ["family-1",       [952, 352, 48, 80]],
      ["family-2",       [952, 440, 48, 80]],
      ["family-3",       [952, 528, 48, 80]],
    ],
    [
      ["family-1", 2000], ["family-2", 200], ["family-3", 200], ["family-2", 200],
      ["family-1", 1033], ["family-2", 200], ["family-3", 200], ["family-2", 200],
      ["family-1",  200], ["family-2", 200], ["family-3", 200], ["family-2", 200],
    ],
  );

  // prettier-ignore
  seatedMan = new BackgroundAnimation(
    this.image,
    [
      ["seated-man-1",  [1000, 360, 40, 32]],
      ["seated-man-2",  [1000, 448, 40, 32]],
      ["seated-man-3",  [1000, 536, 40, 32]],
    ],
    [
      ["seated-man-1", 2000], ["seated-man-2", 200], ["seated-man-3", 200], ["seated-man-2", 200],
      ["seated-man-1", 1033], ["seated-man-2", 200], ["seated-man-3", 200], ["seated-man-2", 200],
      ["seated-man-1",  200], ["seated-man-2", 200], ["seated-man-3", 200], ["seated-man-2", 200],
    ],
  );

  // prettier-ignore
  butchers = new BackgroundAnimation(
    this.image,
    [
      ["butchers-1",     [784, 472, 96, 72]],
      ["butchers-2",     [784, 552, 96, 72]],
      ["butchers-3",     [784, 632, 96, 72]],
    ],
    [
      ["butchers-1", 1667], ["butchers-2",  167], ["butchers-3", 167], ["butchers-2", 167],
      ["butchers-1", 1000], ["butchers-2", 1667], ["butchers-3", 167], ["butchers-2", 167],
    ],
  );

  // prettier-ignore
  cagedBirds = new BackgroundAnimation(
    this.image,
    [
      ["birds-1",        [784, 312, 32, 32]],
      ["birds-2",        [824, 312, 32, 32]],
      ["birds-3",        [864, 312, 32, 32]],
    ],
    [
      ["birds-1", 1500], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ["birds-1",   66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ["birds-1",   66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ["birds-1",   66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ["birds-1",   66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ["birds-1",   66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
    ],
  );

  // prettier-ignore
  farmer = new BackgroundAnimation(
    this.image,
    [
      ["farmer-1",       [784, 400, 48, 64]],
      ["farmer-2",       [840, 400, 48, 64]],
      ["farmer-3",       [896, 400, 48, 64]],
    ],
    [
      ["farmer-1", 1333], ["farmer-2", 217], ["farmer-3", 217], ["farmer-2", 217],
    ],
  );

  // prettier-ignore
  washerWoman = new BackgroundAnimation(
    this.image,
    [
      ["washer-1",       [784, 352, 64, 40]],
      ["washer-2",       [856, 352, 64, 40]],
    ],
    [["washer-1", 200], ["washer-2", 200]],
  );

  // prettier-ignore
  barberPole = new BackgroundAnimation(
    this.image,
    [
      ["barber-1",       [904, 312, 32, 32]],
      ["barber-2",       [944, 312, 32, 32]],
      ["barber-3",       [984, 312, 32, 32]],
    ],
    [["barber-1", 133], ["barber-2", 133], ["barber-3", 133]],
  );

  // prettier-ignore
  sky = new BackgroundAnimation(
    this.image,
    [
      ["sky-1",          [8, 544, 320, 96]],
      ["sky-2",          [8, 672, 320, 96]],
    ],
    [["sky-1", 833], ["sky-2", 833]],
  );
  // prettier-ignore
  clouds = new BackgroundAnimation(
    this.image,
    [
      ["clouds-1",       [8, 544, 64, 96]],
      ["clouds-2",       [8, 672, 64, 96]],
    ],
    [["clouds-1", 833], ["clouds-2", 833]],
  );

  bicycles = [];

  bicycleSpawner = {
    animationTimer: 0,
    animationDelay: this.getBicycleDelay() + 2,
  };

  bicycleWheels = {
    rear: [3, 2, 1, 3, 2, 1],
    front: [2, 3, 1, 2, 3, 1],
  };

  cameraX = STAGE_SCROLL_CENTER_X;
  shopsImage = null;

  constructor() {
    super("chun-li", [8, 224, 1024, 64]);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    super.setFightOver(fightOver);

    for (const [spectator, celebration] of [
      [this.family, [
        ["family-1", 200], ["family-2", 200], ["family-3", 200], ["family-2", 200],
      ]],
      [this.seatedMan, [
        ["seated-man-1", 200], ["seated-man-2", 200], ["seated-man-3", 200], ["seated-man-2", 200],
      ]],
      [this.butchers, [
        ["butchers-1", 167], ["butchers-2", 167], ["butchers-3", 167], ["butchers-2", 167],
      ]],
      [this.cagedBirds, [
        ["birds-1", 66], ["birds-2", 66], ["birds-3", 66], ["birds-2", 66],
      ]],
      [this.farmer, [
        ["farmer-1", 217], ["farmer-2", 217], ["farmer-3", 217], ["farmer-2", 217],
      ]],
    ]) {
      if (!spectator.normalAnimation) spectator.normalAnimation = spectator.animation;
      spectator.animation = fightOver ? celebration : spectator.normalAnimation;
      spectator.animationFrame = 0;
      spectator.animationTimer = this.animationTimer;
      spectator.frameDelay = spectator.animation[0][1];
    }
  }

  getBicycleDelay() {
    return [60, 300, 300, 420, 420, 420, 420, 300][Math.floor(Math.random() * 8)];
  }

  createBicycle(time) {
    const direction = Math.random() < 0.5 ? 1 : -1;
    const color = ["red", "green", "blue", "red", "green", "blue", "red", "green"][Math.floor(Math.random() * 8)];
    const head = [`bike-woman-${color}`, "bike-man-1", "bike-man-2", "bike-man-3", "bike-man-4", "bike-man-5", "bike-man-6", `bike-woman-${color}`][Math.floor(Math.random() * 8)];

    this.bicycles.push({
      position: { x: this.cameraX + (direction === 1 ? -80 : 464) },
      direction,
      color,
      head,
      velocity: direction * (2000 / FRAME_TIME),
      animationFrame: 0,
      animationTimer: time.previous,
      animationDelay: 8,
    });
  }

  updateBicycles(time) {
    for (const bicycle of this.bicycles) {
      bicycle.position.x += bicycle.velocity * time.secondsPassed;

      if (time.previous > bicycle.animationTimer + bicycle.animationDelay * FRAME_TIME) {
        bicycle.animationFrame += 1;
        bicycle.animationTimer = time.previous;
        if (bicycle.animationFrame >= 6) bicycle.animationFrame = 0;
      }
    }

    this.bicycles = this.bicycles.filter((bicycle) => {
      const x = bicycle.position.x - this.cameraX;
      return x >= -128 && x <= 512;
    });

    if (time.previous > this.bicycleSpawner.animationTimer + this.bicycleSpawner.animationDelay * FRAME_TIME) {
      if (this.bicycles.length < 4) this.createBicycle(time);
      this.bicycleSpawner.animationTimer = time.previous;
      this.bicycleSpawner.animationDelay = this.getBicycleDelay() + 1;
    }
  }

  update(time) {
    super.update(time);
    this.family.update(time);
    this.seatedMan.update(time);
    this.butchers.update(time);
    this.cagedBirds.update(time);
    this.farmer.update(time);
    this.washerWoman.update(time);
    this.barberPole.update(time);
    this.sky.update(time);
    this.clouds.update(time);
    this.updateBicycles(time);
  }

  // prettier-ignore
  drawSkyStreet(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y = -32 - Math.floor(camera.position.y);

    this.drawFrame(context, "stage-background", x, y);
    this.clouds.draw(context, x -  32, y + 32);
    this.clouds.draw(context, x +  32, y + 32);
    this.clouds.draw(context, x +  96, y + 32);
    this.clouds.draw(context, x + 160, y + 32);
    this.sky.draw(   context, x + 224, y + 32);
  }

  prepareShopsImage() {
    if (this.shopsImage) return;
    const [sourceX, sourceY, width, height] = this.frames.get("stage-shops");
    this.shopsImage = document.createElement("canvas");
    this.shopsImage.width = width;
    this.shopsImage.height = height;
    const context = this.shopsImage.getContext("2d");
    context.drawImage(this.image, sourceX, sourceY, width, height, 0, 0, width, height);

    context.globalCompositeOperation = "destination-out";
    context.drawImage(this.image, 784, 400, 48, 64, 384, 128, 48, 64);
    context.globalCompositeOperation = "source-over";
  }

  drawShops(context, camera) {
    const x = STAGE_PADDING + 64 - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y = -32 - Math.floor(camera.position.y);
    this.prepareShopsImage();
    context.drawImage(this.shopsImage, x, y);
  }

  // prettier-ignore
  drawSpectators(context, camera) {
    const x = STAGE_PADDING + 64 - Math.floor(camera.position.x) - this.getRowOffset(camera, 40);
    const y = -32 - Math.floor(camera.position.y);

    this.family.draw(      context, x +  56, y + 128);
    this.seatedMan.draw(   context, x + 104, y + 136);
    this.butchers.draw(    context, x + 160, y + 136);
    this.cagedBirds.draw(  context, x + 272, y + 168);
    this.farmer.draw(      context, x + 384, y + 128);
    this.washerWoman.draw( context, x + 512, y + 168);
    this.barberPole.draw(  context, x + 592, y +  88);
  }

  drawSkewedFloor(context, camera) {
    this.floor.draw(context, camera, STAGE_FLOOR - 40);
  }

  // prettier-ignore
  drawBicycles(context, camera) {
    for (const bicycle of this.bicycles) {
      const frame = bicycle.animationFrame;
      const rear = this.bicycleWheels.rear[frame];
      const front = this.bicycleWheels.front[frame];
      const direction = bicycle.direction;
      const x = Math.floor(bicycle.position.x) - Math.floor(camera.position.x) - this.getRowOffset(camera, 25);
      const y = 104 - Math.floor(camera.position.y);

      this.drawFrame(context, "bike-shadow",                        x - 80 * direction, y + 80, direction);
      this.drawFrame(context, `bike-rear-${rear}`,                  x - 64 * direction, y + 56, direction);
      this.drawFrame(context, "bike-mudguard",                      x - 64 * direction, y + 48, direction);
      this.drawFrame(context, `bike-front-${front}`,                x + 16 * direction, y + 56, direction);
      this.drawFrame(context, `bike-${bicycle.color}-${frame + 1}`, x - 32 * direction, y + 40, direction);
      this.drawFrame(context, "bike-torso",                         x - 32 * direction, y + 16, direction);
      this.drawFrame(context, "bike-handlebar",                     x + 16 * direction, y + 31, direction);
      this.drawFrame(context, bicycle.head,                         x - 16 * direction, y,      direction);
    }
  }

  drawBackground(context, camera) {
    this.cameraX = Math.floor(camera.position.x);
    this.drawSkyStreet(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawShops(context, camera);
    this.drawSpectators(context, camera);
    this.drawBicycles(context, camera);
  }

  drawForeground(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const cameraX = Math.floor(camera.position.x);
    const cameraY = Math.floor(camera.position.y);
    this.drawFrame(context, "stage-rock", midPoint - 203 - cameraX - this.getRowOffset(camera, -16), 217 - cameraY);
    this.drawFrame(context, "stage-rock", midPoint + 240 - cameraX - this.getRowOffset(camera, -19), 219 - cameraY);
  }
}
