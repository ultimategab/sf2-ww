import { FPS, FRAME_TIME, SCREEN_WIDTH } from "../constants/game.js";
import { Camera } from "../engine/Camera.js";
import {
  BlankaStage, ChunliStage, DhalsimStage, EHondaStage,
  GuileStage, KenStage, RyuStage, ZangiefStage,
} from "../entities/stages/index.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "../constants/stage.js";
import { Blanka, Chunli, Dhalsim, EHonda, Guile, Ken, Ryu, Zangief } from "../entities/fighters/index.js";
import { StatusBar } from "../entities/overlays/StatusBar.js";
import { FpsCounter } from "../entities/overlays/FpsCounter.js";
import { gameState } from "../state/gameState.js";
import { FIGHTER_HURT_DELAY, FighterAttackBaseData, FighterAttackStrength, FighterId, FighterState } from "../constants/fighter.js";
import {
  HEALTH_MAX_HIT_POINTS, MUSIC_CRITICAL_HIT_POINTS, PERFECT_BONUS,
  BONUS_SCORE_SPEED_MULTIPLIER, BonusDelay, RoundDelay, RoundState,
} from "../constants/battle.js";
import { HitSplashLight, HitSplashMedium, HitSplashHeavy, BlockSplash, Shadow, GroundDust } from "../entities/fighters/shared/index.js";
import { isAttackButtonDown } from "../engine/InputHandler.js";
import { playSound, stopSound } from "../engine/soundHandler.js";
import { ResultScene } from "./ResultScene.js";

export class BattleScene {
  fighters = [];
  shadows = [];
  entities = [];
  camera = undefined;
  hurtTimer = undefined;
  fighterDrawOrder = [0, 1];

  roundWins = [0, 0];
  roundNumber = 0;
  battleNumber = 1;
  roundState = RoundState.ROUND;
  roundStartedAt = undefined;
  roundTime = 0;

  winnerId = null;
  bonus = undefined;

  worldTime = { previous: 0, secondsPassed: 0 };
  nextWorldFrame = 0;

  announcerQueue = [];
  announcerSound = undefined;
  stageMusic = undefined;
  scoreSound = document.querySelector("audio#score-count");

  constructor(changeScene) {
    this.changeScene = changeScene;
    for (const fighter of gameState.fighters) fighter.score = 0;

    const StageEntityClass = this.getStageEntityClass(gameState.stageId);
    this.stage = new StageEntityClass();

    this.overlays = [
      this.statusBar = new StatusBar(this.roundWins),
      new FpsCounter(),
    ];

    this.startRound();
  }

  getStageEntityClass(id) {
    switch (id) {
      case FighterId.BLANKA:  return BlankaStage;
      case FighterId.CHUNLI:  return ChunliStage;
      case FighterId.DHALSIM: return DhalsimStage;
      case FighterId.EHONDA:  return EHondaStage;
      case FighterId.GUILE:   return GuileStage;
      case FighterId.KEN:     return KenStage;
      case FighterId.RYU:     return RyuStage;
      case FighterId.ZANGIEF: return ZangiefStage;

      default: throw new Error(`Unknown stage id: ${id}. Stage not implemented yet!`);
    }
  }

  getFighterEntityClass(id) {
    switch (id) {
      case FighterId.BLANKA:  return Blanka;
      case FighterId.CHUNLI:  return Chunli;
      case FighterId.DHALSIM: return Dhalsim;
      case FighterId.EHONDA:  return EHonda;
      case FighterId.GUILE:   return Guile;
      case FighterId.KEN:     return Ken;
      case FighterId.RYU:     return Ryu;
      case FighterId.ZANGIEF: return Zangief;
        
      default: throw new Error(`Unknown fighter id: ${id}. Fighter not implemented yet!`);
    }
  }

