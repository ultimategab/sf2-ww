import {
  FIGHTER_START_DISTANCE,
  FIGHTER_PUSH_FRICTION,
  FIGHTER_HURT_DELAY,
  FighterDirection,
  FighterAttackType,
  FighterAttackReaction,
  FighterAttackStrength,
  FighterState,
  FrameDelay,
  FighterHurtBox,
  HurtStateValidFrom,
  FighterAttackBaseData,
  FighterKnockoutWidth,
  JumpStates,
  JumpAttackStates,
  CrouchAttackStates,
  CrouchHurtStates,
  CrouchAttackStateValidFrom,
  StandingAttackStateValidFrom,
  CrouchingStates,
  BlockStates,
  BlockStateValidFrom,
  IdleStateValidFrom,
} from "../../constants/fighter.js";
import { ENABLE_DEBUG, FRAME_TIME } from "../../constants/game.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from "../../constants/stage.js";
import * as control from "../../engine/InputHandler.js";
import { playSound, stopSound } from "../../engine/soundHandler.js";
import { boxOverlap, getActualBoxDimensions, rectsOverlap } from "../../utils/collisions.js";
import * as DEBUG from "../../utils/fighterDebug.js";

export class Fighter {
  frames = new Map();
  image = new Image();

  animations = {};
  animationFrame = 0;
  animationTimer = 0;

  animationSound = undefined;

  currentState = FighterState.IDLE;
  opponent = undefined;

  onGroundImpact = undefined;

  hurtShake = 0;
  hurtShakeTimer = 0;
  hurtStateTimer = 0;
  hurtAirStarted = false;
  hurtAirWallTimer = 0;
  slideVelocity = 0;
  slideFriction = 0;

  gravity = 0;
  velocity = { x: 0, y: 0 };
  initialVelocity = {};
  jumpAcceleration = 0;
  jumpState = FighterState.JUMP_UP;
  jumpAttackLoopFrames = {};
  crouchAttackAnimations = {};
  attackStruck = false;

  blockTimer = 0;
  blockFrame = 0;
  sweepTimer = 0;

  knockoutWallTimer = 0;
  knockdown = false;
  knockdownAnimation = [];
  knockoutAnimation = undefined;
  winnerAnimations = [];
  winnerLoopFrames = [0, 0];
  winnerPose = 0;

  boxes = {
    push: { x: 0, y: 0, width: 0, height: 0 },
    hit:  { x: 0, y: 0, width: 0, height: 0 },
    hurt: {
      [FighterHurtBox.HEAD]: [0, 0, 0, 0], 
      [FighterHurtBox.BODY]: [0, 0, 0, 0], 
      [FighterHurtBox.FEET]: [0, 0, 0, 0], 
    },
  };

