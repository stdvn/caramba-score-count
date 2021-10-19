import { Player } from '../../models/player.model';
import { createReducer, createAction, on, Action } from '@ngrx/store';
import { addPlayer, updateScore, selectPlayer, resetScores, clearPlayers } from './player.actions';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { PlayerState } from './player.state';

export function selectPlayerId(player: Player): string {
  return player.name;
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: selectPlayerId
});

export const initialState: PlayerState = adapter.getInitialState({
  selectedPlayerId: null,
});


export const createPlayerReducer = createReducer(
  initialState,
  on(addPlayer, (state, { name }) => {
    return adapter.upsertOne({ name: name, score: 0 }, state);
  }),
  on(updateScore, (state, { scoreToAdd }) => {
    const currentPlayer = state.entities[state.selectedPlayerId];
    const updatedPlayer: Update<Player> = {
      id: currentPlayer.name,
      changes: { score: currentPlayer.score + scoreToAdd },
    };
    return adapter.updateOne(updatedPlayer, state);
  }),
  on(selectPlayer, (state, { name }) => ({
    ...state,
    selectedPlayerId: name,
  })),
  on(resetScores, (state) => {
    const resetPlayers = state.ids.map(playerId => ({
      id: playerId,
      changes: { score: 0 },
    }));
    return adapter.updateMany(resetPlayers, state);
  }),
  on(clearPlayers, (state) => {
    return adapter.removeAll({
      ...state,
      selectedPlayerId: null,
    });
  }),
);

export function playerReducer(state: PlayerState | undefined, action: Action) {
  return createPlayerReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of player ids
export const selectPlayerIds = selectIds;

// select the dictionary of player entities
export const selectPlayerEntities = selectEntities;

// select the array of Players
export const selectAllPlayers = selectAll;

// select the total player count
export const selectPlayerTotal = selectTotal;
