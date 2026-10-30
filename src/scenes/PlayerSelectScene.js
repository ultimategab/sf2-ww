import { FRAME_TIME } from "../constants/game.js";
import { FighterId } from "../constants/fighter.js";
import { FirstStageIds, PlaneVelocity, SelectDelay, SelectFighters, SelectState } from "../constants/selection.js";
import { FORCE_SELECTED_STAGE } from "../constants/stage.js";
import * as control from "../engine/InputHandler.js";
import { playSound, stopSound } from "../engine/soundHandler.js";
import { gameState } from "../state/gameState.js";
import { drawFrame } from "../utils/context.js";
import { MiscFrames } from "../utils/MiscFrames.js";
import { VersusScene } from "./VersusScene.js";

export class PlayerSelectScene {
  selectedFighters = [FighterId.RYU, FighterId.KEN];
  confirmedAt = [undefined, undefined];
  directions = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  firstFighter = undefined;
  challengerDelay = 0;

  selectState = SelectState.SELECT;
  selectStartedAt = undefined;
  selectTime = 0;
  promptTime = 0;
  plane = undefined;
  planeTimer = 0;
  countryAnnounced = false;
  miscFrames = new MiscFrames();

  frames = new Map([
    ["background",      [ 16, 399, 384, 224]],

    ["player-select",   [290,  92, 126,  14]],

    ["player-1",        [  2,  79,  27,  14]],
    ["player-2",        [  2, 121,  29,  14]],

    ["blanka",          [213, 150,  96,  96]],
    ["chunli",          [108, 276,  96,  96]],
    ["dhalsim",         [320, 276,  96,  96]],
    ["ehonda",          [108, 150,  96,  96]],
    ["guile",           [319, 150,  96,  96]],
    ["ken",             [  2, 276,  96,  96]],
    ["ryu",             [  2, 150,  96,  96]],
    ["zangief",         [214, 276,  96,  96]],
    
    ["blanka-name",     [213, 251,  96,  15]],
    ["chunli-name",     [108, 377,  95,  15]],
    ["dhalsim-name",    [320, 377,  95,  15]],
    ["ehonda-name",     [108, 251,  95,  15]],
    ["guile-name",      [330, 251,  74,  15]],
    ["ken-name",        [ 25, 377,  50,  15]],
    ["ryu-name",        [ 27, 251,  47,  15]],
    ["zangief-name",    [214, 377,  95,  15]],
    
    ["brazil-gray",     [ 65,   2,  32,  24]],
    ["brazil",          [ 65,  36,  32,  24]],
    ["china-gray",      [117,   2,  32,  24]],
    ["china",           [117,  36,  32,  24]],
    ["india-gray",      [169,   2,  30,  24]],
    ["india",           [169,  36,  30,  24]],
    ["japan-gray",      [219,   2,  32,  24]],
    ["japan",           [219,  36,  32,  24]],
    ["usa-gray",        [271,   2,  30,  24]],
    ["usa",             [271,  36,  30,  24]],
    ["ussr-gray",       [321,   2,  32,  24]],
    ["ussr",            [321,  36,  32,  24]],
    
    ["cursor-1",        [ 34,  66,  32,  36]],
    ["cursor-2",        [ 35, 108,  31,  36]],
    ["cursor-gray-1",   [ 73,  66,  30,  36]],
    ["cursor-gray-2",   [ 74, 108,  29,  36]],

    ["plane-1",         [132,  76,  16,  16]],
    ["plane-2",         [148,  77,  16,  14]],
    ["plane-3",         [148,  92,  16,  16]],
    ["plane-4",         [148, 108,  16,  14]],
    ["plane-5",         [132, 107,  16,  16]],
    ["plane-6",         [115, 108,  16,  14]],
    ["plane-7",         [115,  92,  16,  15]],
    ["plane-8",         [115,  77,  16,  14]],

    ["portrait-border", [178,  92,  96,  14]],
  ]);

