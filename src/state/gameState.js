import { FighterId } from "../constants/fighter.js";
import { createDefaultFighterState } from "./fighterState.js";

export const gameState = {
  credits: 0,
  // in the normal flow, PlayerSelectScene sets these IDs, so they should start as undefined for the stageId and empty for the fighters.
  // these debug defaults allow starting directly in VersusScene, for example.
  stageId: FighterId.KEN,
  fighters: [
    createDefaultFighterState(FighterId.RYU),
    createDefaultFighterState(FighterId.KEN),
  ],
};
