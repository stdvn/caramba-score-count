import { createAction, props } from '@ngrx/store';
import { Player } from '../../models/player.model';

export const addPlayer = createAction(
  '[Player] Add player',
  props<{ name: string }>(),
);

export const updateScore = createAction(
  '[Player] Update score',
  props<{ player: Player, scoreToAdd: number }>(),
);
