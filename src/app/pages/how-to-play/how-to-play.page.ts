/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { 
    Component, 
    AfterViewInit
  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


/**
 * Responsible for representing how to play page.
 */
@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.page.html',
  styleUrls: ['./how-to-play.page.scss']
})
export class HowToPlayPage implements AfterViewInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  public PUZZLE_DESCRIPTION: string;
  public HOW_TO_PLAY: string;
  public SCREENS_DESCRIPTION: string;
  public AVAILABLE: string;
  public UNAVAILABLE: string;
  public SELECTED: string;
  public MARKED: string;



  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
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
    this.translate.get('PUZZLE_DESCRIPTION').subscribe((res: string) => {
      this.PUZZLE_DESCRIPTION = res;
    });
    this.translate.get('HOW_TO_PLAY').subscribe((res: string) => {
      this.HOW_TO_PLAY = res;
    });
    this.translate.get('SCREENS_DESCRIPTION').subscribe((res: string) => {
      this.SCREENS_DESCRIPTION = res;
    });
    this.translate.get('AVAILABLE').subscribe((res: string) => {
      this.AVAILABLE = res;
    });
    this.translate.get('UNAVAILABLE').subscribe((res: string) => {
      this.UNAVAILABLE = res;
    });
    this.translate.get('SELECTED').subscribe((res: string) => {
      this.SELECTED = res;
    });
    this.translate.get('MARKED').subscribe((res: string) => {
      this.MARKED = res;
    });
  }
}