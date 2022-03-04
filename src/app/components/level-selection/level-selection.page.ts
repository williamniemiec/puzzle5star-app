/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'level-selection',
  templateUrl: './level-selection.page.html',
  styleUrls: ['./level-selection.page.scss']
})
export class LevelSelectionPage implements OnInit {

  public EASY = "Easy";
  public MEDIUM = "Medium";
  public HARD = "Hard";
  public CLOSE = "Close";

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {

   }

  public async handleEasyLevel(): Promise<void> {
    this.modalController.dismiss("easy");
  }

  public async handleMediumLevel(): Promise<void> {
    this.modalController.dismiss("medium");
  }

  public async handleHardLevel(): Promise<void> {
    this.modalController.dismiss("hard");
  }
}
