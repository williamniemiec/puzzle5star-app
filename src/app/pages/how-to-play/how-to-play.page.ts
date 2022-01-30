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
 * Responsible for representing how to play page.
 */
@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.page.html',
  styleUrls: ['./how-to-play.page.scss']
})
export class HowToPlayPage {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public router: Router) {
  }
}