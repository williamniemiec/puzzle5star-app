/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { CountdownConfig } from '../../../../node_modules/ngx-countdown/interfaces.d';
import StarDrawerService from '../../services/star-drawer.service';
import GameService from '../../services/game.service';
import { LevelSelectionPage } from '../../components/level-selection/level-selection.page';
import StarNode from '../../models/star-node.model';
import GameSettings from "../../models/game-settings.model";


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
  public message: string;
  public hasTimer: boolean;
  public config: CountdownConfig;
  public p_bar_value: number = 1;
  public progressBarUpdate: any;
  public solveEnabled: boolean;
  public nodes: Map<string, StarNode>;
  public PLAY: string;
  public RESET: string;
  public SOLVE: string;
  
  @ViewChild('canvas') 
  private canvasEl: ElementRef;
  
  @ViewChild('cd', { static: false }) 
  private countdown: CountdownComponent;
  
  private canvasElement: any;
  private WON_GAME: string;
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
    public starDrawerService: StarDrawerService,
    public modalController: ModalController,
    private translate: TranslateService,
    private alertController: AlertController
  ) {
    this.message = ""
    this.hasTimer = true;
    this.config = { format: `mm:ss`, leftTime: 1 };
    this.solveEnabled = true;
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  ngOnInit(): void {
    this.nodes = this.gameService.getNodes();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvasEl.nativeElement;
    this.canvasElement.width = 200;
    this.canvasElement.height = 200;
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
    this.translate.get('WON_GAME').subscribe((res: string) => {
      this.WON_GAME = res;
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
    const level: string = this.getSelectedLevel();
    const gameConfig: GameSettings = this.startNewGame(level);
    
    this.setUpGame(gameConfig);
  }

  private getSelectedLevel(): string {
    return this.routeParams.snapshot.params.level;
  }

  private startNewGame(level: string): GameSettings {
    const gameConfig: GameSettings = this.gameService.newGame(level);

    this.nodes = this.gameService.getNodes();

    return gameConfig;
  }

  private setUpGame(gameConfig: GameSettings) {
    this.setUpGameMessage(gameConfig);
    this.setUpGameTimer(gameConfig);
    this.setUpGameSolver(gameConfig);

    if (gameConfig.hasTimer) {
      this.setUpTimer(gameConfig);
    }
  }

  private setUpGameMessage(gameConfig: GameSettings) {
    this.translate.get(gameConfig.message).subscribe((res: string) => {
      this.message = res;
    });
  }

  private setUpGameTimer(gameConfig: GameSettings) {
    this.hasTimer = gameConfig.hasTimer;
  }

  private setUpGameSolver(gameConfig: GameSettings) {
    this.solveEnabled = gameConfig.solverEnabled;
  }

  private setUpTimer(gameConfig: GameSettings) {
    this.hasTimer = true;
    this.config = { format: `mm:ss`, leftTime: gameConfig.timer };
    this.countdown.begin();
    this.setUpProgressBar();
  }  

  private setUpProgressBar() {
    this.progressBarUpdate = setInterval(() => {
      this.p_bar_value = this.countdown.left / (1000 * this.config.leftTime);
    }, 1000);
  }

  private drawStar(): void {
    const context = this.canvasElement.getContext('2d');

    this.starDrawerService.drawStar(context);
  }

  public handleNodeSelect(nodeLabel: string): void {
    const hasWinGame = this.gameService.selectStar(nodeLabel);

    if (hasWinGame) {
      this.message = this.WON_GAME;
    }
    
    this.updateNodes();
    this.solveEnabled = false;
  }

  private updateNodes() {
    for (let label of this.nodes.keys()) {
      this.nodes.get(label).available = this.gameService.isAvailable(label);
      this.nodes.get(label).selected = this.gameService.isNodeSelected(label);
      this.nodes.get(label).marked = this.gameService.isMarked(label);
    }
  }

  public handleSolve(): void {
    this.stopTimer();
    this.displaySolution(this.gameService.solve());
  }

  private stopTimer() {
    this.hasTimer = false;
    clearInterval(this.progressBarUpdate);
  }

  private displaySolution(solution: string[]) {
    this.message = this.message.concat('\n\n');

    for (let i = 0; i < solution.length; i++) {
      this.message = this.message.concat(`${i + 1}.  `);
      this.message = this.message.concat(solution[i]);
      this.message = this.message.concat('\n');
    }
  }

  public handleReset(): void {
    this.reloadPage();
  }

  private reloadPage() {
    this.presentModal().then((modalDataResponse) => {
      if (modalDataResponse.data != null) {
        this.router.navigate(['/'], { replaceUrl: true }).then(() => {
          this.router.navigate(['/play/', modalDataResponse.data], { replaceUrl: true });
        });
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
      this.eraseProgressBar();
      this.presentAlert().then(_ => this.redirectToHomePage());
    }
  }

  private eraseProgressBar() {
    clearInterval(this.progressBarUpdate);
    this.p_bar_value = 0;
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

  private redirectToHomePage() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}