  getFighterEntity(fighterState, index) {
    const FighterEntityClass = this.getFighterEntityClass(fighterState.id);

    const fighter = new FighterEntityClass(index, this.handleAttackHit.bind(this));
    fighter.onGroundImpact = this.addEntity.bind(this, GroundDust);

    return fighter;
  }

  getFighterEntities() {
    const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));

    fighterEntities[0].opponent = fighterEntities[1];
    fighterEntities[1].opponent = fighterEntities[0];

    return fighterEntities;
  }

  getHitSplashClass(strength) {
    switch (strength) {
      case FighterAttackStrength.LIGHT:  return HitSplashLight;
      case FighterAttackStrength.MEDIUM: return HitSplashMedium;
      case FighterAttackStrength.HEAVY:  return HitSplashHeavy;

      default: throw new Error(`Unknown strength: ${strength}`);
    }
  }

  addEntity(EntityClass, ...args) {
    this.entities.push(new EntityClass(...args, this.removeEntity.bind(this)));
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity);

    if (index < 0) return;

    this.entities.splice(index, 1);
  }

  handleAttackHit(time, playerId, opponentId, position, strength, blocked = false) {
    if (!blocked) {
      gameState.fighters[playerId].score       += FighterAttackBaseData[strength].score;
      gameState.fighters[opponentId].hitPoints -= FighterAttackBaseData[strength].damage;
    }

    this.hurtTimer = time.previous + (blocked ? 14 : FIGHTER_HURT_DELAY) * FRAME_TIME;
    this.fighterDrawOrder = [opponentId, playerId];

    this.addEntity(
      blocked ? BlockSplash : this.getHitSplashClass(strength),
      position.x, position.y, playerId,
    );
    this.stage.handleAttackHit?.();
  }

  startRound(time) {
    this.roundNumber += 1;
    this.roundState = RoundState.ROUND;
    this.roundStartedAt = time?.previous;
    this.roundTime = 0;
    this.hurtTimer = 0;
    this.entities = [];
    this.fighterDrawOrder = [0, 1];

    this.winnerId = null;
    this.bonus = undefined;
    this.stage.setFightOver(false);
    this.stage.resetDecorations();

    for (const fighter of gameState.fighters) fighter.hitPoints = HEALTH_MAX_HIT_POINTS;

    this.fighters = this.getFighterEntities();

    for (const fighter of this.fighters) fighter.changeState(FighterState.IDLE, this.worldTime);

    this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - (SCREEN_WIDTH / 2), 16, this.fighters);
    this.shadows = this.fighters.map(fighter => new Shadow(fighter, this.stage.constructor.name));
    this.statusBar.resetRound(time ?? { previous: 0 });

    if (this.announcerSound) stopSound(this.announcerSound);

    this.announcerQueue = [
      [16, this.roundNumber >= 10 ? "final" : "round"],
      [56, this.roundNumber >= 10 ? "round" : String(this.roundNumber)],
    ];

    if (this.stageMusic) stopSound(this.stageMusic);

    stopSound(this.scoreSound);
    this.stageMusic = this.stage.music;
    playSound(this.stageMusic, 0.35);
  }

  finishRound(time) {
    const [fighter1, fighter2] = gameState.fighters;
    if (fighter1.hitPoints > 0 && fighter1.hitPoints > fighter2.hitPoints) this.winnerId = 0;
    else if (fighter2.hitPoints > 0 && fighter2.hitPoints > fighter1.hitPoints) this.winnerId = 1;

    const knockout = fighter1.hitPoints <= 0 || fighter2.hitPoints <= 0;
    this.roundState = knockout ? RoundState.KO_IMPACT : RoundState.ROUND_OVER;
    this.roundStartedAt = time.previous;
    this.statusBar.timerRunning = false;
    this.nextWorldFrame = time.previous + FRAME_TIME;
  }

  startResult(time) {
    for (const fighter of this.fighters) {
      fighter.resetSlide();
      if (fighter.playerId === this.winnerId) {
        fighter.changeState(FighterState.WINNER_POSE, this.worldTime);
      } else if (gameState.fighters[fighter.playerId].hitPoints > 0) {
        fighter.changeState(FighterState.LOSER_POSE, this.worldTime);
      }
    }

    this.roundState = this.winnerId === null ? RoundState.DRAW : RoundState.WINNER;
    this.roundStartedAt = time.previous;

    if (this.winnerId === null) return;

    this.announcerQueue = [[0, "you"], [10, "win"]];
    this.stageMusic.volume = 0.2;

    this.roundWins[this.winnerId] += 1;
    this.stage.setFightOver(true);
    const health = gameState.fighters[this.winnerId].hitPoints;
    const timePoints = Math.max(0, this.statusBar.time) * 100;
    const vitalPoints = health === HEALTH_MAX_HIT_POINTS ? PERFECT_BONUS : health * 100;

    this.bonus = {
      time: timePoints,
      vital: vitalPoints,
      total: 0,
      timeLeft: timePoints,
      vitalLeft: vitalPoints,
      ticks: 0,
      targetTicks: 0,
      lastBonusFrame: 0,
    };
  }

  updateRoundStart(time, framesElapsed) {
    if (this.roundState === RoundState.ROUND && framesElapsed >= RoundDelay.ROUND) {
      this.roundState = RoundState.FIGHT;
      this.roundStartedAt += RoundDelay.ROUND * FRAME_TIME;
      this.announcerQueue = [[8, "fight"]];
    } else if (this.roundState === RoundState.FIGHT && framesElapsed >= RoundDelay.FIGHT) {
      this.roundState = RoundState.ACTIVE;
      this.statusBar.timerRunning = true;
      this.statusBar.timeTimer = time.previous;
    }
  }

  updateRoundEnd(time, framesElapsed) {
    switch (this.roundState) {
      case RoundState.KO_IMPACT:
        if (this.worldTime.previous < this.hurtTimer) return;

        for (const fighter of this.fighters) {
          if (gameState.fighters[fighter.playerId].hitPoints > 0) continue;

          fighter.knockdown = false;
          fighter.changeState(FighterState.KO_AIRBORNE, this.worldTime);
        }

        this.roundState = RoundState.KO_SLOW;
        this.roundStartedAt = time.previous;
        this.nextWorldFrame = time.previous + 3 * FRAME_TIME;
      break;
      case RoundState.KO_SLOW:
        if (Math.round(time.previous) < Math.round(this.roundStartedAt + RoundDelay.KO_SLOW * FRAME_TIME)) return;

        this.roundState = RoundState.ROUND_OVER;
        this.roundStartedAt = time.previous;
        this.nextWorldFrame = time.previous + FRAME_TIME;
      break;
      case RoundState.ROUND_OVER:
        if (framesElapsed < RoundDelay.ROUND_OVER) return;
        if (!this.fighters.every(fighter => fighter.isRoundEndReady())) return;

        if (gameState.fighters.every(fighter => fighter.hitPoints > 0)) {
          this.roundState = RoundState.TIME_OVER;
          this.roundStartedAt = time.previous;
        } else this.startResult(time);
      break;
    }
  }

  updateRoundResult(time, framesElapsed) {
    switch (this.roundState) {
      case RoundState.TIME_OVER:
        if (framesElapsed >= RoundDelay.TIME_OVER) this.startResult(time);
      break;
      case RoundState.WINNER:
        if (framesElapsed < RoundDelay.WINNER) return;

        this.roundState = RoundState.BONUS;
        this.roundStartedAt = time.previous;
        this.announcerQueue = this.bonus.vital === PERFECT_BONUS ? [[BonusDelay.VITAL, "perfect"]] : [];
      break;
      case RoundState.BONUS:
        this.updateBonus(time, framesElapsed);
      break;
      case RoundState.BONUS_WAIT:
      case RoundState.DRAW:
        if (framesElapsed < RoundDelay[this.roundState]) return;

        this.roundState = RoundState.FADE_OUT;
        this.roundStartedAt = time.previous;
      break;
    }
  }

  updateRoundFade(time, framesElapsed) {
    if (this.roundState === RoundState.FADE_OUT && framesElapsed >= RoundDelay.FADE_OUT) {
      this.roundState = RoundState.FADE_WAIT;
      this.roundStartedAt += RoundDelay.FADE_OUT * FRAME_TIME;
    } else if (this.roundState === RoundState.FADE_WAIT && framesElapsed >= RoundDelay.FADE_WAIT) {
      if (this.roundWins.includes(2)) {
        stopSound(this.stageMusic);
        stopSound(this.scoreSound);
        if (this.announcerSound) stopSound(this.announcerSound);

        this.changeScene(ResultScene, this.winnerId);
      } else this.startRound(time);
    }
  }

  updateRound(time) {
    const framesElapsed = Math.round((time.previous - this.roundStartedAt) / FRAME_TIME);

    switch (this.roundState) {
      case RoundState.ROUND:
      case RoundState.FIGHT:
        this.updateRoundStart(time, framesElapsed);
      break;
      case RoundState.KO_IMPACT:
      case RoundState.KO_SLOW:
      case RoundState.ROUND_OVER:
        this.updateRoundEnd(time, framesElapsed);
      break;
      case RoundState.FADE_OUT:
      case RoundState.FADE_WAIT:
        this.updateRoundFade(time, framesElapsed);
      break;
      default: this.updateRoundResult(time, framesElapsed);
    }

    this.roundTime = (time.previous - this.roundStartedAt) / FRAME_TIME;

    if (this.roundState !== RoundState.ACTIVE) return;

    const [fighter1, fighter2] = gameState.fighters;
    if (fighter1.hitPoints > 0 && fighter2.hitPoints > 0 && this.statusBar.time > 0) return;

    this.finishRound(time);
  }

  updateBonus(time, framesElapsed) {
    let playScoreSound = false;
    const bonusFramesElapsed = Math.max(0, framesElapsed - BonusDelay.TOTAL);
    const elapsedBonusFrames = bonusFramesElapsed - this.bonus.lastBonusFrame;

    if (elapsedBonusFrames > 0) {
      const attackHeld = isAttackButtonDown(0) || isAttackButtonDown(1);
      this.bonus.targetTicks += elapsedBonusFrames * (attackHeld ? BONUS_SCORE_SPEED_MULTIPLIER : 1);
      this.bonus.lastBonusFrame = bonusFramesElapsed;
    }

    while (this.bonus.ticks < this.bonus.targetTicks && (this.bonus.timeLeft || this.bonus.vitalLeft)) {
      const timePoints = Math.min(100, this.bonus.timeLeft);
      const vitalPoints = Math.min(100, this.bonus.vitalLeft);

      this.bonus.timeLeft -= timePoints;
      this.bonus.vitalLeft -= vitalPoints;
      this.bonus.total += timePoints + vitalPoints;
      gameState.fighters[this.winnerId].score += timePoints + vitalPoints;
      this.bonus.ticks += 1;

      if (this.bonus.ticks % BonusDelay.SOUND === 0) playScoreSound = true;
    }

    if (playScoreSound) playSound(this.scoreSound);

    if (framesElapsed >= BonusDelay.TOTAL && this.bonus.timeLeft === 0 && this.bonus.vitalLeft === 0) {
      this.roundState = RoundState.BONUS_WAIT;
      this.roundStartedAt = time.previous;
    }
  }

  updateFighters(time, context) {
    for (const fighter of this.fighters) {
      if (this.stage.isFighterPaused(fighter, time)) continue;
      if (this.roundState === RoundState.ROUND || this.roundState === RoundState.FIGHT) {
        fighter.updateAnimation(time);
        continue;
      }

      if (this.roundState === RoundState.KO_IMPACT) {
        fighter.updateHurtShake(time, this.hurtTimer);
        continue;
      }
      
      if (this.roundState !== RoundState.ACTIVE) {
        fighter.updateRoundEnd(time, context, this.camera);
        continue;
      }

      if (time.previous < this.hurtTimer) {
        fighter.updateHurtShake(time, this.hurtTimer);
      } else fighter.update(time, context, this.camera);
    }
  }

  updateShadows( time, context) {
    for (const shadow  of  this.shadows)  shadow.update(time, context, this.camera);
  }

  updateEntities(time, context) {
    for (const entity of [...this.entities]) entity.update(time, context, this.camera);
  }

  updateOverlays(time, context) {
    for (const overlay of this.overlays) overlay.update(time, context, this.camera);
  }

  updateAnnouncer() {
    if (this.announcerSound && !this.announcerSound.paused && !this.announcerSound.ended) return;

    let soundName;
    while (this.announcerQueue.length && Math.round(this.roundTime) >= this.announcerQueue[0][0]) {
      soundName = this.announcerQueue.shift()[1];
    }

    if (!soundName) return;

    this.announcerSound = document.querySelector(`audio#announcer-${soundName}`);
    playSound(this.announcerSound);
  }

  updateStageMusic() {
    if (this.roundState !== RoundState.ACTIVE || this.stageMusic !== this.stage.music) return;
    if (gameState.fighters.every(fighter => fighter.hitPoints >= MUSIC_CRITICAL_HIT_POINTS)) return;

    stopSound(this.stageMusic);
    this.stageMusic = document.querySelector(`audio#${this.stage.music.id}-critical`);
    playSound(this.stageMusic, 0.35);
  }

  updateWorld(time, context) {
    this.stage.updateDecorations(time, time.previous < this.hurtTimer ? [] : this.fighters);
    this.updateFighters(time, context);
    this.updateShadows( time, context);
    this.stage.update(  time         );
    this.updateEntities(time, context);
    this.camera.update( time, context);
    for (const fighter of this.fighters) {
      if (fighter.currentState === FighterState.HURT_AIR
        || fighter.currentState.startsWith("KO_") || fighter.currentState.startsWith("SWEEP_")) {
        fighter.updateKnockbackConstraints(time, context, this.camera);
      }
    }
  }

  update(time, context) {
    if (this.roundStartedAt === undefined) {
      this.roundStartedAt = time.previous;

      this.worldTime = { previous: time.previous, secondsPassed: 0 };

      for (const fighter of this.fighters) fighter.changeState(FighterState.IDLE, this.worldTime);

      this.updateWorld(this.worldTime, context);
    } else if ([RoundState.ROUND, RoundState.FIGHT, RoundState.ACTIVE].includes(this.roundState)) {
      this.worldTime = {
        previous: this.worldTime.previous + time.secondsPassed * 1000,
        secondsPassed: time.secondsPassed
      };

      this.updateWorld(this.worldTime, context);
    } else {
      let frameDelay = FRAME_TIME;
      let updateUntil = time.previous;
      if (this.roundState === RoundState.KO_SLOW) {
        frameDelay = 3 * FRAME_TIME;
        updateUntil = Math.min(time.previous, this.roundStartedAt + RoundDelay.KO_SLOW * FRAME_TIME);
      }

      while (Math.round(updateUntil) >= Math.round(this.nextWorldFrame)) {
        this.worldTime = { previous: this.worldTime.previous + FRAME_TIME, secondsPassed: 1 / FPS };
        this.updateWorld(this.worldTime, context);
        this.nextWorldFrame += frameDelay;
      }
    }

    this.updateOverlays(time, context);
    this.updateStageMusic();
    this.updateRound(   time         );
    this.updateAnnouncer();
  }

  drawFighters(context) {
    for (const fighterId of this.fighterDrawOrder) this.fighters[fighterId].draw(context, this.camera);
  }

  drawShadows( context) {
    for (const shadow  of  this.shadows)  shadow.draw(context, this.camera);
  }

  drawEntities(context) {
    for (const entity  of this.entities)  entity.draw(context, this.camera);
  }

  drawOverlays(context) {
    for (const overlay of this.overlays) overlay.draw(context, this.camera);
  }

  drawBonus(context) {
    this.statusBar.drawBonus(
      context, this.bonus,
      this.roundState === RoundState.BONUS ? Math.round(this.roundTime) : BonusDelay.TOTAL,
    );
  }

  drawRoundStart(context) {
    if (this.roundState === RoundState.FIGHT) {
      this.statusBar.drawAnnouncementFrame(
        context, "fight!", (SCREEN_WIDTH - this.statusBar.frames.get("fight!")[2]) / 2,
        Math.min(1, this.roundTime / 8),
      );

      return;
    }

    const roundFrames = ["round"];
    for (const digit of String(this.roundNumber)) roundFrames.push(`round-${digit}`);

    let textWidth = (roundFrames.length - 1) * 8;
    for (const frameKey of roundFrames) textWidth += this.statusBar.frames.get(frameKey)[2];

    let left = (SCREEN_WIDTH - textWidth) / 2;
    const animationProgress = Math.max(0, Math.min(1, this.roundTime / 16, (RoundDelay.ROUND - this.roundTime) / 16));

    for (const frameKey of roundFrames) {
      this.statusBar.drawAnnouncementFrame(context, frameKey, left, animationProgress);
      left += this.statusBar.frames.get(frameKey)[2] + 8;
    }

    const battle = `BATTLE ${String(this.battleNumber).padStart(2, "0")}`;

    for (const index in battle) {
      this.statusBar.drawFrame(
        context, `score-small-${battle.charAt(index)}`,
        SCREEN_WIDTH / 2 - battle.length * 4 + index * 8, 120,
      );
    }
  }

  drawAnnouncement(context) {
    switch (this.roundState) {
      case RoundState.ROUND:
      case RoundState.FIGHT:
        this.drawRoundStart(context);
      break;
      case RoundState.TIME_OVER:
        this.statusBar.drawFrame(context, "time-over", 160, 80);
      break;
      case RoundState.DRAW:
        this.statusBar.drawFrame(context, "draw-game", 162, 80);
      break;
      case RoundState.WINNER:
        this.statusBar.drawWinner(context, this.winnerId);
      break;
      case RoundState.BONUS:
      case RoundState.BONUS_WAIT:
        this.drawBonus(context);
      break;
      case RoundState.FADE_OUT:
        if (this.winnerId === null) this.statusBar.drawFrame(context, "draw-game", 162, 80);
        else this.drawBonus(context);
      break;
    }
  }

  drawRoundFade(context) {
    const fadeStep = Math.min(15, Math.floor(Math.round(this.roundTime) / 3));
    let opacity = 1;

    if (this.roundState === RoundState.FADE_OUT) opacity = (fadeStep / 15) * (this.roundWins.includes(2) ? 1 : 2 / 3);
    else if (this.roundState === RoundState.ROUND && this.roundNumber > 1 && this.roundTime < RoundDelay.FADE_OUT) {
      opacity = ((15 - fadeStep) / 15) * (2 / 3);
    } else if (this.roundState !== RoundState.FADE_WAIT) return;

    context.save();
    context.fillStyle = "black";
    context.globalAlpha = opacity;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  draw(context) {
    this.stage.drawBackground(context, this.camera);
    this.drawShadows( context);
    this.drawFighters(context);
    this.drawEntities(context);
    this.stage.drawForeground(context, this.camera);
    this.drawOverlays(context);
    this.drawAnnouncement(context);
    this.drawRoundFade(context);
  }
}
