import { FRAME_TIME } from "../constants/game.js";
import { IntroDelay, IntroTeethVelocity, TitleDelay } from "../constants/title.js";
import * as control from "../engine/InputHandler.js";
import { playSound, stopSound } from "../engine/soundHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame, drawText } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { TitleScene } from "./TitleScene.js";

export class IntroScene {
  startedAt = undefined;
  framesElapsed = 0;
  creditFrame = undefined;
  impactPlayed = false;
  miscFrames = new MiscFrames();

  frames = new Map([
    ["sky-1",           [  1,   1, 384, 384]],
    ["city-1",          [386,   1, 384, 512]],
    ["crowd-1",         [386, 514, 128,  79]],
    ["crowd-2",         [515, 514, 128,  79]],
    ["scott-idle-1",    [208, 396, 118,  94]],
    ["max-idle-1",      [ 56, 396, 131,  85]],
    ["windup-1",        [ 56, 491, 281, 132]],
    ["scott-punch-1",   [143, 672, 222,  96]],
    ["max-fall-body-1", [ 81, 624,  61,  72]],
    ["max-fall-body-2", [ 49, 696,  93,  72]],
    ["max-fall-head-1", [ 10, 642,  71,  54]],
    ["impact-1",        [386, 594,  46,  36]],
    ["teeth-1",         [450, 594,   5,   2]],
    ["teeth-2",         [450, 604,   3,   3]],
    ["teeth-3",         [450, 615,   2,   4]],
  ]);

  constructor(changeScene) {
    this.changeScene = changeScene;
    this.image = document.querySelector("img[alt='intro']");
    this.titleImage = document.querySelector("img[alt='title']");
    this.miscImage = document.querySelector("img[alt='game-text-fonts-and-health-bars']");
    this.music = document.querySelector("audio#intro");
    this.impactSound = document.querySelector("audio#heavy-punch-hit");
    playSound(this.music, 0.35);
  }

  update(time) {
    if (gameState.credits > 0) {
      if (this.startedAt === undefined) this.startedAt = time.previous - this.music.currentTime * 1000;
      this.framesElapsed = Math.floor((time.previous - this.startedAt) / FRAME_TIME);
      this.creditFrame = this.framesElapsed;

      stopSound(this.music);
      stopSound(this.impactSound);
      this.changeScene(TitleScene, this);
      return;
    }

    if (this.startedAt === undefined) {
      if (this.music.currentTime === 0) return;
      this.startedAt = time.previous - this.music.currentTime * 1000;
    }
    this.framesElapsed = Math.floor((time.previous - this.startedAt) / FRAME_TIME);

    for (let fighterId = 0; fighterId < 2; fighterId++) {
      while (control.isLightPunch(fighterId)) {}
      while (control.isLightKick(fighterId))  {}
    }

    if (!this.impactPlayed && this.framesElapsed >= IntroDelay.IMPACT) {
      this.impactPlayed = true;
      if (this.framesElapsed < IntroDelay.IMPACT + IntroDelay.IMPACT_FLASH) playSound(this.impactSound);
    }

    if (this.framesElapsed < IntroDelay.SCROLL_END + IntroDelay.BACKGROUND_FADE) return;

    this.changeScene(TitleScene, this);
  }

  drawFrame(context, frameKey, x, y) {
    drawFrame(context, this.image, this.frames.get(frameKey), x, y);
  }

  drawBackground(context, frame, scrollOffset) {
    this.drawFrame(context, "sky-1", 0, -144 + Math.floor(scrollOffset / 2));
    this.drawFrame(context, "city-1", 0, -272 + scrollOffset);

    if (frame < IntroDelay.SCROLL_END) return;

    const backgroundBrightness = Math.max(0, 15 - Math.floor((frame - IntroDelay.SCROLL_END) / 3));

    this.drawFade(context, 1 - (15 + 2 * backgroundBrightness) / 45);
  }

  drawCrowd(context, frame, scrollOffset) {
    const frameKey = Math.floor((frame + 1) / IntroDelay.CROWD_FRAME) % 3 === 1 ? "crowd-2" : "crowd-1";

    for (let x = 0; x < 384; x += 128) this.drawFrame(context, frameKey, x, 145 + scrollOffset);
  }

  drawFighters(context, frame, scrollOffset) {
    if (frame < IntroDelay.WINDUP) {
      const scottBob = frame === 0 ? 0 : ((IntroDelay.WINDUP - frame) & 16) >> 3;
      const maxBob = frame === 0 ? 0 : ((IntroDelay.WINDUP - frame) & 32) >> 4;

      this.drawFrame(context, "max-idle-1", 49, 143 - maxBob);
      this.drawFrame(context, "scott-idle-1", 217, 134 - scottBob);
      return;
    }

    if (frame < IntroDelay.IMPACT) {
      this.drawFrame(context, "windup-1", 61, 96);
      return;
    }

    const hitTime = frame - IntroDelay.IMPACT;
    const fallTime = Math.max(0, hitTime - IntroDelay.HIT_STOP);
    const toothFrame = Math.min(3, Math.floor(hitTime % 20 / 6) + 1);
    const toothOriginX = toothFrame === 1 ? 2 : 1;
    const toothOriginY = toothFrame === 3 ? 9 : 10;

    this.drawFrame(context, "scott-punch-1", 64, 128 + scrollOffset);
    this.drawFrame(context, "max-fall-body-1", 75 - 2 * fallTime, 80 + fallTime + scrollOffset);
    this.drawFrame(context, "max-fall-body-2", 43 - 2 * fallTime, 152 + fallTime + scrollOffset);

    for (const [velocityX, velocityY] of IntroTeethVelocity) {
      this.drawFrame(context, `teeth-${toothFrame}`,
        Math.floor(48 - velocityX * hitTime) - toothOriginX,
        176 + Math.ceil(-velocityY * hitTime + hitTime * (hitTime - 1) / 8) - toothOriginY + scrollOffset,
      );
    }

    this.drawFrame(context, "max-fall-head-1", 25 - 2 * fallTime, 122 + fallTime + scrollOffset);

    if (hitTime < IntroDelay.IMPACT_FLASH) this.drawFrame(context, "impact-1", 40, 124 + scrollOffset);
  }

  drawFade(context, opacity) {
    if (opacity === 0) return;

    context.save();
    context.globalAlpha = opacity;
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    if (this.startedAt === undefined) return;

    const frame = this.creditFrame ?? this.framesElapsed;
    const scrollOffset = Math.max(0, Math.min(256, frame - IntroDelay.SCROLL_START + 1));
    const brightness = Math.max(0, Math.min(15, Math.floor(frame / 3)));

    this.drawBackground(context, frame, scrollOffset);
    this.drawCrowd(context, frame, scrollOffset);
    this.drawFighters(context, frame, scrollOffset);
    drawFrame(context, this.titleImage, [1, 1, 135, 61], 120, scrollOffset - 211);

    if (Math.floor(frame / TitleDelay.INSERT_COIN) % 2 === 0) {
      drawText(context, this.miscImage, this.miscFrames, "INSERT COIN.", 144, 168);
    }

    this.drawFade(context, (30 - 2 * brightness) / 45);
  }
}
