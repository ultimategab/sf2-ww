import { FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, STAGE_ROW_SCROLL_STEP, STAGE_SCROLL_CENTER_X } from "../../constants/stage.js";
import { Stage } from "./Stage.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class GuileStage extends Stage {
  decorations = [
    { position: { x: 352, y: STAGE_FLOOR }, direction: 1 },
    { position: { x: 928, y: STAGE_FLOOR }, direction: -1 },
  ];
  decorationBox = { x: -47, y: -71, width: 88, height: 70 };
  breakSound = document.querySelector("audio#break-wood");
  fragmentCount = 20;

  // prettier-ignore
  frames = new Map([
    ["stage-sky",          [  8,   8, 1024,  56]],
    ["stage-background",   [  8, 256,  768, 224]],
    ["stage-plane",        [264,  72,  640, 112]],
    ["plane-tail",         [936, 271,   87,  65]],
    ["plane-canopy",       [921, 348,   99,  12]],
    ["stage-apron",        [  8, 184, 1024,  16]],

    ["stage-fence",        [  8, 488,  208, 120]],
    ["stage-crate",        [784, 256,   96,  80]],
    ["stage-crate-break",  [784, 345,   96,  79]],
    ["stage-crate-broken", [784, 432,   96,  48]],

    ["wood-fragment-1",    [888, 420,   16,   9]],
    ["wood-fragment-2",    [888, 392,   16,  16]],
    ["wood-fragment-3",    [888, 480,    4,   4]],
    ["wood-fragment-4",    [890, 441,   11,  13]],
    ["wood-fragment-5",    [889, 464,   15,  16]],

    ["couple-skirt",       [224, 544,   48,  24]],
    ["couple-man-legs",    [336, 552,   24,  64]],
    ["seated-leg-cooler",  [360, 568,   32,  40]],
    ["blond-man",          [480, 536,   48,  80]],
    ["standing-man",       [592, 520,   40,  96]],

    ["drink-can",          [576, 488,   24,  16]],
    ["radio",              [608, 488,   32,  16]],
  ]);

  // prettier-ignore
  piggybackCouple = new BackgroundAnimation(
    this.image,
    [
      ["couple-1",         [224, 488,  48,  48]],
      ["couple-2",         [280, 488,  48,  48]],
      ["couple-3",         [336, 480,  48,  64]],
    ],
    [
      ["couple-1", 133], ["couple-2", 133], ["couple-3", 133], ["couple-2", 133], ["couple-3", 133], ["couple-2", 133],
      ["couple-3", 133], ["couple-2", 266], ["couple-1", 266], ["couple-2", 266], ["couple-3", 266], ["couple-2", 266],
    ],
  );

  // prettier-ignore
  piggybackLegs = new BackgroundAnimation(
    this.image,
    [
      ["couple-legs-1",    [224, 568,  48,  48]],
      ["couple-legs-2",    [280, 568,  48,  48]],
    ],
    [["couple-legs-1", 266], ["couple-legs-2", 266]],
  );

  // prettier-ignore
  seatedMan = new BackgroundAnimation(
    this.image,
    [
      ["seated-man-1",     [400, 536,  32,  80]],
      ["seated-man-2",     [440, 536,  32,  80]],
    ],
    [["seated-man-1", 400], ["seated-man-2", 400]],
  );

  // prettier-ignore
  seatedManArm = new BackgroundAnimation(
    this.image,
    [
      ["seated-arm-1",     [391, 488,  25,  40]],
      ["seated-arm-2",     [423, 488,  25,  40]],
      ["seated-arm-3",     [455, 488,  25,  40]],
    ],
    [
      ["seated-arm-1", 166], ["seated-arm-2", 166], ["seated-arm-3", 166],
      ["seated-arm-2", 166], ["seated-arm-3", 166], ["seated-arm-2", 166],
      ["seated-arm-3", 166], ["seated-arm-2", 166],
    ],
  );

  // prettier-ignore
  blondManLeg = new BackgroundAnimation(
    this.image,
    [
      ["blond-leg-1",      [528, 552,  32,  64]],
      ["blond-leg-2",      [560, 552,  32,  64]],
    ],
    [["blond-leg-1", 266], ["blond-leg-2", 266]],
    1,
  );

  // prettier-ignore
  standingManArm = new BackgroundAnimation(
    this.image,
    [
      ["standing-arm-1",   [640, 528,  24,  24]],
      ["standing-arm-2",   [640, 552,  24,  24]],
      ["standing-arm-3",   [640, 576,  24,  24]],
    ],
    [["standing-arm-1", 133], ["standing-arm-2", 133], ["standing-arm-3", 133], ["standing-arm-2", 133]],
  );

  // prettier-ignore
  dancingWoman = new BackgroundAnimation(
    this.image,
    [
      ["dancing-woman-1",  [488, 488,  24,  40]],
      ["dancing-woman-2",  [520, 488,  24,  40]],
      ["dancing-woman-3",  [552, 480,  24,  48]],
    ],
    [
      ["dancing-woman-1", 200], ["dancing-woman-2", 200], ["dancing-woman-3", 200],
      ["dancing-woman-2", 200], ["dancing-woman-3", 200], ["dancing-woman-2", 200],
    ],
  );

  // prettier-ignore
  dancingWomanLegs = new BackgroundAnimation(
    this.image,
    [
      ["dancing-legs-1",   [672, 512,  32,  48]],
      ["dancing-legs-2",   [672, 568,  32,  48]],
    ],
    [["dancing-legs-1", 200], ["dancing-legs-2", 200]],
  );

  constructor() {
    super("guile", [72, 200, 896, 48]);
    this.piggybackCouple.position = { y: 102 };
    this.dancingWoman.position = { y: 122 };
  }

  // prettier-ignore
  updatePiggybackCouple(time) {
    this.piggybackCouple.update(time);
    const [frameKey] = this.piggybackCouple.animation[this.piggybackCouple.animationFrame];
    this.piggybackCouple.position.y = frameKey === "couple-3" ? 86 : 102;
  }

  // prettier-ignore
  updateDancingWoman(time) {
    this.dancingWoman.update(time);
    const [frameKey] = this.dancingWoman.animation[this.dancingWoman.animationFrame];
    this.dancingWoman.position.y = frameKey === "dancing-woman-3" ? 114 : 122;
  }

  update(time) {
    super.update(time);
    this.updatePiggybackCouple(time);
    this.piggybackLegs.update(time);
    this.seatedMan.update(time);
    this.seatedManArm.update(time);
    this.blondManLeg.update(time);
    this.standingManArm.update(time);
    this.updateDancingWoman(time);
    this.dancingWomanLegs.update(time);
  }

  // prettier-ignore
  drawSkyAirfield(context, camera) {
    const backgroundX = STAGE_PADDING - 1 - Math.floor(camera.position.x) - this.getRowOffset(camera, 42);
    const cameraXOffset = Math.floor(camera.position.x) - STAGE_SCROLL_CENTER_X;

    this.drawFrame(context, "stage-background", backgroundX, -32 - camera.position.y);

    context.save();
    context.setTransform(1, 0, -cameraXOffset * STAGE_ROW_SCROLL_STEP, -1, -320 - cameraXOffset * (1 - 18 * STAGE_ROW_SCROLL_STEP), 56 - camera.position.y);
    this.drawFrame(context, "stage-sky", 0, 0);
    context.restore();
  }

  drawSkewedFloor(context, camera) {
    context.save();
    context.fillStyle = "#ffb9a6";
    context.fillRect(0, STAGE_FLOOR - 24 - camera.position.y, context.canvas.width, context.canvas.height);
    context.restore();

    const floorCamera = {
      position: {
        x: STAGE_SCROLL_CENTER_X - 0.8 + (camera.position.x - STAGE_SCROLL_CENTER_X) / 0.859447,
        y: camera.position.y,
      },
    };

    this.floor.draw(context, floorCamera, STAGE_FLOOR - 24);
  }

  // prettier-ignore
  drawPlane(context, camera) {
    const planeX = STAGE_MID_POINT - 1 - Math.floor(camera.position.x) - this.getRowOffset(camera, 26);

    this.drawFrame(context, "stage-apron",  planeX - 256, STAGE_FLOOR - 40 - camera.position.y);
    this.drawFrame(context, "plane-tail",   planeX + 422,   6 - camera.position.y);
    this.drawFrame(context, "stage-plane",  planeX      ,  64 - camera.position.y);
    this.drawFrame(context, "plane-canopy", planeX + 153,  57 - camera.position.y);
  }

  // prettier-ignore
  drawSpectators(context, camera) {
    const spectatorsX = STAGE_PADDING - 162 - Math.floor(camera.position.x) - this.getRowOffset(camera, 8);
    const coupleY = this.piggybackCouple.position.y;
    const womanY = this.dancingWoman.position.y;

    this.drawFrame(            context, "couple-man-legs",   spectatorsX + 401, -camera.position.y + 150    );
    this.piggybackLegs.draw(   context,                      spectatorsX + 353, -camera.position.y + 166    );
    this.drawFrame(            context, "couple-skirt",      spectatorsX + 353, -camera.position.y + 150    );
    this.piggybackCouple.draw( context,                      spectatorsX + 361, -camera.position.y + coupleY);

    this.seatedMan.draw(       context,                      spectatorsX + 481, -camera.position.y + 126    );
    this.drawFrame(            context, "seated-leg-cooler", spectatorsX + 449, -camera.position.y + 166    );
    this.seatedManArm.draw(    context,                      spectatorsX + 456, -camera.position.y + 127    );

    this.blondManLeg.draw(     context,                      spectatorsX + 553, -camera.position.y + 144    );
    this.drawFrame(            context, "blond-man",         spectatorsX + 513, -camera.position.y + 128    );

    this.drawFrame(            context, "standing-man",      spectatorsX + 606, -camera.position.y + 112    );
    this.dancingWomanLegs.draw(context,                      spectatorsX + 638, -camera.position.y + 160    );
    this.dancingWoman.draw(    context,                      spectatorsX + 646, -camera.position.y + womanY );
    this.standingManArm.draw(  context,                      spectatorsX + 614, -camera.position.y + 144    );

    this.drawFrame(            context, "drink-can",         spectatorsX + 586, -camera.position.y + 197    );
    this.drawFrame(            context, "radio",             spectatorsX + 673, -camera.position.y + 192    );
  }

  // prettier-ignore
  drawFence(context, camera) {
    const fenceX = STAGE_PADDING - 62 - Math.floor(camera.position.x) - this.getRowOffset(camera, 8);

    this.drawFrame(context, "stage-fence", fenceX, 86 - camera.position.y);
  }

  // prettier-ignore
  drawCrates(context, camera) {
    for (const crate of this.decorations) {
      let frameKey = "stage-crate";
      let height = 80;
      if (crate.brokenAt !== undefined) {
        frameKey = this.animationTimer < crate.brokenAt + 8 * FRAME_TIME ? "stage-crate-break" : "stage-crate-broken";
        height = frameKey === "stage-crate-break" ? 79 : 48;
      }
      this.drawFrame(context, frameKey,
        Math.floor(crate.position.x - 48 * crate.direction - camera.position.x),
        crate.position.y - height - camera.position.y, crate.direction);
    }
  }

  drawBackground(context, camera) {
    this.drawSkyAirfield(context, camera);
    this.drawSkewedFloor(context, camera);
    this.drawPlane(context, camera);
    this.drawSpectators(context, camera);
    this.drawFence(context, camera);
    this.drawCrates(context, camera);
  }
}
