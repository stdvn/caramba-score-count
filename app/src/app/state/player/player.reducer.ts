import { Player } from '../../models/player.model';
import { createReducer, createAction, on, Action } from '@ngrx/store';
import { addPlayer, updateScore } from './player.actions';
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
  on(updateScore, (state, { player, scoreToAdd }) => {
    const updatedPlayer: Update<Player> = {
      id: player.name,
      changes: { score: player.score + scoreToAdd },
    };
    return adapter.updateOne(updatedPlayer, state);
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
