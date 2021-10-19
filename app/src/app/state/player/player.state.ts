import { Player } from '../../models/player.model';
import { EntityState } from '@ngrx/entity';

export interface PlayerState extends EntityState<Player> {
  selectedPlayerId: string | null;
}


