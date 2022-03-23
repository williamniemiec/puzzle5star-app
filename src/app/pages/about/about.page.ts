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
 * Responsible for representing about page.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements AfterViewInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  public ABOUT: string;
  public ABOUT_TEXT: string;
  public COLLABORATORS: string;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(private translate: TranslateService) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  ngAfterViewInit(): void {
    this.renderText();
  }

  private renderText(): void {
    this.translate.get('ABOUT').subscribe((res: string) => {
      this.ABOUT = res;
    });
    this.translate.get('ABOUT_TEXT').subscribe((res: string) => {
      this.ABOUT_TEXT = res;
    });
    this.translate.get('COLLABORATORS').subscribe((res: string) => {
      this.COLLABORATORS = res;
    });
  }
}