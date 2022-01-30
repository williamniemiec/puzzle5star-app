import { HowToPlayPageRoutingModule } from './how-to-play-routing.module';
import { NgModule } from '@angular/core';
import { HowToPlayPage} from './how-to-play.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing how-to-play page context.
 */
@NgModule({
  declarations: [HowToPlayPage],
  imports: [
    CommonModule,
    IonicModule,
    HowToPlayPageRoutingModule
  ]
})
export class HowToPlayPageModule {
}