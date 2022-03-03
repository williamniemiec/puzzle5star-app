import { StarNode } from './../../models/star-node.model';
import { StarService } from './../../services/star.service';
import { CountdownConfig } from './../../../../node_modules/ngx-countdown/interfaces.d';
import { GameService } from '../../services/game.service';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { LevelSelectionPage } from 'src/app/components/level-selection/level-selection.page';
import { Location } from '@angular/common';
import { CountdownComponent } from 'ngx-countdown';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { GameSettings } from "../../models/game-settings.model";


/**
 * Responsible for controlling play page.
 */
@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss']
})
export class PlayPage implements AfterViewInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  private _CANVAS: any;
  public message;
  public hasTimer;
  public config: CountdownConfig;// = { format: `mm:ss`, leftTime: 1 };
  public p_bar_value: number = 1;
  public progressBarUpdate;
  public PLAY;
  public RESET;
  public SOLVE;
  private language;

  public nodes = {
    "A": { marked: false, available: true, selected: false },
    "B": { marked: false, available: true, selected: false },
    "C": { marked: false, available: true, selected: false },
    "D": { marked: false, available: true, selected: false },
    "E": { marked: false, available: true, selected: false },
    "F": { marked: false, available: true, selected: false },
    "G": { marked: false, available: true, selected: false },
    "H": { marked: false, available: true, selected: false },
    "I": { marked: false, available: true, selected: false },
    "J": { marked: false, available: true, selected: false },
  };


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router,
    private routeParams: ActivatedRoute,
    public gameService: GameService,
    public starService: StarService,
    public modalController: ModalController,
    private translate: TranslateService,
    private alertController: AlertController
  ) {
    this.message = ""
    this.hasTimer = true;
    this.config = { format: `mm:ss`, leftTime: 1 };
  }

  ngAfterViewInit() {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;
    this.renderText();
    this.loadLevel();
    this.drawStar();
  }

  private renderText(): void {
    this.translate.get('PLAY').subscribe((res: string) => {
      this.PLAY = res;
    });
    this.translate.get('RESET').subscribe((res: string) => {
      this.RESET = res;
    });
    this.translate.get('SOLVE').subscribe((res: string) => {
      this.SOLVE = res;
    });
  }

  private loadLevel(): void {
    const level = this.routeParams.snapshot.params.level;
    const gameConfig: GameSettings = this.gameService.newGame(level);

    this.translate.get(gameConfig.message).subscribe((res: string) => {
      this.message = res;
    });
    this.hasTimer = gameConfig.hasTimer;

    if (gameConfig.hasTimer) {
      this.hasTimer = true;
      this.config = { format: `mm:ss`, leftTime: gameConfig.timer};
      this.countdown.begin();

      this.progressBarUpdate = setInterval(() => {
        this.p_bar_value = this.countdown.left / (1000 * this.config.leftTime);
      }, 1000);
    }
  }

  private drawStar(): void {
    const context = this._CANVAS.getContext('2d');

    this.starService.drawStar(context);
  }

  public handleNodeSelect(nodeLabel: string): void {
    this.gameService.selectStar(nodeLabel);

    for (let label of Object.keys(this.nodes)) {
      this.nodes[label].available = this.gameService.isAvailable(label);
      this.nodes[label].selected = this.gameService.isSelected(label);
      this.nodes[label].isMarked = this.gameService.isMarked(label);
    }
  }

  public handleSolve(): void {
    alert('Not implemented yet!');
  }

  public handleReset(): void {
    this.presentModal().then((modalDataResponse) => {
      if (modalDataResponse.data != null) {
        this.router.navigate(['/'], { replaceUrl: true }).then(() => {
          this.router.navigate(['/play/', modalDataResponse.data], { replaceUrl: true })
        })
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

  public handleCountdownEvent(event) {
    if (!this.hasTimer) {
      return;
    }

    if (event.action === 'done') {
      clearInterval(this.progressBarUpdate);
      this.p_bar_value = 0;
      this.presentAlert().then(role => {
        this.router.navigate(['/'], { replaceUrl: true })
      })
    }
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'You lose!',
      subHeader: 'Time expired',
      message: 'Try to reduce difficulty.',
      buttons: ['OK']
    });

    await alert.present();

    return alert.onDidDismiss();
  }
}