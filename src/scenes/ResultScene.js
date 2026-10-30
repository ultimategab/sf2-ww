import { FRAME_TIME } from "../constants/game.js";
import { ResultDelay, WinnerQuotes } from "../constants/battle.js";
import { playSound, stopSound } from "../engine/soundHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { PlayerSelectScene } from "./PlayerSelectScene.js";

export class ResultScene {
  startedAt = undefined;
  framesElapsed = 0;
  frames = new MiscFrames();

  portraitFrames = new Map([
    ["blanka",          [259, 241, 128, 128]],
    ["chunli",          [130, 399, 128, 128]],
    ["dhalsim",         [388, 399, 128, 128]],
    ["ehonda",          [130, 241, 128, 128]],
    ["guile",           [388, 241, 128, 128]],
    ["ken",             [  1, 399, 128, 128]],
    ["ryu",             [  1, 241, 128, 128]],
    ["zangief",         [259, 399, 128, 128]],
    ["portrait-border", [ 82, 226, 128,  14]],
  ]);

  hurtFrames = new Map([
    ["blanka", [
      [[  1,   1, 125,  95], [ 2, 17]],
      [[127,   1, 124, 100], [ 0, 12]],
      [[252,   1, 124, 100], [ 0, 12]],
      [[377,   1, 125,  95], [ 2, 17]],
      [[503,   1, 125,  95], [ 2, 17]],
      [[629,   1, 124, 100], [ 0, 12]],
      [[754,   1, 124, 100], [ 0, 12]],
      [[879,   1, 125,  95], [ 2, 17]],
    ]],
    ["chunli", [
      [[  1, 102, 123, 103], [ 0,  9]],
      [[125, 102, 128, 103], [ 0,  9]],
      [[254, 102, 128, 104], [ 0,  8]],
      [[383, 102, 125, 104], [ 0,  8]],
      [[509, 102, 128, 104], [ 0,  8]],
    ]],
    ["dhalsim", [
      [[  1, 207, 128, 111], [ 0,  1]],
      [[130, 207, 128, 106], [ 0,  6]],
      [[259, 207, 128, 112], [ 0,  0]],
      [[388, 207, 128, 112], [ 0,  0]],
    ]],
    ["ehonda", [
      [[  1, 320, 127,  96], [ 1, 16]],
      [[129, 320, 127,  96], [ 1, 16]],
      [[257, 320, 127,  96], [ 1, 16]],
      [[385, 320, 127,  96], [ 1, 16]],
    ]],
    ["guile", [
      [[  1, 417, 108, 112], [ 0,  0]],
      [[110, 417, 108, 112], [ 0,  0]],
      [[219, 417, 108, 112], [ 0,  0]],
      [[328, 417, 108, 112], [ 0,  0]],
      [[437, 417, 108, 112], [ 0,  0]],
      [[546, 417, 108, 112], [ 0,  0]],
    ]],
    ["ken", [
      [[  1, 530, 128, 112], [ 0,  0]],
      [[130, 530, 128, 110], [ 0,  2]],
      [[259, 530, 128, 112], [ 0,  0]],
    ]],
    ["ryu", [
      [[  1, 643, 128, 111], [ 0,  1]],
      [[130, 643, 128, 108], [ 0,  4]],
      [[259, 643, 128, 111], [ 0,  1]],
    ]],
    ["zangief", [
      [[  1, 755, 128, 103], [ 0,  9]],
      [[130, 755, 128,  96], [ 0, 16]],
      [[259, 755, 128, 103], [ 0,  9]],
    ]],
  ]);

  constructor(changeScene, winnerId) {
    this.changeScene = changeScene;
    this.winnerId = winnerId;
    this.image = document.querySelector("img[alt='result']");
    this.versusImage = document.querySelector("img[alt='versus']");
    this.miscImage = document.querySelector("img[alt='game-text-fonts-and-health-bars']");
    this.music = document.querySelector("audio#result");
    this.quote = WinnerQuotes[gameState.fighters[winnerId].id];
    this.fadeOutFrame = this.quote[1].length * ResultDelay.CHARACTER + ResultDelay.DISPLAY;

    const portraits = this.hurtFrames.get(gameState.fighters[1 - winnerId].id.toLowerCase());
    this.loserPortrait = portraits[Math.floor(Math.random() * portraits.length)];

    playSound(this.music, 0.35);
  }

  update(time) {
    if (this.startedAt === undefined) this.startedAt = time.previous;

    this.framesElapsed = Math.floor((time.previous - this.startedAt) / FRAME_TIME);

    if (this.framesElapsed < this.fadeOutFrame + ResultDelay.FADE_OUT + ResultDelay.BLACK) return;

    stopSound(this.music);
    this.changeScene(PlayerSelectScene, [this.winnerId === 0, this.winnerId === 1]);
  }

  drawFighters(context) {
    for (const [fighterId, fighter] of gameState.fighters.entries()) {
      if (fighterId === this.winnerId) {
        drawFrame(context, this.versusImage, this.portraitFrames.get(fighter.id.toLowerCase()),
          fighterId === 0 ? 16 : 368, 16, fighterId === 0 ? 1 : -1);
      } else {
        drawFrame(context, this.image, this.loserPortrait[0],
          fighterId === 0 ? 16 + this.loserPortrait[1][0] : 368 - this.loserPortrait[1][0],
          32 + this.loserPortrait[1][1], fighterId === 0 ? 1 : -1);
      }

      drawFrame(context, this.versusImage, this.portraitFrames.get("portrait-border"), fighterId === 0 ? 16 : 240, 130);
    }
  }

  drawQuote(context) {
    let x = this.quote[0];
    let y = 176;

    for (let letter = 0; letter < this.quote[1].length; letter++) {
      if (letter * ResultDelay.CHARACTER > this.framesElapsed) return;

      const character = this.quote[1].charAt(letter);

      if (character === "\n") {
        x = this.quote[0];
        y += 16;
        continue;
      }

      if (character !== " ") {
        drawFrame(context, this.miscImage, this.frames.get(`quote-${character}`), x, y);
      }

      x += 12;
    }
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawFighters(context);
    this.drawQuote(context);

    if (this.framesElapsed >= ResultDelay.FADE_IN && this.framesElapsed < this.fadeOutFrame) return;

    context.save();
    context.globalAlpha = this.framesElapsed < ResultDelay.FADE_IN
      ? 1 - Math.min(15, Math.floor(this.framesElapsed / 3)) / 15
      : Math.min(15, Math.floor((this.framesElapsed - this.fadeOutFrame) / 3)) / 15;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }
}
