import { STAGE_FLOOR } from "../../../constants/stage.js";
import { AirborneStates, FighterShadows, ShadowFrames, StageShadowColors } from "../../../constants/fighter.js";

export class Shadow {
  constructor(fighter, stageName) {
    this.fighter = fighter;
    this.profile = FighterShadows[fighter.constructor.name];
    this.color = StageShadowColors[stageName];

    this.frames = new Map([
      ["GROUND", this.profile.GROUND],
      ["AIR", this.profile.AIR],
      ...ShadowFrames,
    ]);

    this.prepareImage();
  }

  prepareImage() {
    const image = document.querySelector("img[alt='shadows']");
    this.image = document.createElement("canvas");
    this.image.width = image.naturalWidth;
    this.image.height = image.naturalHeight;

    const context = this.image.getContext("2d");
    context.drawImage(image, 0, 0);
    context.globalCompositeOperation = "source-in";
    context.fillStyle = this.color;
    context.fillRect(0, 0, this.image.width, this.image.height);
    context.globalCompositeOperation = "source-over";
  }

  getFrameKey() {
    const [frameKey] = this.fighter.animations[this.fighter.currentState][this.fighter.animationFrame];
    const [[, , shadow]] = this.fighter.frames.get(frameKey);

    return shadow ?? (AirborneStates.includes(this.fighter.currentState) ? "AIR" : "GROUND");
  }

  update = () => {};

  draw(context, camera) {
    const frameKey = this.getFrameKey();
    if (frameKey === 0) return;

    const [[x, y, width, height], [originX, originY]] = this.frames.get(frameKey);

    context.save();
    context.translate(
      Math.floor(this.fighter.position.x - camera.position.x),
      Math.floor(STAGE_FLOOR - camera.position.y),
    );
    context.scale(this.fighter.direction, 1);
    context.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      -originX,
      -originY,
      width,
      height,
    );
    context.restore();
  }
}
