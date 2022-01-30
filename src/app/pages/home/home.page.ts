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
 * Responsible for representing home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public router: Router) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public handleHowToPlay() {
    this.redirectTo('/how-to-play');
  }

  public handlePlay() {
    this.redirectTo('/play');
  }

  public handleAbout() {
    this.redirectTo('/about');
  }

  private redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }
}