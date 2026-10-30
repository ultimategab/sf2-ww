import { FRAME_TIME } from "../constants/game.js";
import { IntroDelay, TitleDelay, TitleSubtitleOffsets } from "../constants/title.js";
import * as control from "../engine/InputHandler.js";
import { stopSound } from "../engine/soundHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame, drawText } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { PlayerSelectScene } from "./PlayerSelectScene.js";

export class TitleScene {
  startedAt = undefined;
  startFrame = undefined;
  creditFrame = undefined;
  creditsAtStart = undefined;
  framesElapsed = 0;
  titleStartFrame = 0;
  promptTime = 0;
  startedFighters = [false, false];
  miscFrames = new MiscFrames();

  frames = new Map([
    ["logo-large",        [[   1,  334,  288,  111], [  0,   0]]],
    ["the-world-warrior", [[  24,  465,  241,   12], [  0,   0]]],
    ["logo-small",        [[   1,    1,  135,   61], [  0,   9]]],
    ["copyright",         [[  86,  497,  118,    8], [  0,   0]]],

    ["logo-1",            [[   1,    1,  135,   61], [120,  46]]],
    ["logo-2",            [[ 156,    1,  136,   92], [120,  30]]],
    ["logo-3",            [[ 312,    1,  123,  127], [124,  14]]],
    ["logo-4",            [[ 455,    1,  104,  145], [137,   6]]],
    ["logo-5",            [[ 579,    1,   80,  142], [152,   9]]],
    ["logo-6",            [[ 679,    1,  112,  151], [135,   2]]],
    ["logo-7",            [[ 811,    1,  129,  139], [127,   7]]],
    ["logo-8",            [[ 960,    1,  147,  118], [118,  21]]],
    ["logo-9",            [[   1,  172,  144,   80], [120,  45]]],
    ["logo-10",           [[ 165,  172,  153,  112], [118,  29]]],
    ["logo-11",           [[ 338,  172,  140,  128], [127,  22]]],
    ["logo-12",           [[ 498,  172,  118,  133], [135,  22]]],
    ["logo-13",           [[ 636,  172,   80,  142], [152,  16]]],
    ["logo-14",           [[ 736,  172,  106,  138], [135,  23]]],
    ["logo-15",           [[ 862,  172,  118,  121], [127,  32]]],
    ["logo-16",           [[1000,  172,  128,   93], [125,  46]]],
    ["logo-17",           [[   1,  334,  288,  111], [ 48,  32]]],
    ["logo-18",           [[ 309,  334,  283,  177], [ 54,   0]]],
    ["logo-19",           [[ 612,  334,  251,  213], [ 66,   0]]],
    ["logo-20",           [[ 883,  334,  181,  224], [ 99,   0]]],
    ["logo-21",           [[   1,  578,  112,  222], [136,   0]]],
    ["logo-22",           [[ 133,  578,  196,  218], [ 87,   0]]],
    ["logo-23",           [[ 349,  578,  252,  213], [ 54,   0]]],
    ["logo-24",           [[ 621,  578,  292,  179], [ 39,   0]]],
    ["logo-25",           [[   1,  820,  288,  112], [ 48,  32]]],
    ["logo-26",           [[ 309,  820,  292,  179], [ 45,   0]]],
    ["logo-27",           [[ 621,  820,  252,  202], [ 65,   0]]],
    ["logo-28",           [[ 893,  820,  190,  219], [ 99,   0]]],
    ["logo-29",           [[   1, 1059,  112,  222], [136,   0]]],
    ["logo-30",           [[ 133, 1059,  181,  224], [102,   0]]],
    ["logo-31",           [[ 334, 1059,  240,  212], [ 79,   0]]],
    ["logo-32",           [[ 594, 1059,  276,  181], [ 58,   3]]],
  ]);