  constructor(changeScene, startedFighters = [false, false]) {
    this.changeScene = changeScene;
    this.startedFighters = startedFighters;

    this.image = document.querySelector("img[alt='player-select']");
    this.miscImage = document.querySelector("img[alt='game-text-fonts-and-health-bars']");
    this.music = document.querySelector("audio#player-select");
    this.planeSound = document.querySelector("audio#plane");
    this.cursorSound = document.querySelector("audio#select-cursor");
    this.confirmSound = document.querySelector("audio#select-confirm");
    this.joinSound = document.querySelector("audio#fighter-joined");

    if (gameState.fighters.every(fighter => fighter.id !== undefined)) {
      this.selectedFighters = gameState.fighters.map(fighter => fighter.id);
    }

    playSound(this.music, 0.35);
  }

  joinFighter(fighterId) {
    if (this.startedFighters[fighterId] || gameState.credits === 0) return;

    this.startedFighters[fighterId] = true;
    gameState.credits--;
    this.challengerDelay = 4;
    playSound(this.joinSound);
  }

  confirmFighter(time, fighterId) {
    this.confirmedAt[fighterId] = time.previous;
    gameState.fighters[fighterId].id = this.selectedFighters[fighterId];
    playSound(this.confirmSound);

    if (this.firstFighter !== undefined) return;

    this.firstFighter = SelectFighters.find(({ id }) => id === this.selectedFighters[fighterId]);
    const availableStageIds = FirstStageIds.filter(id => id !== this.firstFighter.id);

    gameState.stageId = FORCE_SELECTED_STAGE ?? availableStageIds[Math.floor(Math.random() * availableStageIds.length)];
  }

  getNextFighter(id, horizontal, vertical) {
    const fighter = SelectFighters.find(fighter => fighter.id === id);

    return SelectFighters.find(nextFighter =>
      nextFighter.selectPosition[0] === fighter.selectPosition[0] + horizontal &&
      nextFighter.selectPosition[1] === fighter.selectPosition[1] + vertical
    )?.id ?? id;
  }

  updateFighterSelect(time, fighterId, confirm) {
    const horizontal = Number(control.isRight(fighterId)) - Number(control.isLeft(fighterId));
    const vertical   = Number(control.isDown(fighterId))  - Number(control.isUp(fighterId));
    let nextFighter = this.selectedFighters[fighterId];

    if (horizontal !== this.directions[fighterId].x) nextFighter = this.getNextFighter(nextFighter, horizontal, 0);

    if (vertical !== this.directions[fighterId].y) nextFighter = this.getNextFighter(nextFighter, 0, vertical);
    
    this.directions[fighterId] = { x: horizontal, y: vertical };

    if (nextFighter !== this.selectedFighters[fighterId]) {
      this.selectedFighters[fighterId] = nextFighter;

      stopSound(this.joinSound);
      playSound(this.cursorSound);
    }

    if (confirm) this.confirmFighter(time, fighterId);
  }

  updateSelect(time, confirmFighters) {
    for (let fighterId = 0; fighterId < this.selectedFighters.length; fighterId++) {
      let startPressed = false;

      while (control.isStart(fighterId)) startPressed = true;

      if (!this.startedFighters[fighterId]) {
        if (startPressed) this.joinFighter(fighterId);

        continue;
      }

      if (this.selectTime < SelectDelay.INTRO || this.confirmedAt[fighterId] !== undefined) continue;

      const confirmStart = startPressed && this.challengerDelay === 0;
      if (this.challengerDelay > 0) this.challengerDelay--;

      this.updateFighterSelect(time, fighterId, confirmFighters[fighterId] || confirmStart);
    }

    if (!this.confirmedAt.every(confirmedAt =>
      confirmedAt !== undefined && time.previous >= confirmedAt + SelectDelay.CONFIRM * FRAME_TIME
    )) return;

    this.destination = SelectFighters.find(({ id }) => id === gameState.stageId);
    this.countrySound = document.querySelector(`audio#announcer-${this.destination.country}`);
    this.plane = { x: this.firstFighter.city[0], y: this.firstFighter.city[1], frame: 0 };
    this.selectState = SelectState.PLANE;
    this.selectStartedAt = time.previous;
    this.planeTimer = time.previous + SelectDelay.PLANE * FRAME_TIME;

    this.plane.frame = Math.floor((this.getPlaneDirection(
      this.destination.city[0] - this.plane.x,
      this.destination.city[1] - this.plane.y,
    ) + 1) / 8) % 8;

    if (this.destination.id === this.firstFighter.id) {
      this.plane = undefined;
      this.selectState = SelectState.ARRIVED;
    }
  }

