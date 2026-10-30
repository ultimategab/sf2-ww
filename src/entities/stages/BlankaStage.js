import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { drawFrame } from "../../utils/context.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class BlankaStage extends Stage {
  // prettier-ignore
  frames = new Map([
    ["stage-sky",        [  8, 264, 512, 160]],
    ["stage-background", [  8,   8, 768, 176]],
    ["stage-tree-house", [528, 264, 480, 208]],
    ["stage-fish",       [968,   8,  48, 128]],
    ["stage-post",       [960, 144,  16,  32]],
  ]);

  // prettier-ignore
  windowCouple = new BackgroundAnimation(
    this.image,
    [
      ["window-couple-1", [880,   8, 32, 24]],
      ["window-couple-2", [920,   8, 32, 24]],
    ],
    [
      ["window-couple-1", 1333], ["window-couple-2", 167],
      ["window-couple-1",  167], ["window-couple-2", 167],
      ["window-couple-1",  167], ["window-couple-2", 167],
    ],
  );

  // prettier-ignore
  windowMan = new BackgroundAnimation(
    this.image,
    [
      ["window-man-1",    [784,   8, 40, 24]],
      ["window-man-2",    [832,   8, 40, 24]],
    ],
    [
      ["window-man-1", 2000], ["window-man-2", 167],
      ["window-man-1",  167], ["window-man-2", 167],
      ["window-man-1",  167], ["window-man-2", 167],
    ],
  );

  // prettier-ignore
  greenShirtMan = new BackgroundAnimation(
    this.image,
    [
      ["green-shirt-1",   [912, 136, 32, 48]],
      ["green-shirt-2",   [920,  80, 32, 48]],
      ["green-shirt-3",   [880,  80, 32, 48]],
    ],
    [
      ["green-shirt-1", 1533], ["green-shirt-2", 200], ["green-shirt-3", 200], ["green-shirt-2", 200],
      ["green-shirt-1",  200], ["green-shirt-2", 200], ["green-shirt-3", 200], ["green-shirt-2", 200],
    ],
  );

  // prettier-ignore
  strawHatMan = new BackgroundAnimation(
    this.image,
    [
      ["straw-hat-1",     [912, 200, 32, 56]],
      ["straw-hat-2",     [952, 200, 32, 56]],
    ],
    [["straw-hat-1", 667], ["straw-hat-2", 200]],
  );

  // prettier-ignore
  blueHatMan = new BackgroundAnimation(
    this.image,
    [
      ["blue-hat-1",      [992, 144, 24, 24]],
      ["blue-hat-2",      [992, 176, 24, 24]],
      ["blue-hat-3",      [992, 208, 24, 24]],
    ],
    [
      ["blue-hat-1", 1000], ["blue-hat-2", 200], ["blue-hat-3", 200],
      ["blue-hat-1",  667], ["blue-hat-2", 200], ["blue-hat-3", 200],
    ],
  );

  // prettier-ignore
  shirtlessManArm = new BackgroundAnimation(
    this.image,
    [
      ["shirtless-arm-1", [904,  40, 24, 32]],
      ["shirtless-arm-2", [936,  40, 24, 32]],
    ],
    [
      ["shirtless-arm-1", 533], ["shirtless-arm-2", 200],
      ["shirtless-arm-1", 200], ["shirtless-arm-2", 200],
    ],
  );

  // prettier-ignore
  child = new BackgroundAnimation(
    this.image,
    [
      ["child-1",         [816,  80, 24, 48]],
      ["child-2",         [784,  80, 24, 48]],
      ["child-3",         [848,  80, 24, 48]],
    ],
    [["child-1", 1333], ["child-2", 200], ["child-3", 200], ["child-2", 200]],
  );

  // prettier-ignore
  whiteShirtMan = new BackgroundAnimation(
    this.image,
    [
      ["white-shirt-1",   [824,  40, 32, 32]],
      ["white-shirt-2",   [864,  40, 32, 32]],
      ["white-shirt-3",   [784,  40, 32, 32]],
    ],
    [["white-shirt-1", 1183], ["white-shirt-2", 200], ["white-shirt-1", 200], ["white-shirt-3", 200]],
  );

  // prettier-ignore
  woman = new BackgroundAnimation(
    this.image,
    [
      ["woman-1",         [824, 136, 32, 48]],
      ["woman-2",         [784, 136, 32, 48]],
      ["woman-3",         [864, 136, 32, 48]],
    ],
    [
      ["woman-1", 1083], ["woman-2", 200], ["woman-1", 200], ["woman-3", 200],
      ["woman-1",  500], ["woman-2", 200], ["woman-1", 200], ["woman-3", 200],
    ],
  );

  sky = {
    position: { x: 448 },
    velocity: 250 / FRAME_TIME,
  };
  
  treeHouseImage = null;

  constructor() {
    super("blanka", [8, 192, 896, 48]);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    super.setFightOver(fightOver);

    for (const [spectator, celebration] of [
      [this.greenShirtMan, [
        ["green-shirt-1", 200], ["green-shirt-2", 200], ["green-shirt-3", 200], ["green-shirt-2", 200],
      ]],
      [this.strawHatMan, [
        ["straw-hat-1", 200], ["straw-hat-2", 200],
      ]],
      [this.blueHatMan, [
        ["blue-hat-1", 200], ["blue-hat-2", 200], ["blue-hat-3", 200],
      ]],
      [this.shirtlessManArm, [
        ["shirtless-arm-1", 200], ["shirtless-arm-2", 200],
      ]],
      [this.child, [
        ["child-1", 200], ["child-2", 200], ["child-3", 200], ["child-2", 200],
      ]],
      [this.whiteShirtMan, [
        ["white-shirt-1", 200], ["white-shirt-2", 200], ["white-shirt-1", 200], ["white-shirt-3", 200],
      ]],
      [this.woman, [
        ["woman-1", 200], ["woman-2", 200], ["woman-1", 200], ["woman-3", 200],
      ]],
    ]) {
      if (!spectator.normalAnimation) spectator.normalAnimation = spectator.animation;
      spectator.animation = fightOver ? celebration : spectator.normalAnimation;
      spectator.animationFrame = 0;
      spectator.animationTimer = this.animationTimer;
      spectator.frameDelay = spectator.animation[0][1];
    }
  }

  updateSky(time) {
    this.sky.position.x = (this.sky.position.x + this.sky.velocity * time.secondsPassed) % 512;
  }

  update(time) {
    super.update(time);
    this.updateSky(time);
    this.windowCouple.update(time);
    this.windowMan.update(time);
    this.greenShirtMan.update(time);
    this.strawHatMan.update(time);
    this.blueHatMan.update(time);
    this.shirtlessManArm.update(time);
    this.child.update(time);
    this.whiteShirtMan.update(time);
    this.woman.update(time);
  }

  drawSky(context, camera) {
    const x = 16 - Math.floor(this.sky.position.x);
    const y = -Math.floor(camera.position.y / 2);

    this.drawFrame(context, "stage-sky", x - 512, y);
    this.drawFrame(context, "stage-sky", x, y);
    this.drawFrame(context, "stage-sky", x + 512, y);
  }

  // prettier-ignore
  drawHousesRiver(context, camera) {
    const x = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 24);
    const y = 16 - Math.floor(camera.position.y);

    this.drawFrame(context, "stage-background", x, y);
    this.windowMan.draw(   context, x + 112, y + 88);
    this.windowCouple.draw(context, x + 272, y + 88);
  }

  prepareTreeHouseImage() {
    if (this.treeHouseImage) return;
    const [sourceX, sourceY, width, height] = this.frames.get("stage-tree-house");
    this.treeHouseImage = document.createElement("canvas");
    this.treeHouseImage.width = width;
    this.treeHouseImage.height = height;
    const context = this.treeHouseImage.getContext("2d");
    context.drawImage(this.image, sourceX, sourceY, width, height, 0, 0, width, height);

    context.globalCompositeOperation = "destination-out";
    drawFrame(context, this.image, this.greenShirtMan.frames.get("green-shirt-1"), 0, 112);
    drawFrame(context, this.image, this.strawHatMan.frames.get("straw-hat-1"), 192, 128);
    drawFrame(context, this.image, this.blueHatMan.frames.get("blue-hat-1"), 248, 144);
    drawFrame(context, this.image, this.shirtlessManArm.frames.get("shirtless-arm-1"), 289, 128);
    drawFrame(context, this.image, this.whiteShirtMan.frames.get("white-shirt-1"), 320, 128);
    drawFrame(context, this.image, this.child.frames.get("child-2"), 328, 159);
    context.globalCompositeOperation = "source-over";
  }

  drawTreeHouse(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const x = midPoint - 96 - Math.floor(camera.position.x) - this.getRowOffset(camera, 24);
    const y = -Math.floor(camera.position.y);
    this.prepareTreeHouseImage();
    context.drawImage(this.treeHouseImage, x, y);
  }

  // prettier-ignore
  drawSpectators(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const x = midPoint - 96 - Math.floor(camera.position.x) - this.getRowOffset(camera, 24);
    const y = -Math.floor(camera.position.y);

    this.greenShirtMan.draw(  context, x,       y + 112);
    this.strawHatMan.draw(    context, x + 192, y + 128);
    this.blueHatMan.draw(     context, x + 248, y + 144);
    this.shirtlessManArm.draw(context, x + 289, y + 128);
    this.whiteShirtMan.draw(  context, x + 320, y + 128);
    this.child.draw(          context, x + 328, y + 159);
    this.woman.draw(          context, x + 352, y + 142);
  }

  drawSkewedFloor(context, camera) {
    const floorCamera = {
      position: {
        x: STAGE_SCROLL_CENTER_X - 0.8 + (camera.position.x - STAGE_SCROLL_CENTER_X) / 0.859447,
        y: camera.position.y,
      },
    };

    this.floor.draw(context, floorCamera, STAGE_FLOOR - 24);
  }

  drawHangingFish(context, camera) {
    const x = 948 - Math.floor(camera.position.x) - this.getRowOffset(camera, 24);
    const y = 41 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-fish", x, y);
  }

  drawBackPosts(context, camera) {
    const x = Math.floor(camera.position.x) + this.getRowOffset(camera, 21);
    const y = 164 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-post", 520 - x, y);
    this.drawFrame(context, "stage-post", 704 - x, y);
  }

  drawBackground(context, camera) {
    this.drawSky(context, camera);
    this.drawHousesRiver(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawTreeHouse(context, camera);
    this.drawSpectators(context, camera);
    this.drawHangingFish(context, camera);
    this.drawBackPosts(context, camera);
  }

  drawForeground(context, camera) {
    const x = Math.floor(camera.position.x) + this.getRowOffset(camera, -19);
    const y = 212 - Math.floor(camera.position.y);
    this.drawFrame(context, "stage-post", 376 - x, y);
    this.drawFrame(context, "stage-post", 920 - x, y);
  }
}
