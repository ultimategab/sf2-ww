import { FRAME_TIME } from "../constants/game.js";
import { SelfTestChecks, SelfTestDelay, VersionText, WarningDelay } from "../constants/title.js";
import { drawFrame } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { WarningScene } from "./WarningScene.js";

export class SelfTestScene {
  startedAt = undefined;
  framesElapsed = 0;
  frames = new MiscFrames();

  constructor(changeScene) {
    this.changeScene = changeScene;
    this.image = document.querySelector("img[alt='game-text-fonts']");
    this.fadeOutFrame = SelfTestDelay.VERSION + SelfTestDelay.VERSION_HOLD;
  }

  update(time) {
    if (this.startedAt === undefined) this.startedAt = time.previous;
    this.framesElapsed = Math.floor((time.previous - this.startedAt) / FRAME_TIME);

    if (this.framesElapsed < this.fadeOutFrame + WarningDelay.FADE_OUT + SelfTestDelay.BLACK) return;

    this.changeScene(WarningScene);
  }

  drawText(context, text, x, y, font = "self-test") {
    for (let letter = 0; letter < text.length; letter++) {
      drawFrame(context, this.image, this.frames.get(`${font}-${text.charAt(letter)}`), x + letter * 8, y);
    }
  }

  drawTests(context) {
    if (this.framesElapsed >= SelfTestDelay.FINISH + SelfTestDelay.FADE_OUT) return;

    for (let line = 0; line < SelfTestChecks.length; line++) {
      const [text, startFrame, finishFrame] = SelfTestChecks[line];

      if (this.framesElapsed < startFrame) continue;

      this.drawText(context, text, 136, 80 + line * 8);

      if (this.framesElapsed >= finishFrame) this.drawText(context, "RAM OK", 192, 80 + line * 8);
    }

    context.globalAlpha = Math.max(0, this.framesElapsed - SelfTestDelay.FINISH) / SelfTestDelay.FADE_OUT;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }

  drawVersion(context) {
    const versionFrame = this.framesElapsed - SelfTestDelay.VERSION;

    if (versionFrame < 0 || this.framesElapsed >= this.fadeOutFrame + WarningDelay.FADE_OUT) return;

    for (let line = 0; line < VersionText.length; line++) {
      this.drawText(context, VersionText[line], 80, 88 + line * 16, "version");
    }

    context.globalAlpha = this.framesElapsed < this.fadeOutFrame
      ? (15 - Math.min(15, Math.floor(versionFrame / 5))) * 2 / 45
      : Math.min(15, Math.floor((this.framesElapsed - this.fadeOutFrame) / 3)) * 2 / 45;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    this.drawTests(context);
    this.drawVersion(context);
    context.restore();
  }
}
