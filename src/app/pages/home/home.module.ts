import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { HomePage} from './home.page';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';


/**
 * Responsible for managing home page context.
 */
@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [
    ModalController
  ]
})
export class HomePageModule {
}