  states = {
    [FighterState.IDLE]: {
      init:   this.handleIdleInit.bind(this),
      update: this.handleIdleState.bind(this),
      validFrom: IdleStateValidFrom,
    },
    [FighterState.WALK_FORWARD]: {
      init:   this.handleMoveInit.bind(this),
      update: this.handleWalkForwardsState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD],
    },
    [FighterState.WALK_BACKWARD]: {
      init:   this.handleMoveInit.bind(this),
      update: this.handleWalkBackwardsState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD],
    },
    [FighterState.JUMP_START]: {
      init:   this.handleJumpStartInit.bind(this),
      update: this.handleJumpStartState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.JUMP_LAND, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
    },
    [FighterState.JUMP_UP]: {
      init:   this.handleJumpInit.bind(this),
      update: this.handleJumpState.bind(this),
      validFrom: [FighterState.JUMP_START],
    },
    [FighterState.JUMP_FORWARD]: {
      init:   this.handleJumpInit.bind(this),
      update: this.handleJumpState.bind(this),
      validFrom: [FighterState.JUMP_START],
    },
    [FighterState.JUMP_BACKWARD]: {
      init:   this.handleJumpInit.bind(this),
      update: this.handleJumpState.bind(this),
      validFrom: [FighterState.JUMP_START],
    },
    [FighterState.JUMP_LAND]: {
      init:   this.handleJumpLandInit.bind(this),
      update: this.handleJumpLandState.bind(this),
      validFrom: [...JumpStates, ...JumpAttackStates, FighterState.HURT_AIR],
    },
    [FighterState.CROUCH]: {
      init:   () => {},
      update: this.handleCrouchState.bind(this),
      validFrom: [
        FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN,
        ...CrouchAttackStates, ...BlockStates,
        ...CrouchHurtStates,
      ],
    },
    [FighterState.CROUCH_DOWN]: {
      init:   this.handleCrouchDownInit.bind(this),
      update: this.handleCrouchDownState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
    },
    [FighterState.CROUCH_UP]: {
      init:   () => {},
      update: this.handleCrouchUpState.bind(this),
      validFrom: [FighterState.CROUCH],
    },
    [FighterState.IDLE_TURN]: {
      init:   () => {},
      update: this.handleIdleTurnState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.JUMP_LAND, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
    },
    [FighterState.CROUCH_TURN]: {
      init:   () => {},
      update: this.handleCrouchTurnState.bind(this),
      validFrom: [FighterState.CROUCH],
    },
    [FighterState.LIGHT_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleLightPunchState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.MEDIUM_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleMediumPunchState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.HEAVY_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleMediumPunchState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.LIGHT_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleLightKickState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.MEDIUM_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleMediumKickState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.HEAVY_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleStandardAttackInit.bind(this),
      update: this.handleMediumKickState.bind(this),
      validFrom: StandingAttackStateValidFrom,
    },
    [FighterState.CROUCH_LIGHT_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.CROUCH_MEDIUM_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.CROUCH_HEAVY_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.CROUCH_LIGHT_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.CROUCH_MEDIUM_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.CROUCH_HEAVY_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleCrouchAttackInit.bind(this),
      update: this.handleCrouchAttackState.bind(this),
      validFrom: CrouchAttackStateValidFrom,
    },
    [FighterState.JUMP_UP_LIGHT_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_UP_MEDIUM_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_UP_HEAVY_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_UP_LIGHT_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_UP_MEDIUM_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_UP_HEAVY_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_LIGHT_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_HEAVY_PUNCH]: {
      attackType: FighterAttackType.PUNCH,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_LIGHT_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_MEDIUM_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.JUMP_DIAGONAL_HEAVY_KICK]: {
      attackType: FighterAttackType.KICK,
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleJumpAttackInit.bind(this),
      update: this.handleJumpAttackState.bind(this),
      validFrom: JumpStates,
    },
    [FighterState.BLOCK_STAND]: {
      init:   this.handleIdleInit.bind(this),
      update: this.handleBlockState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_STAND_LIGHT]: {
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_STAND_MEDIUM]: {
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_STAND_HEAVY]: {
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_CROUCH]: {
      init:   this.handleIdleInit.bind(this),
      update: this.handleBlockState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_CROUCH_LIGHT]: {
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_CROUCH_MEDIUM]: {
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.BLOCK_CROUCH_HEAVY]: {
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleBlockHitInit.bind(this),
      update: this.handleBlockHitState.bind(this),
      validFrom: BlockStateValidFrom,
    },
    [FighterState.HURT_CROUCH_LIGHT]: {
      attackStrength: FighterAttackStrength.LIGHT,
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_CROUCH_MEDIUM]: {
      attackStrength: FighterAttackStrength.MEDIUM,
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_CROUCH_HEAVY]: {
      attackStrength: FighterAttackStrength.HEAVY,
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_HEAD_LIGHT]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_HEAD_MEDIUM]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_HEAD_HEAVY]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_BODY_LIGHT]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_BODY_MEDIUM]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_BODY_HEAVY]: {
      init:   this.handleHurtInit.bind(this),
      update: this.handleHurtState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.HURT_AIR]: {
      init:   this.handleHurtAirInit.bind(this),
      update: this.handleHurtAirState.bind(this),
      validFrom: [...JumpStates, ...JumpAttackStates],
    },
    [FighterState.SWEEP_FALL]: {
      init:   this.handleSweepInit.bind(this),
      update: this.handleSweepState.bind(this),
      validFrom: HurtStateValidFrom,
    },
    [FighterState.SWEEP_GROUNDED]: {
      init:   this.handleSweepGroundInit.bind(this),
      update: this.handleSweepGroundState.bind(this),
      validFrom: [FighterState.SWEEP_FALL],
    },
    [FighterState.GETUP]: {
      init:   this.handleIdleInit.bind(this),
      update: this.handleGetupState.bind(this),
      validFrom: [FighterState.SWEEP_GROUNDED, FighterState.KO_GROUNDED],
    },
    [FighterState.KO_AIRBORNE]: {
      init:   this.handleKnockoutInit.bind(this),
      update: this.handleKnockoutState.bind(this),
      validFrom: Object.values(FighterState),
    },
    [FighterState.KO_IMPACT]: {
      init:   this.resetVelocities.bind(this),
      update: this.handleKnockoutState.bind(this),
      validFrom: [FighterState.KO_AIRBORNE],
    },
    [FighterState.KO_BOUNCE]: {
      init:   this.handleKnockoutBounceInit.bind(this),
      update: this.handleKnockoutState.bind(this),
      validFrom: [FighterState.KO_IMPACT],
    },
    [FighterState.KO_GROUNDED]: {
      init:   this.handleKnockoutGroundInit.bind(this),
      update: this.handleKnockoutState.bind(this),
      validFrom: [FighterState.KO_BOUNCE],
    },
    [FighterState.WINNER_POSE]: {
      init:   this.handleWinnerPoseInit.bind(this),
      update: this.handleWinnerPoseState.bind(this),
      validFrom: Object.values(FighterState),
    },
    [FighterState.LOSER_POSE]: {
      init:   this.handleIdleInit.bind(this),
      update: () => {},
      validFrom: Object.values(FighterState),
    },
  };

  attackStrengthSounds = {
    [FighterAttackStrength.LIGHT]:  document.querySelector("audio#light-attack"),
    [FighterAttackStrength.MEDIUM]: document.querySelector("audio#medium-attack"),
    [FighterAttackStrength.HEAVY]:  document.querySelector("audio#heavy-attack"),
  };

  hitStrengthSounds = {
    [FighterAttackStrength.LIGHT]: {
      [FighterAttackType.PUNCH]: document.querySelector("audio#light-punch-hit"),
      [FighterAttackType.KICK]:  document.querySelector("audio#light-kick-hit"),
    },
    [FighterAttackStrength.MEDIUM]: {
      [FighterAttackType.PUNCH]: document.querySelector("audio#medium-punch-hit"),
      [FighterAttackType.KICK]:  document.querySelector("audio#medium-kick-hit"),
    },
    [FighterAttackStrength.HEAVY]: {
      [FighterAttackType.PUNCH]: document.querySelector("audio#heavy-punch-hit"),
      [FighterAttackType.KICK]:  document.querySelector("audio#heavy-kick-hit"),
    },
  };

  landSound =     document.querySelector("audio#land");
  thudSound =     document.querySelector("audio#thud");
  knockoutSound = document.querySelector("audio#male-ko");
  blockSound =    document.querySelector("audio#block");

  constructor(playerId, onAttackHit) {
    this.playerId = playerId;
    this.onAttackHit = onAttackHit;
    this.position = { x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE), y: STAGE_FLOOR };
    this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;
  }

  hasCollidedWithOpponent = () =>
    rectsOverlap(
      this.position.x + this.boxes.push.x,
      this.position.y + this.boxes.push.y,
      this.boxes.push.width,
      this.boxes.push.height,
      this.opponent.position.x + this.opponent.boxes.push.x,
      this.opponent.position.y + this.opponent.boxes.push.y,
      this.opponent.boxes.push.width,
      this.opponent.boxes.push.height,
    );

  resetVelocities() {
    this.velocity = { x: 0, y: 0 };
  }

  resetSlide(transferToOpponent = false) {
    if (transferToOpponent) {
      this.opponent.slideVelocity = -this.slideVelocity * this.direction * this.opponent.direction;
      this.opponent.slideFriction = this.slideFriction;
    }

    this.slideFriction = 0;
    this.slideVelocity = 0;
  }

  getDirection() {
    if (this.position.x + this.boxes.push.x + this.boxes.push.width <= this.opponent.position.x + this.opponent.boxes.push.x) {
      return FighterDirection.RIGHT;
    } else if (this.position.x + this.boxes.push.x >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width) {
      return FighterDirection.LEFT;
    }

    return this.direction;
  }

  getBoxes(frameKey) {
    const [
      ,
      [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
      [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
      [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
      attack = FighterAttackReaction.NORMAL,
    ] = this.frames.get(frameKey) ?? [];

    return {
      push: { x: pushX, y: pushY, width: pushWidth, height: pushHeight },
      hit:  { x: hitX,  y: hitY,  width: hitWidth,  height: hitHeight  },
      attack,
      hurt: {
        [FighterHurtBox.HEAD]: head, 
        [FighterHurtBox.BODY]: body, 
        [FighterHurtBox.FEET]: feet, 
      },
    };
  }

  getHurtState(attackStrength, hitLocation) {
    if (CrouchingStates.includes(this.currentState)) {
      switch (attackStrength) {
        case FighterAttackStrength.LIGHT:  return FighterState.HURT_CROUCH_LIGHT;
        case FighterAttackStrength.MEDIUM: return FighterState.HURT_CROUCH_MEDIUM;
        case FighterAttackStrength.HEAVY:  return FighterState.HURT_CROUCH_HEAVY;
      }
    }

    switch (attackStrength) {
      case FighterAttackStrength.LIGHT:
        if (hitLocation === FighterHurtBox.HEAD) return FighterState.HURT_HEAD_LIGHT;
        return FighterState.HURT_BODY_LIGHT;
      case FighterAttackStrength.MEDIUM:
        if (hitLocation === FighterHurtBox.HEAD) return FighterState.HURT_HEAD_MEDIUM;
        return FighterState.HURT_BODY_MEDIUM;
      case FighterAttackStrength.HEAVY:
        if (hitLocation === FighterHurtBox.HEAD) return FighterState.HURT_HEAD_HEAVY;
        return FighterState.HURT_BODY_HEAVY;
    }
  }

  isBlockThreat() {
    return Boolean(this.opponent.states[this.opponent.currentState].attackType)
      && Math.abs(this.position.x - this.opponent.position.x) <= 224;
  }

  canBlock(attack, hitLocation) {
    if (!BlockStateValidFrom.includes(this.currentState) || this.position.y < STAGE_FLOOR) return false;
    const blockStun = BlockStates.includes(this.currentState) && this.states[this.currentState].attackStrength;
    if (!blockStun && (!control.isBackward(this.playerId, this.direction) || this.getDirection() !== this.direction)) return false;

    if (control.isDown(this.playerId)) {
      return attack !== FighterAttackReaction.JUMP && attack !== FighterAttackReaction.KNOCKDOWN;
    }
    return attack !== FighterAttackReaction.SWEEP
      && (attack === FighterAttackReaction.JUMP || attack === FighterAttackReaction.KNOCKDOWN
        || hitLocation !== FighterHurtBox.FEET);
  }

  getBlockState(attackStrength) {
    if (control.isDown(this.playerId)) {
      switch (attackStrength) {
        case FighterAttackStrength.LIGHT:  return FighterState.BLOCK_CROUCH_LIGHT;
        case FighterAttackStrength.MEDIUM: return FighterState.BLOCK_CROUCH_MEDIUM;
        case FighterAttackStrength.HEAVY:  return FighterState.BLOCK_CROUCH_HEAVY;
      }
    }

    switch (attackStrength) {
      case FighterAttackStrength.LIGHT:  return FighterState.BLOCK_STAND_LIGHT;
      case FighterAttackStrength.MEDIUM: return FighterState.BLOCK_STAND_MEDIUM;
      case FighterAttackStrength.HEAVY:  return FighterState.BLOCK_STAND_HEAVY;
    }
  }

  isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;

  setAnimationFrame(frame, time) {
    const animation = this.animations[this.currentState];
    
    this.animationFrame = frame;
    if (this.animationFrame >= animation.length) this.animationFrame = 0;

    const [frameKey, frameDelay, sound] = animation[this.animationFrame];
    this.boxes = this.getBoxes(frameKey);
    if (this.boxes.hit.width === 0 || this.boxes.hit.height === 0) this.attackStruck = false;

    this.animationTimer = time.previous + frameDelay * FRAME_TIME;

    if (sound) {
      if (this.animationSound) stopSound(this.animationSound);
      this.animationSound = document.querySelector(`audio#${sound}`);
      playSound(this.animationSound);
    }
  }

  changeState(newState, time) {
    if (!this.states[newState].validFrom.includes(this.currentState)) {
      if (ENABLE_DEBUG) console.log(`Illegal transition from "${this.currentState} to ${newState}"`);

      return;
    }

    this.currentState = newState;
    this.setAnimationFrame(0, time);

    this.states[this.currentState].init(time);
  }

  // Init States

  handleIdleInit() {
    this.resetVelocities();
    this.attackStruck = false;
    this.blockFrame = 0;
    this.knockdown = false;
  }

  handleMoveInit() {
    this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
  }

  handleJumpInit() {
    this.jumpState = this.currentState;
    this.velocity.y = this.initialVelocity.jump[this.currentState];
    this.handleMoveInit();
  }

  handleCrouchDownInit() {
    this.resetVelocities();
  }

  handleJumpStartInit() {
    this.resetVelocities();
  }

  handleJumpLandInit() {
    this.resetVelocities();
    playSound(this.landSound);
  }

  handleStandardAttackInit() {
    this.resetVelocities();
    this.attackStruck = false;
    playSound(this.attackStrengthSounds[this.states[this.currentState].attackStrength]);
  }

  handleCrouchAttackInit(time) {
    this.handleStandardAttackInit();
    if (!this.crouchAttackAnimations[this.currentState]) return;

    const [distance, farAnimation, closeAnimation] = this.crouchAttackAnimations[this.currentState];
    this.animations[this.currentState] = Math.abs(this.position.x - this.opponent.position.x) <= distance
      ? closeAnimation : farAnimation;
    this.setAnimationFrame(0, time);
  }

  handleJumpAttackInit() {
    this.attackStruck = false;
    playSound(this.attackStrengthSounds[this.states[this.currentState].attackStrength]);
  }

  handleBlockHitInit() {
    this.resetVelocities();
    this.resetSlide();
    this.blockTimer = 0;
    this.blockFrame = 0;
  }

  handleSweepInit() {
    this.direction = -this.opponent.direction;
    this.resetSlide();
    this.hurtShake = 0;
    this.velocity = { x: -120, y: -345 };
  }

  handleSweepGroundInit(time) {
    this.resetVelocities();
    this.sweepTimer = time.previous + 12 * FRAME_TIME;
  }

  handleHurtInit(time) {
    this.resetVelocities();
    this.hurtStateTimer = 0;
    this.hurtShake = 2;
    this.hurtShakeTimer = time.previous + FRAME_TIME;
  }

  handleHurtAirInit() {
    this.direction = -this.opponent.direction;
    this.resetSlide();
    this.hurtShake = 0;
    this.hurtShakeTimer = 0;
    this.hurtAirStarted = false;
    this.hurtAirWallTimer = 0;
    this.velocity = { x: -120, y: -345 };
  }

  handleKnockoutInit(time) {
    this.resetSlide();
    this.hurtShake = 0;
    this.knockoutWallTimer = 0;
    if (this.knockdown) {
      if (!this.knockoutAnimation) this.knockoutAnimation = this.animations[FighterState.KO_AIRBORNE];
      this.animations[FighterState.KO_AIRBORNE] = this.knockdownAnimation;
      this.setAnimationFrame(0, time);
      this.velocity = { x: -120, y: -360 };
      return;
    }

    if (this.knockoutAnimation) {
      this.animations[FighterState.KO_AIRBORNE] = this.knockoutAnimation;
      this.setAnimationFrame(0, time);
    }

    playSound(this.knockoutSound);
    this.position.y = Math.min(this.position.y, STAGE_FLOOR) - 16;
    this.velocity = { x: -180, y: -420 };
  }

  handleKnockoutBounceInit() {
    this.velocity = { x: -150, y: this.knockdown ? -150 : -180 };
  }

  handleKnockoutGroundInit() {
    this.velocity = { x: -60, y: 0 };
  }

  handleWinnerPoseInit(time) {
    this.handleIdleInit();
    this.winnerPose = Math.floor(Math.random() * 2);
    this.animations[FighterState.WINNER_POSE] = this.winnerAnimations[this.winnerPose];
    this.setAnimationFrame(0, time);
  }

  // Update States

  handleIdleState(time) {
    const newDirection = this.getDirection();

    if (newDirection !== this.direction) {
      this.direction = newDirection;
      this.changeState(FighterState.IDLE_TURN, time);
    }

    if (control.isUp(this.playerId)) {
      this.changeState(FighterState.JUMP_START, time);
    } else if (control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_DOWN, time);
    } else if (control.isBackward(this.playerId, this.direction)) {
      this.changeState(this.isBlockThreat() ? FighterState.BLOCK_STAND : FighterState.WALK_BACKWARD, time);
    } else if (control.isForward(this.playerId, this.direction)) {
      this.changeState(FighterState.WALK_FORWARD, time);
    } else this.handleStandingAttackControls(time);
  }

  handleWalkForwardsState(time) {
    this.direction = this.getDirection();

    if (!control.isForward(this.playerId, this.direction)) {
      this.changeState(FighterState.IDLE, time);
    } else if (control.isUp(this.playerId)) {
      this.changeState(FighterState.JUMP_START, time);
    } else if (control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_DOWN, time);
    } else this.handleStandingAttackControls(time);
  }

  handleWalkBackwardsState(time) {
    this.direction = this.getDirection();

    if (!control.isBackward(this.playerId, this.direction)) {
      this.changeState(FighterState.IDLE, time);
    } else if (this.isBlockThreat()) {
      this.changeState(control.isDown(this.playerId) ? FighterState.BLOCK_CROUCH : FighterState.BLOCK_STAND, time);
    } else if (control.isUp(this.playerId)) {
      this.changeState(FighterState.JUMP_START, time);
    } else if (control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_DOWN, time);
    } else this.handleStandingAttackControls(time);
  }

  handleCrouchState(time) {
    const newDirection = this.getDirection();

    if (newDirection !== this.direction) {
      this.direction = newDirection;
      this.changeState(FighterState.CROUCH_TURN, time);
    }

    if (!control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_UP, time);
    } else if (control.isBackward(this.playerId, this.direction) && this.isBlockThreat()) {
      this.changeState(FighterState.BLOCK_CROUCH, time);
    } else this.handleCrouchAttackControls(time);
  }

  handleCrouchDownState(time) {
    if (control.isDown(this.playerId) && this.handleCrouchAttackControls(time)) return;
    if (this.isAnimationCompleted()) this.changeState(FighterState.CROUCH, time);

    if (!control.isDown(this.playerId)) {
      this.currentState = FighterState.CROUCH_UP;
      this.setAnimationFrame(Math.max(0, this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame), time);
    }
  }

  handleCrouchUpState(time) {
    if (this.isAnimationCompleted()) this.changeState(FighterState.IDLE, time);
  }

  handleJumpState(time) {
    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.changeState(FighterState.JUMP_LAND, time);
      return;
    }

    if (JumpStates.includes(this.currentState)) this.handleJumpAttackControls(time);
  }

  handleStandingAttackControls(time) {
    if (control.isLightPunch(this.playerId)) {
      this.changeState(FighterState.LIGHT_PUNCH, time);
    } else if (control.isMediumPunch(this.playerId)) {
      this.changeState(FighterState.MEDIUM_PUNCH, time);
    } else if (control.isHeavyPunch(this.playerId)) {
      this.changeState(FighterState.HEAVY_PUNCH, time);
    } else if (control.isLightKick(this.playerId)) {
      this.changeState(FighterState.LIGHT_KICK, time);
    } else if (control.isMediumKick(this.playerId)) {
      this.changeState(FighterState.MEDIUM_KICK, time);
    } else if (control.isHeavyKick(this.playerId)) {
      this.changeState(FighterState.HEAVY_KICK, time);
    }
  }

  handleCrouchAttackControls(time) {
    if (control.isLightPunch(this.playerId)) {
      this.changeState(FighterState.CROUCH_LIGHT_PUNCH, time);
    } else if (control.isMediumPunch(this.playerId)) {
      this.changeState(FighterState.CROUCH_MEDIUM_PUNCH, time);
    } else if (control.isHeavyPunch(this.playerId)) {
      this.changeState(FighterState.CROUCH_HEAVY_PUNCH, time);
    } else if (control.isLightKick(this.playerId)) {
      this.changeState(FighterState.CROUCH_LIGHT_KICK, time);
    } else if (control.isMediumKick(this.playerId)) {
      this.changeState(FighterState.CROUCH_MEDIUM_KICK, time);
    } else if (control.isHeavyKick(this.playerId)) {
      this.changeState(FighterState.CROUCH_HEAVY_KICK, time);
    } else return false;

    return true;
  }

  handleJumpAttackControls(time) {
    if (control.isLightPunch(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_LIGHT_PUNCH : FighterState.JUMP_DIAGONAL_LIGHT_PUNCH, time);
    } else if (control.isMediumPunch(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_MEDIUM_PUNCH : FighterState.JUMP_DIAGONAL_MEDIUM_PUNCH, time);
    } else if (control.isHeavyPunch(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_HEAVY_PUNCH : FighterState.JUMP_DIAGONAL_HEAVY_PUNCH, time);
    } else if (control.isLightKick(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_LIGHT_KICK : FighterState.JUMP_DIAGONAL_LIGHT_KICK, time);
    } else if (control.isMediumKick(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_MEDIUM_KICK : FighterState.JUMP_DIAGONAL_MEDIUM_KICK, time);
    } else if (control.isHeavyKick(this.playerId)) {
      this.changeState(this.jumpState === FighterState.JUMP_UP
        ? FighterState.JUMP_UP_HEAVY_KICK : FighterState.JUMP_DIAGONAL_HEAVY_KICK, time);
    }
  }

  handleJumpStartState(time) {
    if (this.isAnimationCompleted()) {
      if (control.isBackward(this.playerId, this.direction)) {
        this.changeState(FighterState.JUMP_BACKWARD, time);
      } else if (control.isForward(this.playerId, this.direction)) {
        this.changeState(FighterState.JUMP_FORWARD, time);
      } else this.changeState(FighterState.JUMP_UP, time);
    }
  }

  handleJumpLandState(time) {
    if (this.animationFrame < 1) return;

    let newState = FighterState.IDLE;

    if (!control.isIdle(this.playerId)) {
      this.direction = this.getDirection();
      this.handleIdleState(time);
    } else {
      const newDirection = this.getDirection();

      if (newDirection !== this.direction) {
        this.direction = newDirection;
        newState = FighterState.IDLE_TURN;
      } else {
        if (!this.isAnimationCompleted()) return;
      }
    }

    this.changeState(newState, time);
  }

  handleIdleTurnState(time) {
    this.handleIdleState(time);

    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.IDLE, time);
  }

  handleCrouchTurnState(time) {
    this.handleCrouchState(time);

    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.CROUCH, time);
  }
  
  handleLightAttackReset(time) {
    this.setAnimationFrame(0, time);
    this.handleStandardAttackInit();
    this.attackStruck = false;
  }

  handleLightPunchState(time) {
    if (this.animationFrame < 2) return;
    if (control.isLightPunch(this.playerId)) this.handleLightAttackReset(time);

    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.IDLE, time);
  }

  handleMediumPunchState(time) {
    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.IDLE, time);
  }

  handleLightKickState(time) {
    if (this.animationFrame < 2) return;
    if (control.isLightKick(this.playerId)) this.handleLightAttackReset(time);

    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.IDLE, time);
  }

  handleMediumKickState(time) {
    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.IDLE, time);
  }

  handleCrouchAttackState(time) {
    if (this.animationFrame >= 2 && this.states[this.currentState].attackStrength === FighterAttackStrength.LIGHT) {
      if (this.states[this.currentState].attackType === FighterAttackType.PUNCH
        ? control.isLightPunch(this.playerId) : control.isLightKick(this.playerId)) {
        this.setAnimationFrame(0, time);
        this.handleCrouchAttackInit(time);
      }
    }

    if (!this.isAnimationCompleted()) return;
    this.changeState(FighterState.CROUCH, time);
  }

  handleJumpAttackState(time) {
    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.changeState(FighterState.JUMP_LAND, time);
      return;
    }

    if (this.animationFrame === this.animations[this.currentState].length - 1
      && time.previous > this.animationTimer && this.jumpAttackLoopFrames[this.currentState] !== undefined) {
      this.setAnimationFrame(this.jumpAttackLoopFrames[this.currentState], time);
    }
  }

  handleBlockState(time) {
    if (control.isDown(this.playerId)) this.handleCrouchAttackControls(time);
    else this.handleStandingAttackControls(time);
    if (!BlockStates.includes(this.currentState)) return;

    if (!control.isBackward(this.playerId, this.direction) || !this.isBlockThreat()) {
      this.changeState(control.isDown(this.playerId) ? FighterState.CROUCH : FighterState.IDLE, time);
      return;
    }

    if (control.isDown(this.playerId) && this.currentState === FighterState.BLOCK_STAND) {
      this.changeState(FighterState.BLOCK_CROUCH, time);
    } else if (!control.isDown(this.playerId) && this.currentState === FighterState.BLOCK_CROUCH) {
      this.changeState(FighterState.BLOCK_STAND, time);
    }
  }

  handleBlockHitState(time) {
    if (this.blockTimer === 0) this.blockTimer = time.previous + 4 * FRAME_TIME;

    const pushback = FighterAttackBaseData[this.states[this.currentState].attackStrength].blockPushback;
    while (time.previous >= this.blockTimer) {
      if (this.blockFrame >= pushback.length) {
        this.changeState(control.isDown(this.playerId) ? FighterState.CROUCH : FighterState.IDLE, time);
        return;
      }

      this.position.x -= pushback[this.blockFrame] * this.direction;
      this.blockFrame += 1;
      this.blockTimer += FRAME_TIME;
    }
  }

  handleSweepState(time) {
    this.velocity.y += 1012.5 * time.secondsPassed;
    if (this.position.y < STAGE_FLOOR || this.velocity.y < 0) return;

    this.position.y = STAGE_FLOOR;
    playSound(this.thudSound);
    this.onGroundImpact?.(this.position.x, this.position.y, this.direction, time);
    this.changeState(FighterState.SWEEP_GROUNDED, time);
  }

  handleSweepGroundState(time) {
    if (time.previous < this.sweepTimer) return;
    this.changeState(FighterState.GETUP, time);
  }

  handleGetupState(time) {
    if (this.isAnimationCompleted()) this.changeState(FighterState.IDLE, time);
  }

  handleHurtState(time) {
    if (CrouchingStates.includes(this.currentState)) {
      if (this.hurtStateTimer === 0) {
        this.hurtStateTimer = time.previous
          + (FighterAttackBaseData[this.states[this.currentState].attackStrength].blockPushback.length + 4) * FRAME_TIME;
      }
      if (time.previous < this.hurtStateTimer) return;
    } else if (!this.isAnimationCompleted()) return;
    this.hurtShake = 0;
    this.hurtShakeTimer = 0;
    this.changeState(CrouchingStates.includes(this.currentState) ? FighterState.CROUCH : FighterState.IDLE, time);
  }

  handleHurtAirState(time) {
    if (time.previous < this.hurtAirWallTimer) return;

    if (!this.hurtAirStarted) {
      this.position.y -= 16;
      this.hurtAirStarted = true;
    }

    this.velocity.y += 1012.5 * time.secondsPassed;
  }

  handleKnockoutState(time, context, camera) {
    if (this.currentState === FighterState.KO_AIRBORNE
      && time.previous < this.knockoutWallTimer) return;

    if (this.currentState === FighterState.KO_IMPACT) {
      if (this.isAnimationCompleted()) this.changeState(FighterState.KO_BOUNCE, time);

      return;
    }

    this.updatePosition(time);
    this.updateStageConstraints(time, context, camera);

    if (this.currentState === FighterState.KO_GROUNDED) {
      this.velocity.x = Math.min(0, this.velocity.x + (this.knockdown ? 295.3125 : 281.25) * time.secondsPassed);
      if (this.knockdown && this.velocity.x === 0) this.changeState(FighterState.GETUP, time);
      return;
    }

    this.velocity.y += 1012.5 * time.secondsPassed;
    if (this.position.y < STAGE_FLOOR || this.velocity.y < 0) return;

    this.position.y = STAGE_FLOOR;
    
    if (this.currentState === FighterState.KO_AIRBORNE) {
      if (time.previous >= this.knockoutWallTimer) playSound(this.thudSound);
      this.onGroundImpact?.(this.position.x, this.position.y, this.direction, time);
      this.changeState(FighterState.KO_IMPACT, time);
    } else {
      this.changeState(FighterState.KO_GROUNDED, time);
    }
  }

  handleWinnerPoseState(time) {
    if (!this.isAnimationCompleted()) return;

    this.setAnimationFrame(this.winnerLoopFrames[this.winnerPose], time);
  }

  updateRoundEnd(time, context, camera) {
    if (JumpAttackStates.includes(this.currentState)) this.handleJumpAttackState(time);
    this.updateAnimation(time);

    if ([FighterState.KO_AIRBORNE, FighterState.KO_IMPACT, FighterState.KO_BOUNCE, FighterState.KO_GROUNDED, FighterState.WINNER_POSE].includes(this.currentState)) {
      this.states[this.currentState].update(time, context, camera);
      return;
    }

    if (this.currentState === FighterState.LOSER_POSE) return;

    if (CrouchHurtStates.includes(this.currentState)) {
      this.resetSlide();
      this.handleHurtState(time);
      return;
    }

    if ([FighterState.SWEEP_FALL, FighterState.SWEEP_GROUNDED, FighterState.GETUP].includes(this.currentState)) {
      this.states[this.currentState].update(time);
      this.updatePosition(time);
      this.updateStageConstraints(time, context, camera);
      return;
    }

    if (BlockStates.includes(this.currentState)) {
      this.resetVelocities();
      this.resetSlide();
      this.changeState(FighterState.IDLE, time);
      return;
    }

    if (this.currentState === FighterState.HURT_AIR) {
      this.handleHurtAirState(time);
      this.updatePosition(time);
      this.updateStageConstraints(time, context, camera);
      return;
    }

    if (this.currentState === FighterState.JUMP_START) {
      if (this.isAnimationCompleted()) this.changeState(FighterState.JUMP_UP, time);
      return;
    }

    if ([FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN].includes(this.currentState)) {
      if (this.isAnimationCompleted()) this.changeState(FighterState.CROUCH, time);
      return;
    }

    if (this.position.y < STAGE_FLOOR || this.velocity.y < 0) {
      this.velocity.y += this.gravity * time.secondsPassed;
      this.updatePosition(time);

      if (this.position.y >= STAGE_FLOOR) {
        this.position.y = STAGE_FLOOR;
        this.resetVelocities();
        this.changeState(FighterState.JUMP_LAND, time);
      }
      return;
    }

    this.resetVelocities();
    this.resetSlide();

    if (this.currentState === FighterState.IDLE || this.currentState === FighterState.CROUCH) return;

    if (this.states[this.currentState].attackType || this.currentState.startsWith("HURT_") || this.currentState === FighterState.JUMP_LAND || this.currentState === FighterState.CROUCH_UP) {
      if (!this.isAnimationCompleted()) return;
    }

    if (this.states[FighterState.IDLE].validFrom.includes(this.currentState)) {
      this.changeState(FighterState.IDLE, time);
    }
  }

  isRoundEndReady() {
    if (this.position.y < STAGE_FLOOR) return false;
    if (this.currentState === FighterState.KO_GROUNDED) return this.velocity.x === 0;

    return this.currentState === FighterState.IDLE || this.currentState === FighterState.CROUCH;
  }

  updateKnockbackConstraints(time, context, camera) {
    const [frameKey] = this.animations[this.currentState][this.animationFrame];
    const [[[,, width], [originX]]] = this.frames.get(frameKey);
    const knockoutWidth = FighterKnockoutWidth[this.constructor.name];
    const isKnockout = this.currentState.startsWith("KO_") && !this.knockdown;
    const leftEdge = camera.position.x
    + (isKnockout ? knockoutWidth : Math.max(knockoutWidth, this.direction === FighterDirection.RIGHT ? originX : width - originX));
    const rightEdge = camera.position.x + context.canvas.width
    - (isKnockout ? knockoutWidth : Math.max(knockoutWidth, this.direction === FighterDirection.RIGHT ? width - originX : originX));

    if (this.position.x < leftEdge || this.position.x > rightEdge) {
      this.position.x = Math.max(leftEdge, Math.min(rightEdge, this.position.x));

      if (this.currentState === FighterState.KO_AIRBORNE && this.velocity.x !== 0 && time.previous >= this.knockoutWallTimer) {
        playSound(this.thudSound);
        this.velocity.y = Math.max(0, this.velocity.y);
        this.knockoutWallTimer = time.previous + 12 * FRAME_TIME;
      }
      if (this.currentState === FighterState.HURT_AIR && this.velocity.x !== 0 && time.previous >= this.hurtAirWallTimer) {
        this.velocity.y = Math.max(0, this.velocity.y);
        this.hurtAirWallTimer = time.previous + 12 * FRAME_TIME;
        this.animationTimer += 11 * FRAME_TIME;
      }
      this.velocity.x = 0;
    }
  }

  updateStageConstraints(time, context, camera) {
    if (this.currentState.startsWith("KO_") || this.currentState === FighterState.SWEEP_FALL || this.currentState === FighterState.SWEEP_GROUNDED) {
      this.updateKnockbackConstraints(time, context, camera);
      return;
    }

    if (this.currentState === FighterState.HURT_AIR) {
      this.updateKnockbackConstraints(time, context, camera);
    } else {
      if (this.position.x > camera.position.x + context.canvas.width - this.boxes.push.width) {
        if (BlockStates.includes(this.currentState) && this.blockFrame > 0) {
          this.opponent.position.x -= this.position.x - (camera.position.x + context.canvas.width - this.boxes.push.width);
        }
        this.position.x = camera.position.x + context.canvas.width - this.boxes.push.width;
        this.resetSlide(true);
      }

      if (this.position.x < camera.position.x + this.boxes.push.width) {
        if (BlockStates.includes(this.currentState) && this.blockFrame > 0) {
          this.opponent.position.x += camera.position.x + this.boxes.push.width - this.position.x;
        }
        this.position.x = camera.position.x + this.boxes.push.width;
        this.resetSlide(true);
      }
    }

    if (this.hasCollidedWithOpponent()) {
      if (this.position.x <= this.opponent.position.x) {
        this.position.x = Math.max(this.opponent.position.x + this.opponent.boxes.push.x - (this.boxes.push.x + this.boxes.push.width), camera.position.x + this.boxes.push.width);

        if ([FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD].includes(this.opponent.currentState)) {
          this.opponent.position.x += FIGHTER_PUSH_FRICTION * time.secondsPassed;
        }
      }

      if (this.position.x >= this.opponent.position.x) {
        this.position.x = Math.min(this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width + (this.boxes.push.width + this.boxes.push.x), camera.position.x + context.canvas.width - this.boxes.push.width);

        if ([FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD].includes(this.opponent.currentState)) {
          this.opponent.position.x -= FIGHTER_PUSH_FRICTION * time.secondsPassed;
        }
      }
    }
  }

  handleAttackHit(time, attackStrength, hitLocation, attack = FighterAttackReaction.NORMAL) {
    const newState = this.getHurtState(attackStrength, hitLocation);
    const { velocity, friction } = FighterAttackBaseData[attackStrength].slide;

    this.slideVelocity = velocity;
    this.slideFriction = friction;

    if (attack === FighterAttackReaction.KNOCKDOWN) {
      this.knockdown = true;
      this.direction = -this.opponent.direction;
      this.changeState(FighterState.KO_AIRBORNE, time);
    } else if (JumpStates.includes(this.currentState) || JumpAttackStates.includes(this.currentState)) {
      this.changeState(FighterState.HURT_AIR, time);
    } else if (attack === FighterAttackReaction.SWEEP) {
      this.changeState(FighterState.SWEEP_FALL, time);
    } else this.changeState(newState, time);

    if (ENABLE_DEBUG) DEBUG.logHurt(this.opponent, attackStrength, hitLocation);
  }

  updateAnimation(time) {
    const animation = this.animations[this.currentState];
    if (animation[this.animationFrame][1] <= FrameDelay.FREEZE || Math.round(time.previous) < Math.round(this.animationTimer)) return;
    this.setAnimationFrame(this.animationFrame + 1, { previous: this.animationTimer });
  }

  updateAttackBoxCollided(time) {
    const { attackStrength, attackType } = this.states[this.currentState];
    if (!attackType || this.attackStruck) return;
    if (this.boxes.hit.width === 0 || this.boxes.hit.height === 0) return;
    if (!HurtStateValidFrom.includes(this.opponent.currentState)) return;

    const actualHitBox = getActualBoxDimensions(this.position, this.direction, this.boxes.hit);

    for (const [hurtLocation, hurtBox] of Object.entries(this.opponent.boxes.hurt)) {
      const [x, y, width, height] = hurtBox;
      if (width === 0 || height === 0) continue;

      const actualOpponentHurtBox = getActualBoxDimensions(this.opponent.position, this.opponent.direction, { x, y, width, height });

      if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) continue;

      stopSound(this.attackStrengthSounds[attackStrength]);
      const blocked = this.opponent.canBlock(this.boxes.attack, hurtLocation);
      playSound(blocked ? this.blockSound : this.hitStrengthSounds[attackStrength][attackType]);

      const hitPosition = {
        x: (actualHitBox.x + (actualHitBox.width  / 2) + actualOpponentHurtBox.x + (actualOpponentHurtBox.width  / 2)) / 2,
        y: (actualHitBox.y + (actualHitBox.height / 2) + actualOpponentHurtBox.y + (actualOpponentHurtBox.height / 2)) / 2,
      };

      hitPosition.x -= 4 - Math.random() * 8;
      hitPosition.y -= 4 - Math.random() * 8;

      this.onAttackHit(time, this.playerId, this.opponent.playerId, hitPosition, attackStrength, blocked);
      if (blocked) {
        this.opponent.changeState(this.opponent.getBlockState(attackStrength), time);
      } else this.opponent.handleAttackHit(time, attackStrength, hurtLocation, this.boxes.attack);

      this.animationTimer += (blocked ? 14 : FIGHTER_HURT_DELAY) * FRAME_TIME;
      if ([FighterState.SWEEP_FALL, FighterState.KO_AIRBORNE].includes(this.opponent.currentState)) {
        this.opponent.animationTimer += FIGHTER_HURT_DELAY * FRAME_TIME;
      }

      this.attackStruck = true;
      return;
    }
  }

  updateHurtShake(time, delay) {
    if (this.hurtShakeTimer === 0 || time.previous <= this.hurtShakeTimer) return;

    const shakeAmount = (delay - time.previous < (FIGHTER_HURT_DELAY * FRAME_TIME) / 2 ? 1 : 2);
    this.hurtShake = shakeAmount - this.hurtShake;
    this.hurtShakeTimer = time.previous + FRAME_TIME;
  }

  updateSlide(time) {
    if (this.slideVelocity === 0) return;

    const slideDirection = Math.sign(this.slideVelocity);
    this.slideVelocity -= slideDirection * this.slideFriction * time.secondsPassed;

    if (Math.sign(this.slideVelocity) === slideDirection) return;

    this.resetSlide();
  }

  updatePosition(time) {
    if (this.currentState === FighterState.HURT_AIR && time.previous < this.hurtAirWallTimer) return;

    this.position.x += ((this.velocity.x + this.slideVelocity) * this.direction) * time.secondsPassed;
    this.position.y +=   this.velocity.y                                         * time.secondsPassed;
    if (this.currentState === FighterState.HURT_AIR) this.handleJumpState(time);
  }

  update(time, context, camera) {
    if (this.currentState.startsWith("KO_")) {
      this.updateAnimation(time);
      this.handleKnockoutState(time, context, camera);
      return;
    }

    if (JumpStates.includes(this.currentState) || JumpAttackStates.includes(this.currentState)) {
      this.velocity.y += this.gravity * time.secondsPassed;
      this.velocity.x -= Math.sign(this.initialVelocity.x[this.jumpState] ?? 0) * this.jumpAcceleration * time.secondsPassed;
    }

    this.states[this.currentState].update(time, context);
    this.updateSlide(time);
    this.updatePosition(time);
    this.updateAnimation(time);
    this.updateStageConstraints(time, context, camera);
    this.updateAttackBoxCollided(time);
  }

  draw(context, camera) {
    const [frameKey] = this.animations[this.currentState][this.animationFrame];
    const [[[x, y, width, height], [originX, originY]]] = this.frames.get(frameKey);

    context.scale(this.direction, 1);
    context.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      Math.floor( this.position.x - this.hurtShake - camera.position.x) * this.direction - originX,
      Math.floor( this.position.y - camera.position.y) - originY,
      width,
      height,
    );
    context.setTransform(1, 0, 0, 1, 0, 0);

    if (ENABLE_DEBUG) DEBUG.drawCollisionInfo(this, context, camera);
  }
}
