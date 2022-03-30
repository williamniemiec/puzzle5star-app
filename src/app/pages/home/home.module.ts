import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage} from './home.page';


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