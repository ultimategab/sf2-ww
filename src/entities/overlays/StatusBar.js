import {
  BonusDelay,
  HEALTH_CRITICAL_HIT_POINTS,
  HEALTH_DAMAGE_COLOR,
  HEALTH_MAX_HIT_POINTS,
  KO_ANIMATION,
  KO_FLASH_DELAY,
  TIME_DELAY,
  TIME_FLASH_DELAY,
  TIME_FRAME_KEYS,
} from "../../constants/battle.js";
import { FighterId } from "../../constants/fighter.js";
import { FPS, SCREEN_WIDTH } from "../../constants/game.js";
import { gameState } from "../../state/gameState.js";
import { drawFrame } from "../../utils/context.js";
import { MiscFrames } from "../../utils/MiscFrames.js";

export class StatusBar {
  time = 99;
  timeTimer = 0;
  timeFlashTimer = 0;
  useFlashFrames = false;

  timerRunning = false;

  healthBars = [
    {
      timer: 0,
      hitPoints: HEALTH_MAX_HIT_POINTS,
    },
    {
      timer: 0,
      hitPoints: HEALTH_MAX_HIT_POINTS,
    },
  ];

  koFrame = 0;
  koAnimationTimer = 0;

  frames = new MiscFrames();

  constructor(roundWins) {
    this.image = document.querySelector("img[alt='game-text-fonts-and-health-bars']");
    this.names = gameState.fighters.map(({ id }) => `${id.toLowerCase()}`);

    this.roundWins = roundWins;
  }

  resetRound(time) {
    this.time = 99;
    this.timeTimer = time.previous;
    this.timeFlashTimer = time.previous;
    this.useFlashFrames = false;
    this.timerRunning = false;
    this.koFrame = 0;
    this.koAnimationTimer = time.previous;

    for (const healthBar of this.healthBars) healthBar.hitPoints = HEALTH_MAX_HIT_POINTS;
  }

  updateTime(time) {
    if (time.previous > this.timeTimer + TIME_DELAY) {
      this.time -= 1;
      this.timeTimer = time.previous;
    }

    if (this.time <= -1) {
      this.useFlashFrames = true;
    } else if (this.time < 15 && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY) {
      this.useFlashFrames = !this.useFlashFrames;
      this.timeFlashTimer = time.previous;
    }
  }

  updateHealthBars(time) {
    for (const index in this.healthBars) {
      if (this.healthBars[index].hitPoints <= gameState.fighters[index].hitPoints) continue;

      this.healthBars[index].hitPoints = Math.max(0, this.healthBars[index].hitPoints - (time.secondsPassed * FPS));
    }
  }

  updateKoIcon(time) {
    if (this.healthBars.every((healthBar) => healthBar.hitPoints > HEALTH_CRITICAL_HIT_POINTS)) return;
    if (time.previous < this.koAnimationTimer + KO_FLASH_DELAY[this.koFrame]) return;

    this.koFrame = 1 - this.koFrame;
    this.koAnimationTimer = time.previous;
  }

  update(time) {
    if (this.timerRunning) this.updateTime(time);
    else this.timeTimer = time.previous;

    this.updateHealthBars(time);
    this.updateKoIcon(time);
  }

  drawFrame(context, frameKey, x, y, direction = 1) {
    drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
  }

  drawScoreLabel(context, label, x, y = 1) {
    for (const index in label) this.drawFrame(context, `score-${label.charAt(index)}`, x + index * 12, y);
  }

  drawScore(context, score, x) {
    const strScore = String(score);
    const padding = 6 * 12 - strScore.length * 12;

    this.drawScoreLabel(context, strScore, x + padding);
  }

  drawScores(context) {
    this.drawScoreLabel(context,                        "1P",   4);
    this.drawScore     (context, gameState.fighters[0].score,  45);

    this.drawScoreLabel(context,                        "GAB", 133);
    this.drawScore     (context,                       50000, 177);

    this.drawScoreLabel(context,                        "2P", 269);
    this.drawScore     (context, gameState.fighters[1].score, 309);
  }

