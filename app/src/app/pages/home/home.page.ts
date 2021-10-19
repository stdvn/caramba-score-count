import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addPlayer, clearPlayers } from '../../state/player/player.actions';
import { Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { selectAllPlayers } from '../../state/player/player.reducer';
import { selectPlayers } from '../../state/player/player.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  
  name: string;

  players$: Observable<Player[]> = this.store.pipe(select(selectPlayers));

  constructor(
    private store: Store,
  ) { }

  addPlayer(): void {
    if (!this.name) {
      return;
    }
    this.store.dispatch(addPlayer({ name: this.name }));
    this.name = null;
  }

  clearPlayers(): void {
    this.store.dispatch(clearPlayers());
  }
}
