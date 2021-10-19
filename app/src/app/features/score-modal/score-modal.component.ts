import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { updateScore, resetScores } from '../../state/player/player.actions';
import { Observable, interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Player } from '../../models/player.model';
import { getSelectedPlayer } from '../../state/player/player.selectors';
import { ModalController } from '@ionic/angular';

@Component({
  selector: '[scoreModal]',
  templateUrl: './score-modal.component.html',
  styleUrls: ['score-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreModalComponent {

  score: number;

  constructor(
    private store: Store,
    private modalController: ModalController,
  ) {}

  updateScore(): void {
    this.store.dispatch(updateScore({ scoreToAdd: this.score }));
    this.dismiss();
    this.score = null;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