  drawHealthBars(context) {
    this.drawFrame(context,               "health-bar",  31, 20                   );
    this.drawFrame(context, KO_ANIMATION[this.koFrame], 176, 18 - this.koFrame    );
    this.drawFrame(context,               "health-bar", 353, 20               , -1);

    context.fillStyle = HEALTH_DAMAGE_COLOR;

    context.beginPath();
    context.fillRect(32, 21, HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints), 9);
    context.fillRect(208 + Math.floor(this.healthBars[1].hitPoints), 21, HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints), 9);
  }

  drawTime(context) {
    const timeString = String(Math.max(this.time, 0)).padStart(2, "00");
    const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];

    this.drawFrame(context, `${flashFrame}-${timeString.charAt(0)}`, 178, 33);
    this.drawFrame(context, `${flashFrame}-${timeString.charAt(1)}`, 194, 33);
  }

  drawNameTags(context) {
    const [name1, name2] = this.names;
    const [, , width] = this.frames.get(name2);

    this.drawFrame(context, name1,  32        , 33);
    this.drawFrame(context, name2, 351 - width, 33);
  }

  drawRoundWins(context) {
    for (let fighter = 0; fighter < 2; fighter++) {
      for (let hangLoose = 0; hangLoose < this.roundWins[fighter]; hangLoose++) {
        const hangLooseX = fighter === 0 ? hangLoose * 16 : 368 - hangLoose * 16;
        this.drawFrame(context, "hang-loose", hangLooseX, 16);
      }
    }
  }

  drawAnnouncementFrame(context, frameKey, left, animationProgress) {
    const [sourceX, sourceY, width, height] = this.frames.get(frameKey);

    for (let offsetY = 0; offsetY < height; offsetY += 16) {
      for (let offsetX = 0; offsetX < width; offsetX += 16) {
        const blockWidth = Math.min(16, width - offsetX);
        const blockHeight = Math.min(16, height - offsetY);
        const blockCenterX = left + offsetX + blockWidth / 2 - SCREEN_WIDTH / 2;
        const blockCenterY = offsetY + blockHeight / 2 - height / 2;

        context.drawImage(
          this.image,
          sourceX + offsetX, sourceY + offsetY, blockWidth, blockHeight,
          Math.round(SCREEN_WIDTH / 2 + blockCenterX * animationProgress - blockWidth / 2),
          Math.round(96 + blockCenterY * animationProgress - blockHeight / 2),
          blockWidth, blockHeight,
        );
      }
    }
  }

  drawWinner(context, winnerId) {
    let fighterName = gameState.fighters[winnerId].id;
    if (fighterName === FighterId.CHUNLI) fighterName = "CHUN LI";
    else if (fighterName === FighterId.EHONDA) fighterName = "E.HONDA";

    const text = `${fighterName} WIN!`;
    this.drawScoreLabel(context, text, SCREEN_WIDTH / 2 - text.length * 6, 96);
  }

  drawBonus(context, bonus, framesElapsed = BonusDelay.TOTAL) {
    for (const [frameKey, score, y, delay] of [
      ["time",  bonus.time,  48, BonusDelay.TIME],
      ["vital", bonus.vital, 64, BonusDelay.VITAL],
      ["total", bonus.total, 88, BonusDelay.TOTAL],
    ]) {
      if (framesElapsed < delay) continue;

      this.drawFrame(context, frameKey, 128, y);
      const strScore = String(score);

      for (const index in strScore) {
        this.drawFrame(context, `time-${strScore.charAt(index)}`, 256 - strScore.length * 16 + index * 16, y);
      }
    }
  }

  draw(context) {
    this.drawScores(    context);
    this.drawHealthBars(context);
    this.drawTime(      context);
    this.drawNameTags(  context);
    this.drawRoundWins( context);
  }
}
