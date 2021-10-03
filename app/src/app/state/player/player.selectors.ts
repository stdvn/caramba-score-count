import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.state';
import { selectAllPlayers } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('players');

export const selectPlayers = createSelector(
  selectPlayerState,
  selectAllPlayers,
);
