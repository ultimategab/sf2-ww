import { FRAME_TIME } from "../constants/game.js";
import { Control } from "../constants/control.js";
import { WarningDelay, WarningText } from "../constants/title.js";
import * as control from "../engine/InputHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { IntroScene } from "./IntroScene.js";
import { TitleScene } from "./TitleScene.js";

export class WarningScene {
  startedAt = undefined;
  framesElapsed = 0;
  nextFrame = 0;
  impatient = false;
  frames = new MiscFrames();

  constructor(changeScene) {
    this.changeScene = changeScene;
    this.image = document.querySelector("img[alt='game-text-fonts']");
    this.fadeOutFrame = WarningText.join("").length * WarningDelay.CHARACTER + WarningDelay.DISPLAY;
  }

  update(time) {
    if (this.startedAt === undefined) this.startedAt = time.previous;
    const frame = Math.floor((time.previous - this.startedAt) / FRAME_TIME);
    let attackHeld = false;

    for (let fighterId = 0; fighterId < 2; fighterId++) {
      for (const attack of [
        Control.LIGHT_PUNCH, Control.MEDIUM_PUNCH, Control.HEAVY_PUNCH,
        Control.LIGHT_KICK, Control.MEDIUM_KICK, Control.HEAVY_KICK,
      ]) {
        if (control.isControlDown(fighterId, attack)) attackHeld = true;
        while (control.isControlPressed(fighterId, attack)) {}
      }
    }

    if (this.framesElapsed < this.fadeOutFrame && attackHeld) this.impatient = true;

    const textEndFrame = this.fadeOutFrame - WarningDelay.DISPLAY;

    while (this.nextFrame < frame) {
      if (this.framesElapsed >= this.fadeOutFrame) this.framesElapsed++;
      else {
        const boundary = this.framesElapsed < textEndFrame ? textEndFrame : this.fadeOutFrame;
        let advance = 1;

        if (this.impatient) {
          advance = this.framesElapsed < WarningDelay.FAST_FADE_IN_END
            ? WarningDelay.FAST_FADE_IN : WarningDelay.FAST;
        }

        this.framesElapsed = Math.min(boundary, this.framesElapsed + advance);

        if (this.framesElapsed === boundary) {
          this.impatient = attackHeld && this.framesElapsed < this.fadeOutFrame;
        }
      }

      this.nextFrame++;
    }

    if (this.framesElapsed < this.fadeOutFrame + WarningDelay.FADE_OUT + WarningDelay.BLACK) return;

    this.changeScene(gameState.credits > 0 ? TitleScene : IntroScene);
  }

  drawText(context) {
    let lettersRemaining = Math.floor(this.framesElapsed / WarningDelay.CHARACTER) + 1;

    for (let line = 0; line < WarningText.length && lettersRemaining > 0; line++) {
      for (let letter = 0; letter < Math.min(lettersRemaining, WarningText[line].length); letter++) {
        drawFrame(context, this.image, this.frames.get(`warning-${WarningText[line].charAt(letter)}`), 16 + letter * 8, 40 + line * 16);
      }

      lettersRemaining -= WarningText[line].length;
    }
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    if (this.framesElapsed >= this.fadeOutFrame + WarningDelay.FADE_OUT) return;

    this.drawText(context);

    if (this.framesElapsed >= WarningDelay.FADE_IN && this.framesElapsed < this.fadeOutFrame) return;

    context.save();
    context.globalAlpha = this.framesElapsed < WarningDelay.FADE_IN
      ? (15 - Math.min(15, Math.floor(this.framesElapsed / 5))) * 2 / 45
      : Math.min(15, Math.floor((this.framesElapsed - this.fadeOutFrame) / 3)) * 2 / 45;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }
}