  constructor(changeScene, intro) {
    this.changeScene = changeScene;
    this.image = document.querySelector("img[alt='title']");
    this.miscImage = document.querySelector("img[alt='game-text-fonts-and-health-bars']");
    this.misc2Image = document.querySelector("img[alt='game-text-fonts']");
    this.music = document.querySelector("audio#intro");

    if (intro) {
      this.startedAt = intro.startedAt;
      this.titleStartFrame = intro.creditFrame ?? IntroDelay.SCROLL_END;
      this.framesElapsed = intro.framesElapsed - this.titleStartFrame;
      this.promptTime = intro.framesElapsed;
      if (intro.creditFrame !== undefined) this.creditFrame = 0;
    } else if (gameState.credits > 0) this.creditFrame = 0;
  }

  startFighter(fighterId) {
    if (this.startFrame !== undefined || this.creditFrame === undefined) return;
    if (gameState.credits < fighterId + 1) return;

    this.creditsAtStart = gameState.credits;
    this.startedFighters = [true, fighterId === 1];
    gameState.credits -= fighterId + 1;
    this.startFrame = this.framesElapsed;
    stopSound(this.music);
  }

  update(time) {
    if (this.startedAt === undefined) this.startedAt = time.previous;

    this.promptTime = Math.floor((time.previous - this.startedAt) / FRAME_TIME);
    this.framesElapsed = this.promptTime - this.titleStartFrame;

    if (this.creditFrame === undefined && gameState.credits > 0) {
      this.creditFrame = this.framesElapsed;
    }

    for (let fighterId = 1; fighterId >= 0; fighterId--) {
      while (control.isStart(fighterId)) this.startFighter(fighterId);
    }

    if (this.startFrame === undefined || this.framesElapsed < this.startFrame + TitleDelay.FADE_OUT + TitleDelay.BLACK) return;

    this.changeScene(PlayerSelectScene, this.startedFighters);
  }

  drawFrame(context, frameKey, x, y) {
    const [dimensions, [offsetX, offsetY]] = this.frames.get(frameKey);
    drawFrame(context, this.image, dimensions, x + offsetX, y + offsetY);
  }

  drawLogo(context) {
    if (this.creditFrame !== undefined) {
      this.drawFrame(context, "logo-large", 48, 32);
      this.drawFrame(context, "the-world-warrior", 64, 146);
      this.drawFrame(context, "copyright", 128, 192);

      return;
    }

    if (this.framesElapsed < TitleDelay.LOGO_HOLD) {
      this.drawFrame(context, "logo-small", 120, 36);
    } else if (this.framesElapsed < TitleDelay.LOGO_HOLD + TitleDelay.LOGO_SPIN) {
      this.drawFrame(context, `logo-${this.framesElapsed - TitleDelay.LOGO_HOLD + 1}`, 0, 0);
    } else {
      this.drawFrame(context, "logo-large", 48, 32);
    }

    const subtitleFrame = this.framesElapsed - TitleDelay.LOGO_HOLD - TitleDelay.SUBTITLE_START;

    if (subtitleFrame < 0) return;

    this.drawFrame(context, "the-world-warrior", 65 + (TitleSubtitleOffsets[subtitleFrame] ?? -1), 146);

    if (subtitleFrame < TitleSubtitleOffsets.length) return;

    this.drawFrame(context, "copyright", 128, 192);
  }

  drawPrompt(context) {
    if (this.creditFrame === undefined) {
      if (Math.floor(this.promptTime / TitleDelay.INSERT_COIN) % 2 === 0) {
        drawText(context, this.miscImage, this.miscFrames, "INSERT COIN.", 144, 168);
      }

      return;
    }

    const promptCredits = this.creditsAtStart ?? gameState.credits;
    const prompt = promptCredits < 2 ? "PUSH 1P START." : "PUSH 1P OR 2P START.";

    drawText(context, this.misc2Image, this.miscFrames, prompt, (384 - prompt.length * 8) / 2, 168, "self-test");
    drawText(context, this.misc2Image, this.miscFrames, `CREDIT= ${gameState.credits}`, 296, 208, "self-test");
  }

  drawFade(context) {
    if (this.startFrame === undefined) return;

    context.save();
    context.globalAlpha = this.framesElapsed - this.startFrame >= TitleDelay.FADE_OUT
      ? 1 : Math.min(15, Math.floor((this.framesElapsed - this.startFrame) / 3)) * 2 / 45;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawLogo(context);
    this.drawPrompt(context);
    this.drawFade(context);
  }
}