  getPlaneDirection(distanceX, distanceY) {
    if (distanceX === 0 && distanceY === 0) return 0;

    let angle = Math.abs(distanceY) > Math.abs(distanceX)
      ? Math.floor(Math.abs(distanceX) * 32 / Math.abs(distanceY))
      : 64 - Math.floor(Math.abs(distanceY) * 32 / Math.abs(distanceX));

    if (distanceY > 0) angle = 128 - angle;
    if (distanceX < 0) angle = 256 - angle;

    return Math.floor((angle + 2) / 4) % 64;
  }

  updatePlane(time) {
    while (this.planeTimer <= time.previous) {
      const distanceX = this.destination.city[0] - Math.floor(this.plane.x);
      const distanceY = this.destination.city[1] - Math.ceil(this.plane.y);

      if (Math.abs(distanceX) <= 3 && Math.abs(distanceY) <= 3) {
        this.plane.x = this.destination.city[0];
        this.plane.y = this.destination.city[1];

        this.selectState = SelectState.ARRIVED;
        this.selectStartedAt = this.planeTimer;

        return;
      }

      if (this.planeTimer === this.selectStartedAt + SelectDelay.PLANE * FRAME_TIME) playSound(this.planeSound);

      const velocity = PlaneVelocity[this.getPlaneDirection(distanceX, distanceY)];
      this.plane.x += velocity[0] / 256;
      this.plane.y -= velocity[1] / 256;
      this.planeTimer += FRAME_TIME;
    }
  }

  updateArrival() {
    if (!this.countryAnnounced && this.selectTime >= SelectDelay.COUNTRY) {
      playSound(this.countrySound);
      this.countryAnnounced = true;
    }

    if (this.selectTime < SelectDelay.EXIT) return;

    this.selectState = SelectState.FADE_OUT;
    this.selectStartedAt += SelectDelay.EXIT * FRAME_TIME;
  }

  update(time) {
    const confirmFighters = [false, false];

    for (let fighterId = 0; fighterId < this.selectedFighters.length; fighterId++) {
      while (control.isLightPunch(fighterId))  confirmFighters[fighterId] = true;
      while (control.isMediumPunch(fighterId)) confirmFighters[fighterId] = true;
      while (control.isHeavyPunch(fighterId))  confirmFighters[fighterId] = true;
      while (control.isLightKick(fighterId))   confirmFighters[fighterId] = true;
      while (control.isMediumKick(fighterId))  confirmFighters[fighterId] = true;
      while (control.isHeavyKick(fighterId))   confirmFighters[fighterId] = true;
    }

    if (this.selectStartedAt === undefined) this.selectStartedAt = time.previous;
    this.selectTime = Math.floor((time.previous - this.selectStartedAt) / FRAME_TIME);
    this.promptTime = Math.floor((time.previous - this.selectStartedAt) / FRAME_TIME);

    switch (this.selectState) {
      case SelectState.SELECT:  this.updateSelect(time, confirmFighters);  break;
      case SelectState.PLANE:   this.updatePlane(time);   break;
      case SelectState.ARRIVED: this.updateArrival(time); break;
      case SelectState.FADE_OUT:
        if (this.selectTime < SelectDelay.FADE_OUT + SelectDelay.BLACK) return;

        stopSound(this.music);
        stopSound(this.planeSound);
        stopSound(this.countrySound);
        stopSound(this.joinSound);
        this.changeScene(VersusScene);
      break;
    }

    this.selectTime = Math.floor((time.previous - this.selectStartedAt) / FRAME_TIME);
  }

