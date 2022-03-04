/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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