import { PlayPageRoutingModule } from './play-routing.module';
import { NgModule } from '@angular/core';
import { PlayPage} from './play.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing home page context.
 */
@NgModule({
  declarations: [PlayPage],
  imports: [
    CommonModule,
    IonicModule,
    PlayPageRoutingModule
  ]
})
export class PlayPageModule {
}