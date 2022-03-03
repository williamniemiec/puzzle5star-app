import { StarService } from './../../services/star.service';
import { GameService } from '../../services/game.service';
import { PlayPageRoutingModule } from './play-routing.module';
import { NgModule } from '@angular/core';
import { PlayPage} from './play.page';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { CountdownModule } from 'ngx-countdown';
import { AlertController } from '@ionic/angular';


/**
 * Responsible for managing home page context.
 */
@NgModule({
  declarations: [PlayPage],
  imports: [
    CommonModule,
    IonicModule,
    PlayPageRoutingModule,
    CountdownModule
  ],
  providers: [
    GameService,
    StarService,
    ModalController,
    AlertController
  ]
})
export class PlayPageModule {
}