import { CountdownConfig } from './../../../../node_modules/ngx-countdown/interfaces.d';
import { Star5PuzzleService } from './../../services/star5puzzle.service';
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
import {Location} from '@angular/common'; 
import { CountdownComponent } from 'ngx-countdown';
import { TranslateService } from '@ngx-translate/core';

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
  @ViewChild('canvas') canvasEl : ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  private _CANVAS  : any;
  //private _CONTEXT : any;
  private dx = 0; 
  public dy = 0; 
  public radius = 100;
  public dig = 10;
  public message = "";
  public hasTimer = true;
  public config: CountdownConfig = { format: `mm:ss`, leftTime: 1 };
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
    public star5puzzleService: Star5PuzzleService,
    public modalController: ModalController,
    private translate: TranslateService
    
  ) {
    this.message = "Mark 9 points"
  }

  ngAfterViewInit() {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;
    this.renderText();
    this.loadLevel();
    this.draw();
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


  private loadLevel() {
    const level = this.routeParams.snapshot.params.level;

    console.log('Level selected: ', level);
    this.config = { format: `mm:ss`, leftTime: 10 };
    this.countdown.begin();
    
    this.progressBarUpdate = setInterval(() => {
      this.p_bar_value = this.countdown.left / (1000*this.config.leftTime);
    }, 1000);
    
  }

  private draw() {
    
    //var context = canvas.getContext('2d');
    var context = this._CANVAS.getContext('2d');
    //context.fillStyle = "#EEEEDD";
    //context.fillRect(0, 0, 400, 300);
    context.translate(100, 100);
    context.strokeStyle = '#f7c11e';
    context.lineWidth = 3;
    this.draw5Star(context);
    context.stroke();
    

  }

  private draw5Star(context) { 
    context.beginPath();
    var x = this.radius * Math.sin(Math.PI / 5) + this.dx;
    var y = this.radius * Math.cos(Math.PI / 5) + this.dy;

    context.moveTo(x, y); 


    for (var i = 1; i < 5; i++) {
      var x = this.radius * Math.sin(i * this.dig + Math.PI / 5);
      var y = this.radius * Math.cos(i * this.dig + Math.PI / 5);
      context.lineTo(this.dx + x, this.dy + y);
    }

    context.closePath();

  }

  public handleNodeSelect(nodeLabel: string): void {
    this.star5puzzleService.selectStar(nodeLabel);

    for (let label of Object.keys(this.nodes)) {
      this.nodes[label].available = this.star5puzzleService.isAvailable(label);
      this.nodes[label].selected = this.star5puzzleService.isSelected(label);
      this.nodes[label].isMarked = this.star5puzzleService.isMarked(label);
    }
  }

  public handleSolve(): void {
    alert('Not implemented yet!');
  }

  public handleReset(): void {
    this.presentModal().then((modalDataResponse) => {
      if (modalDataResponse.data != null) {
        this.router.navigate(['/'], {replaceUrl: true}).then(() => {
          this.router.navigate(['/play/', modalDataResponse.data], {replaceUrl: true})
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

  public handleEvent(event) {
    if (event.action === 'done') {
      console.log('CLOCK EVENT', event);
      clearInterval(this.progressBarUpdate);
      this.p_bar_value = 0
      //alert('Time expired!');
      //this.router.navigate(['/'], {replaceUrl: true})
    }
  }
}