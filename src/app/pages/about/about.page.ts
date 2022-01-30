import { 
    Component, 
    ElementRef,
    ViewChild,
    OnInit, 
    AfterViewInit
  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


/**
 * Responsible for representing about page.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public router: Router) {
  }
}