import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { selectPlayers } from '../../state/player/player.selectors';
import { ScoreModalComponent } from '../../features/score-modal/score-modal.component';
import { ModalController } from '@ionic/angular';
import { selectPlayer, resetScores } from '../../state/player/player.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePage {

  players$: Observable<Player[]> = this.store.pipe(select(selectPlayers));

  constructor(
    private store: Store,
    private modalController: ModalController,
  ) {}

  async presentModal(playerName: string) {
    this.store.dispatch(selectPlayer({ name: playerName }));
    const modal = await this.modalController.create({
      component: ScoreModalComponent,
    });
    return await modal.present();
  }

  resetScores(): void {
    this.store.dispatch(resetScores());
  }

}
