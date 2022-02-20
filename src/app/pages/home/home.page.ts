import { 
    Component, 
    ElementRef,
    ViewChild,
    OnInit, 
    AfterViewInit
  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { LevelSelectionPage } from 'src/app/components/level-selection/level-selection.page';


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
  constructor(
    public router: Router,
    private modalController: ModalController
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
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