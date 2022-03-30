/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LevelSelectionPage } from '../../components/level-selection/level-selection.page';


/**
 * Responsible for representing home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements AfterViewInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  public PLAY: string;
  public HOW_TO_PLAY: string;
  public ABOUT: string;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router,
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
    this.translate.get('PLAY').subscribe((res: string) => {
      this.PLAY = res;
    });
    this.translate.get('HOW_TO_PLAY').subscribe((res: string) => {
      this.HOW_TO_PLAY = res;
    });
    this.translate.get('ABOUT').subscribe((res: string) => {
      this.ABOUT = res;
    });
  }

  public handleHowToPlay() {
    this.redirectTo('/how-to-play');
  }

  private redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  public handleAbout() {
    this.redirectTo('/about');
  }
  
  public handlePlay() {
    this.presentModal().then((modalDataResponse) => {
      if (modalDataResponse.data != null) {
        this.redirectTo('/play/' + modalDataResponse.data);
      }
    });
  }

  private async presentModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: LevelSelectionPage,
      componentProps: {
      }
    });

    await modal.present();

    return modal.onDidDismiss();
  }
}