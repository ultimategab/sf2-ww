import { FRAME_TIME } from "../../constants/game.js";
import { FighterState } from "../../constants/fighter.js";
import { STAGE_FLOOR, STAGE_ROW_SCROLL_STEP, STAGE_SCROLL_CENTER_X, StageFragment } from "../../constants/stage.js";
import { playSound } from "../../engine/soundHandler.js";
import { drawFrame } from "../../utils/context.js";
import { getActualBoxDimensions } from "../../utils/collisions.js";
import { SkewedFloor } from "./shared/SkewedFloor.js";

export class Stage {
  fightOver = false;
  animationTimer = 0;
  decorations = [];
  fragments = [];
  fragmentDuration = 80;
  fragmentBlinkFrame = 0;
  fragmentsBounce = true;
  fragmentOrigins = new Map();

  constructor(name, floorDimensions) {
    this.image = document.querySelector(`img[alt='${name}-stage']`);
    this.floor = new SkewedFloor(this.image, floorDimensions);

    this.music = document.querySelector(`audio#${name}-theme`);
    playSound(this.music, 1);
  }

  setFightOver(fightOver) {
    if (this.fightOver === fightOver) return;
    this.fightOver = fightOver;
  }

  update(time) {
    this.animationTimer = time.previous;
  }

  resetDecorations() {
    this.fragments = [];
    for (const decoration of this.decorations) {
      decoration.breakAt = undefined;
      decoration.brokenAt = undefined;
      decoration.fighter = undefined;
    }
  }

  isFighterPaused(fighter, time) {
    return this.decorations.some(decoration => decoration.fighter === fighter
      && Math.round(time.previous) < Math.round(decoration.breakAt));
  }

  updateDecorations(time, fighters) {
    for (const decoration of this.decorations) {
      if (decoration.brokenAt !== undefined) continue;

      if (decoration.breakAt !== undefined) {
        if (Math.round(time.previous) < Math.round(decoration.breakAt)) continue;
        decoration.brokenAt = time.previous;
        this.breakDecoration(decoration, time);
        continue;
      }

      for (const fighter of fighters) {
        if (![FighterState.SWEEP_FALL, FighterState.HURT_AIR, FighterState.KO_AIRBORNE].includes(fighter.currentState)) continue;

        const fighterBox = getActualBoxDimensions(fighter.position, fighter.direction,
          fighter.boxes.push.width ? fighter.boxes.push : fighter.getBoxes("sweep-fall-1").push);
        const decorationBox = getActualBoxDimensions(decoration.position, decoration.direction, this.decorationBox);

        if (decorationBox.width === 0 && decorationBox.height === 0) {
          fighterBox.height = Math.max(fighterBox.height, fighter.position.y - fighterBox.y);
          fighterBox.x += Math.min(0, fighter.velocity.x * fighter.direction * time.secondsPassed);
          fighterBox.y += Math.min(0, fighter.velocity.y * time.secondsPassed);
          fighterBox.width += Math.abs(fighter.velocity.x * time.secondsPassed);
          fighterBox.height += Math.abs(fighter.velocity.y * time.secondsPassed);
        }
        if (fighterBox.x + fighterBox.width < decorationBox.x || fighterBox.x > decorationBox.x + decorationBox.width
          || fighterBox.y + fighterBox.height < decorationBox.y || fighterBox.y > decorationBox.y + decorationBox.height) continue;

        decoration.fighter = fighter;
        decoration.breakAt = time.previous + 6 * FRAME_TIME;
        fighter.animationTimer += 6 * FRAME_TIME;
        playSound(this.breakSound);
        break;
      }
    }

    this.updateFragments(time);
  }

  getFragmentValue(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  addFragment(frameKey, position, velocity, direction, time) {
    this.fragments.push({
      frameKey, position, velocity, direction,
      floor: STAGE_FLOOR + this.getFragmentValue(StageFragment.FLOOR),
      age: 0,
      blinkOffset: this.fragmentsBounce ? this.fragments.length % 2 : 0,
      nextFrame: time.previous + FRAME_TIME,
    });
  }

  breakDecoration(decoration, time) {
    for (let fragment = 0; fragment < this.fragmentCount; fragment++) {
      this.addFragment(
        `wood-fragment-${this.getFragmentValue(StageFragment.TYPES) + 1}`,
        {
          x: decoration.position.x + this.getFragmentValue(StageFragment.OFFSET_X),
          y: decoration.position.y - 45 + this.getFragmentValue(StageFragment.OFFSET_Y),
        },
        {
          x: this.getFragmentValue(StageFragment.VELOCITY_X) * -decoration.fighter.direction,
          y: this.getFragmentValue(StageFragment.VELOCITY_Y),
        },
        -decoration.fighter.direction, time,
      );
    }
  }

  updateFragments(time) {
    for (const fragment of this.fragments) {
      while (Math.round(time.previous) >= Math.round(fragment.nextFrame) && fragment.age < this.fragmentDuration) {
        fragment.velocity.y += 0.25;
        fragment.position.x += fragment.velocity.x;
        fragment.position.y += fragment.velocity.y;
        if (this.fragmentsBounce && fragment.velocity.y > 0 && fragment.position.y >= fragment.floor) {
          fragment.velocity.y = this.getFragmentValue(StageFragment.BOUNCE);
        }
        fragment.age += 1;
        fragment.nextFrame += FRAME_TIME;
      }
    }
    this.fragments = this.fragments.filter(fragment => fragment.age < this.fragmentDuration);
  }

  drawFragments(context, camera) {
    for (const fragment of this.fragments) {
      if (fragment.age >= this.fragmentBlinkFrame && (fragment.age + fragment.blinkOffset) % 2) continue;
      const [, , width, height] = this.frames.get(fragment.frameKey);
      const [originX, originY] = this.fragmentOrigins.get(fragment.frameKey) ?? [width / 2, height / 2];
      this.drawFrame(context, fragment.frameKey,
        Math.floor(fragment.position.x - camera.position.x - originX * fragment.direction),
        Math.floor(fragment.position.y - camera.position.y - originY), fragment.direction);
    }
  }

  drawFrame(context, frameKey, x, y, direction = 1) {
    drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
  }

  getRowOffset(camera, depth) {
    return Math.floor((STAGE_SCROLL_CENTER_X - Math.floor(camera.position.x)) * depth * STAGE_ROW_SCROLL_STEP);
  }

  drawBackground() {}

  drawForeground(context, camera) {
    this.drawFragments(context, camera);
  }
}
