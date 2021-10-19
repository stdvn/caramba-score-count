import { createAction, props } from '@ngrx/store';
import { Player } from '../../models/player.model';

export const addPlayer = createAction(
  '[Player] Add player',
  props<{ name: string }>(),
);

export const updateScore = createAction(
  '[Player] Update score',
  props<{ scoreToAdd: number }>(),
);

export const selectPlayer = createAction(
  '[Player] Select player',
  props<{ name: string }>(),
);

export const resetScores = createAction(
  '[Player] Reset scores',
);

export const clearPlayers = createAction(
  '[Player] Clear players',
);