  drawFrame(context, frameKey, x, y, direction = 1) {
    drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
  }

  drawFlags(context) {
    for (const fighter of SelectFighters) {
      const colored = this.selectedFighters.some((selectedFighter, fighterId) =>
        this.startedFighters[fighterId] && selectedFighter === fighter.id)
      || (this.selectState !== SelectState.SELECT && this.selectState !== SelectState.PLANE && fighter.id === gameState.stageId);

      this.drawFrame(context, `${fighter.country}${colored ? "" : "-gray"}`, fighter.flag[0], fighter.flag[1]);
    }
  }

  drawFighters(context) {
    for (const [fighterId, selectedFighter] of this.selectedFighters.entries()) {
      if (!this.startedFighters[fighterId]) continue;

      const fighter = SelectFighters.find(({ id }) => id === selectedFighter);
      const frameKey = fighter.id.toLowerCase();

      this.drawFrame(context, `player-${fighterId + 1}`, fighterId === 0 ? 33 : 321, 97);
      this.drawFrame(context, frameKey, fighterId === 0 ? 0 : 384, 128, fighterId === 0 ? 1 : -1);
      this.drawFrame(context, "portrait-border", fighterId === 0 ? 0 : 288, 210);
      this.drawFrame(context, `${frameKey}-name`, fighter.nameX[fighterId], 112);
    }
  }

  drawCursors(context) {
    for (const [fighterId, selectedFighter] of this.selectedFighters.entries()) {
      if (!this.startedFighters[fighterId]) continue;

      const fighter = SelectFighters.find(({ id }) => id === selectedFighter);
      const frameKey = this.confirmedAt[fighterId] === undefined && Math.floor(this.selectTime / 2) % 2 === 1
      ? `cursor-gray-${fighterId + 1}` : `cursor-${fighterId + 1}`;

      this.drawFrame(context, frameKey, 128 + fighter.selectPosition[0] * 32, 140 + fighter.selectPosition[1] * 32);

      if (this.confirmedAt[fighterId] === undefined) continue;

      this.drawFrame(context, `cursor-${fighterId + 1}`, fighter.flag[0], fighter.flag[1] - 8);
    }
  }

  drawPlane(context) {
    if (!this.plane) return;
    if (this.selectState === SelectState.PLANE && this.selectTime < SelectDelay.PLANE) return;

    this.drawFrame(context, `plane-${this.plane.frame + 1}`, Math.floor(this.plane.x) - 8,
      Math.ceil(this.plane.y) - (this.plane.frame === 3 || this.plane.frame === 5 ? 6 : 8));
  }

  drawPrompts(context) {
    if (Math.floor(this.promptTime / SelectDelay.PUSH_START) % 2 !== 0) return;

    for (let fighterId = 0; fighterId < this.startedFighters.length; fighterId++) {
      if (this.startedFighters[fighterId]) continue;

      drawFrame(context, this.miscImage, this.miscFrames.get("push-start"), fighterId === 0 ? 9 : 257, 1);
    }
  }

  drawFade(context) {
    if (this.selectState !== SelectState.SELECT && this.selectState !== SelectState.FADE_OUT) return;
    if (this.selectState === SelectState.SELECT && this.selectTime >= SelectDelay.FADE_IN) return;

    context.save();
    context.fillStyle = "black";

    context.globalAlpha = this.selectState === SelectState.FADE_OUT
    ? Math.min(15, Math.floor(this.selectTime / 3)) / 15 : 1 - Math.min(15, this.selectTime) / 15;

    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawFrame(context, "background", 0, 0);
    this.drawFrame(context, "player-select", 129, 5);
    this.drawFlags(context);
    this.drawFighters(context);
    this.drawCursors(context);
    this.drawPlane(context);
    this.drawPrompts(context);
    this.drawFade(context);
  }
}
