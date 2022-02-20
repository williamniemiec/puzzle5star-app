import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { LevelSelectionPage } from './level-selection.page';
import { LevelSelectionPageRoutingModule } from './level-selection-routing.module';


/**
 * Responsible for managing home page context.
 */
@NgModule({
  declarations: [LevelSelectionPage],
  imports: [
    CommonModule,
    IonicModule,
    LevelSelectionPageRoutingModule
  ],
  providers: [
    ModalController
  ]
})
export class LevelSelectionPageModule {
}