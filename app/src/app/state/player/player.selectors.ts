import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.state';
import { selectAllPlayers, selectPlayerEntities } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('players');

export const selectPlayers = createSelector(
  selectPlayerState,
  selectAllPlayers,
);

export const getSelectedPlayer = createSelector(
  selectPlayerState,
  (state) => state.entities[state.selectedPlayerId],
);
