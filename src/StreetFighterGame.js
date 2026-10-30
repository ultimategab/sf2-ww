import { getContext } from "./utils/context.js";
import { isCoin, isStart, pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "./engine/InputHandler.js";
import { playSound } from "./engine/soundHandler.js";
import { gameState } from "./state/gameState.js";
import { SelfTestScene, WarningScene, IntroScene, TitleScene, PlayerSelectScene, VersusScene, BattleScene, ResultScene } from "./scenes/index.js";

export class StreetFighterGame {
  context = getContext();
  frameTime = { previous: 0, secondsPassed: 0 };
  coinSound = document.querySelector("audio#coin");

  pauseStartedAt = undefined;
  pausedTime = 0;
  pausedSounds = [];

  constructor() {
    // choose which scene to display first (DEBUG porpuses?), SelfTestScene should be the first btw
    this.changeScene(SelfTestScene);
  }

  changeScene(SceneClass, ...args) {
    this.scene = new SceneClass(this.changeScene.bind(this), ...args);
  }

  handleVisibilityChange({ timeStamp: time = this.frameTime.previous } = {}) {
    if (document.hidden) {
      this.pauseStartedAt = time;
      this.pausedSounds = [...document.querySelectorAll("audio")].filter(sound => !sound.paused && !sound.ended);

      for (const sound of this.pausedSounds) sound.pause();

      return;
    }

    if (this.pauseStartedAt === undefined) return;

    this.pausedTime += time - this.pauseStartedAt;
    this.pauseStartedAt = undefined;

    for (const sound of this.pausedSounds) sound.play();
    
    this.pausedSounds = [];
  }

  updateCredits() {
    for (let fighterId = 0; fighterId < 2; fighterId++) {
      let insertCoin = false;

      while (isCoin(fighterId)) insertCoin = true;

      if (insertCoin) {
        gameState.credits = Math.min(9, gameState.credits + 1);
        playSound(this.coinSound);
      }
    }
  }

  frame(time) {
    window.requestAnimationFrame(this.frame.bind(this));

    if (document.hidden) return;
    time = Math.max(this.frameTime.previous, time - this.pausedTime);

    this.frameTime = {
      secondsPassed: (time - this.frameTime.previous) / 1000,
      previous: time,
    };

    pollGamepads();
    this.updateCredits();
    this.scene.update(this.frameTime, this.context);

    for (let fighterId = 0; fighterId < 2; fighterId++) {
      while (isStart(fighterId)) {}
    }

    this.scene.draw(this.context);
  }

  start() {
    registerKeyboardEvents();
    registerGamepadEvents();

    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
    this.handleVisibilityChange();
    
    window.requestAnimationFrame(this.frame.bind(this));
  }
}
