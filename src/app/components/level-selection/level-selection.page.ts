/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AfterViewInit, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'level-selection',
  templateUrl: './level-selection.page.html',
  styleUrls: ['./level-selection.page.scss']
})
export class LevelSelectionPage implements AfterViewInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  public EASY: string;
  public MEDIUM: string;
  public HARD: string;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    private modalController: ModalController,
    private translate: TranslateService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  ngAfterViewInit(): void {
    this.renderText();
  }

  private renderText(): void {
    this.translate.get('EASY').subscribe((res: string) => {
      this.EASY = res;
    });
    this.translate.get('MEDIUM').subscribe((res: string) => {
      this.MEDIUM = res;
    });
    this.translate.get('HARD').subscribe((res: string) => {
      this.HARD = res;
    });
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
