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
export class PlayPage implements AfterViewInit, OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  public message: string;
  public hasTimer: boolean;
  public config: CountdownConfig;
  public p_bar_value: number = 1;
  public progressBarUpdate: any;
  public nodes: Map<string, StarNode>;
  public PLAY: string;
  public RESET: string;
  public SOLVE: string;
  private _CANVAS: any;
  private YOU_LOSE: string;
  private TIME_EXPIRED: string;
  private TRY_REDUCE_DIFFICULTY: string;
  private OK: string;


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

  ngOnInit(): void {
    this.nodes = this.gameService.getNodes();
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
    this.translate.get('YOU_LOSE').subscribe((res: string) => {
      this.YOU_LOSE = res;
    });
    this.translate.get('TIME_EXPIRED').subscribe((res: string) => {
      this.TIME_EXPIRED = res;
    });
    this.translate.get('TRY_REDUCE_DIFFICULTY').subscribe((res: string) => {
      this.TRY_REDUCE_DIFFICULTY = res;
    });
    this.translate.get('OK').subscribe((res: string) => {
      this.OK = res;
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

    for (let label of this.nodes.keys()) {
      this.nodes.get(label).available = this.gameService.isAvailable(label);
      this.nodes.get(label).selected = this.gameService.isSelected(label);
      this.nodes.get(label).marked = this.gameService.isMarked(label);
    }
  }

  public handleSolve(): void {
    this.hasTimer = false;
    clearInterval(this.progressBarUpdate);
    this.gameService.solve();
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
      header: this.YOU_LOSE,
      subHeader: this.TIME_EXPIRED,
      message: this.TRY_REDUCE_DIFFICULTY,
      buttons: [this.OK]
    });

    await alert.present();

    return alert.onDidDismiss();
  }
}