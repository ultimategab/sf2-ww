import { FRAME_TIME } from "../constants/game.js";
import { SelectFighters, VersusDelay } from "../constants/selection.js";
import { playSound, stopSound } from "../engine/soundHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame } from "../utils/context.js";
import { BattleScene } from "./BattleScene.js";

export class VersusScene {
  startedAt = undefined;
  framesElapsed = 0;

  frames = new Map([
    ["background",      [ 66,   1, 384, 224]],

    ["blanka",          [259, 241, 128, 128]],
    ["chunli",          [130, 399, 128, 128]],
    ["dhalsim",         [388, 399, 128, 128]],
    ["ehonda",          [130, 241, 128, 128]],
    ["guile",           [388, 241, 128, 128]],
    ["ken",             [  1, 399, 128, 128]],
    ["ryu",             [  1, 241, 128, 128]],
    ["zangief",         [259, 399, 128, 128]],
    
    ["blanka-name",     [271, 376,  96,  15]],
    ["chunli-name",     [151, 534,  95,  15]],
    ["dhalsim-name",    [403, 534,  95,  15]],
    ["ehonda-name",     [151, 376,  95,  15]],
    ["guile-name",      [417, 376,  74,  15]],
    ["ken-name",        [ 38, 534,  50,  15]],
    ["ryu-name",        [ 38, 376,  47,  15]],
    ["zangief-name",    [274, 534,  95,  15]],

    ["portrait-border", [ 82, 226, 128,  14]],
  ]);

  constructor(changeScene) {
    this.changeScene = changeScene;
    this.image = document.querySelector("img[alt='versus']");
    this.music = document.querySelector("audio#versus");
    playSound(this.music, 0.35);
  }

  update(time) {
    if (this.startedAt === undefined) this.startedAt = time.previous;
    
    this.framesElapsed = Math.floor((time.previous - this.startedAt) / FRAME_TIME);

    if (this.framesElapsed < VersusDelay.DISPLAY + VersusDelay.FADE_OUT + VersusDelay.BLACK) return;

    stopSound(this.music);
    this.changeScene(BattleScene);
  }

  drawFrame(context, frameKey, x, y, direction = 1) {
    drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
  }

  drawFighters(context) {
    for (const [fighterId, fighterState] of gameState.fighters.entries()) {
      const fighter = SelectFighters.find(({ id }) => id === fighterState.id);
      const frameKey = fighter.id.toLowerCase();

      this.drawFrame(context, frameKey, fighterId === 0 ? 16 : 368, 16, fighterId === 0 ? 1 : -1);
      this.drawFrame(context, "portrait-border", fighterId === 0 ? 16 : 240, 130);
      this.drawFrame(context, `${frameKey}-name`, fighter.versusNameX[fighterId], 152);
    }
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawFrame(context, "background", 0, 0);
    this.drawFighters(context);

    if (this.framesElapsed >= VersusDelay.FADE_IN && this.framesElapsed < VersusDelay.DISPLAY) return;

    context.save();
    
    context.globalAlpha = this.framesElapsed < VersusDelay.FADE_IN
      ? 1 - Math.min(15, Math.floor(this.framesElapsed / 3)) / 15
      : Math.min(15, Math.floor((this.framesElapsed - VersusDelay.DISPLAY) / 3)) / 15;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.restore();
  }
}
