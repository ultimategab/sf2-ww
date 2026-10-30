import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class KenStage extends Stage {
  decorations = [{ position: { x: 952, y: STAGE_FLOOR }, direction: 1 }];
  decorationBox = { x: 0, y: 0, width: 0, height: 0 };
  breakSound = document.querySelector("audio#break-metal");
  fragmentCount = 12;
  fragmentOrigins = new Map([
    ["barrel-fragment-1", [29, 60]],
    ["barrel-fragment-2", [29, 48]],
  ]);

  // prettier-ignore
  frames = new Map([
    ["stage-background",   [ 72, 208, 768, 176]],
    ["stage-boat",         [  8,  16, 521, 180]],
    ["stage-floor-bottom", [  8, 448, 896,  16]],

    ['grey-suit-1',        [600,  24,  16,  24]],
    ['grey-suit-2',        [600,  88,  16,  24]],

    ['bollard-small',      [800, 184,  21,  16]],
    ['bollard-large',      [760, 176,  31,  24]],

    ['barrels',            [560, 472, 151,  96]],

    ['barrel-fragment-1',  [720, 480,  61,  48]],
    ['barrel-fragment-2',  [793, 480,  61,  48]],
    ['wood-fragment-1',    [864, 480,  14,   9]],
    ['wood-fragment-2',    [888, 480,  16,  16]],
    ['wood-fragment-3',    [864, 496,   4,   4]],
    ['wood-fragment-4',    [888, 504,  11,  13]],
    ['wood-fragment-5',    [864, 512,  15,  16]],
  ]);

  // prettier-ignore
  flag = new BackgroundAnimation(
    this.image,
    [
      ["flag-1",          [848, 312,  40,  32]],
      ["flag-2",          [848, 264,  40,  32]],
      ["flag-3",          [848, 216,  40,  32]],
    ],
    [["flag-1", 133], ["flag-2", 133], ["flag-3", 133]],
  );

  // prettier-ignore
  baldMan = new BackgroundAnimation(
    this.image,
    [
      ["bald-man-1",      [552,   8,  40,  64]],
      ["bald-man-2",      [552,  72,  40,  64]],
      ["bald-man-3",      [552, 136,  40,  64]],
    ],
    [["bald-man-1", 100], ["bald-man-2", 133], ["bald-man-3", 664], ["bald-man-2", 133]],
  );

  // prettier-ignore
  blueCoatGuy = new BackgroundAnimation(
    this.image,
    [
      ["blue-coat-1",     [704,  16,  48,  56]],
      ["blue-coat-2",     [704,  80,  48,  56]],
      ["blue-coat-3",     [704, 144,  48,  56]],
    ],
    [
      ["blue-coat-1", 996], ["blue-coat-2", 133], ["blue-coat-3", 100], ["blue-coat-2", 133],
      ["blue-coat-1", 249], ["blue-coat-2", 133], ["blue-coat-3", 100], ["blue-coat-2", 133],
    ],
  );

  // prettier-ignore
  brownSuitGuy = new BackgroundAnimation(
    this.image,
    [
      ["brown-suit-1",    [760,  16,  40,  40]],
      ["brown-suit-2",    [760,  64,  40,  40]],
      ["brown-suit-3",    [760, 112,  40,  40]],
    ],
    [["brown-suit-1", 133], ["brown-suit-2", 133], ["brown-suit-3", 133], ["brown-suit-2", 133]],
  );

  // prettier-ignore
  cheeringWoman = new BackgroundAnimation(
    this.image,
    [
      ["woman-1",         [624,  16,  32,  56]],
      ["woman-2",         [624,  80,  32,  56]],
      ["woman-3",         [624, 144,  32,  56]],
    ],
    [["woman-1", 216], ["woman-2", 216], ["woman-3", 216], ["woman-2", 216]],
  );

  // prettier-ignore
  greenJumperGuy = new BackgroundAnimation(
    this.image,
    [
      ["green-jumper-1",  [664,  16,  32,  56]],
      ["green-jumper-2",  [664,  80,  32,  56]],
    ],
    [["green-jumper-1", 664], ["green-jumper-2", 498], ["green-jumper-1", 133], ["green-jumper-2", 133]],
  );

  // prettier-ignore
  purpleJumperGuy = new BackgroundAnimation(
    this.image,
    [
      ["purple-jumper-1", [808,  24,  48,  32]],
      ["purple-jumper-2", [808,  72,  48,  32]],
      ["purple-jumper-3", [808, 120,  48,  32]],
    ],
    [
      ["purple-jumper-1", 1992], ["purple-jumper-2", 166], ["purple-jumper-3", 166], ["purple-jumper-2", 166],
      ["purple-jumper-1",  664], ["purple-jumper-2", 166], ["purple-jumper-3", 166], ["purple-jumper-2", 166],
      ["purple-jumper-3",  166], ["purple-jumper-2", 166],
    ],
  );

  greySuitMan = {
    animationFrame: 0,
    animationTimer: 0,
    animationDelay: 0,
  };

  boat = {
    position: { x: 0, y: 0 },
    animationFrame: 0,
    animationTimer: 0,
    animationDelay: 22,
    animation: [0, -1, -2, -3, -4, -3, -2, -1],
  };

  constructor() {
    super("ken", [8, 392, 896, 56]);
  }

  // prettier-ignore
  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    super.setFightOver(fightOver);

    for (const [spectator, celebration] of [
      [this.baldMan, [
        ["bald-man-1", 100], ["bald-man-2", 133], ["bald-man-3", 133], ["bald-man-2", 133],
      ]],
      [this.blueCoatGuy, [
        ["blue-coat-1", 133], ["blue-coat-2", 133], ["blue-coat-3", 100], ["blue-coat-2", 133],
      ]],
      [this.greenJumperGuy, [
        ["green-jumper-1", 133], ["green-jumper-2", 133],
      ]],
      [this.purpleJumperGuy, [
        ["purple-jumper-1", 166], ["purple-jumper-2", 166], ["purple-jumper-3", 166], ["purple-jumper-2", 166],
      ]],
    ]) {
      if (!spectator.normalAnimation) spectator.normalAnimation = spectator.animation;
      spectator.animation = fightOver ? celebration : spectator.normalAnimation;
      spectator.animationFrame = 0;
      spectator.animationTimer = this.animationTimer;
      spectator.frameDelay = spectator.animation[0][1];
    }
  }

  // prettier-ignore
  updateBoat(time) {
    if (time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
      this.boat.animationTimer  = time.previous;
      this.boat.animationFrame += 1;
      this.boat.animationDelay  = 22 +  (Math.random() * 16 - 8);
    }

    if (this.boat.animationFrame >= this.boat.animation.length) this.boat.animationFrame = 0;
  }

  // prettier-ignore
  updateGreySuitMan(time) {
    if (time.previous > this.greySuitMan.animationTimer + this.greySuitMan.animationDelay) {
      this.greySuitMan.animationTimer = time.previous;
      this.greySuitMan.animationFrame = !this.greySuitMan.animationFrame;
      this.greySuitMan.animationDelay = 100 + (Math.random() *   900);
    }
  }

  update(time) {
    super.update(time);
    this.flag.update(time);
    this.updateBoat(time);
    this.baldMan.update(time);
    this.updateGreySuitMan(time);
    this.blueCoatGuy.update(time);
    this.brownSuitGuy.update(time);
    this.cheeringWoman.update(time);
    this.greenJumperGuy.update(time);
    this.purpleJumperGuy.update(time);
  }

  breakDecoration(decoration, time) {
    super.breakDecoration(decoration, time);
    for (const [frameKey, x, y, velocityX, velocityY] of [
      ["barrel-fragment-1", -16, -40, 3, -5.5],
      ["barrel-fragment-2", -16, -40, 2, -4],
      ["barrel-fragment-1", -48, -56, 4, -6.5],
      ["barrel-fragment-2", -48, -16, 3, -5],
    ]) {
      this.addFragment(frameKey,
        { x: decoration.position.x + x, y: decoration.position.y + y },
        { x: velocityX * -decoration.fighter.direction, y: velocityY },
        -decoration.fighter.direction, time);
    }
  }

  // prettier-ignore
  drawSkyOcean(context, camera) {
    const backgroundX = STAGE_PADDING - Math.floor(camera.position.x) - this.getRowOffset(camera, 56);

    this.drawFrame(context, "stage-background", backgroundX      ,     -camera.position.y);
    this.flag.draw(context,                     backgroundX + 560, 16 - camera.position.y);
  }

  // prettier-ignore
  drawBoat(context, camera) {
    this.boat.position = {
      x: STAGE_PADDING + 64 - Math.floor(camera.position.x) - this.getRowOffset(camera, 40),
      y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
    };

    this.drawFrame(           context, "stage-boat",                                        this.boat.position.x,       this.boat.position.y      );
    this.baldMan.draw(        context,                                                      this.boat.position.x + 128, this.boat.position.y +  96);
    this.drawFrame(           context,  `grey-suit-${this.greySuitMan.animationFrame + 1}`, this.boat.position.x + 167, this.boat.position.y + 112);
    this.blueCoatGuy.draw(    context,                                                      this.boat.position.x + 288, this.boat.position.y +  96);
    this.brownSuitGuy.draw(   context,                                                      this.boat.position.x +  88, this.boat.position.y +  24);
    this.cheeringWoman.draw(  context,                                                      this.boat.position.x + 192, this.boat.position.y + 104);
    this.greenJumperGuy.draw( context,                                                      this.boat.position.x + 224, this.boat.position.y + 104);
    this.purpleJumperGuy.draw(context,                                                      this.boat.position.x + 128, this.boat.position.y +  24);
  }

  drawSkewedFloor(context, camera) {
    this.floor.draw(context, camera, STAGE_FLOOR - 40);
    this.drawFrame(context, "stage-floor-bottom", STAGE_PADDING - camera.position.x * 1.1, STAGE_FLOOR + 16 - camera.position.y);
  }

  drawSmallBollards(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const cameraXOffset = Math.floor(camera.position.x) + this.getRowOffset(camera, 36);
    const y = 166 - camera.position.y;

    this.drawFrame(context, "bollard-small", midPoint - 107 - cameraXOffset, y);
    this.drawFrame(context, "bollard-small", midPoint + 77 - cameraXOffset, y);
  }

  drawLargeBollards(context, camera) {
    const midPoint = STAGE_MID_POINT + STAGE_PADDING;
    const cameraXOffset = Math.floor(camera.position.x) + this.getRowOffset(camera, -7);
    const y = 200 - camera.position.y;

    this.drawFrame(context, "bollard-large", midPoint - 168 - cameraXOffset, y);
    this.drawFrame(context, "bollard-large", midPoint + 126 - cameraXOffset, y);
  }

  drawBackground(context, camera) {
    this.drawSkyOcean(context, camera);
    this.drawBoat(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawSmallBollards(context, camera);
    if (this.decorations[0].brokenAt === undefined) {
      this.drawFrame(context, "barrels", Math.floor(872 - camera.position.x), 120 - camera.position.y);
    }
  }

  drawForeground(context, camera) {
    this.drawFragments(context, camera);
    this.drawLargeBollards(context, camera);
  }
}
