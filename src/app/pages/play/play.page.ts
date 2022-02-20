import { Star5PuzzleService } from './../../services/star5puzzle.service';
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
  private _CANVAS  : any;
  //private _CONTEXT : any;
  private dx = 0; 
  public dy = 0; 
  public radius = 100;
  public dig = 10;
  public message = "";
  
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
    public star5puzzleService: Star5PuzzleService,
    public modalController: ModalController
  ) {
    this.message = "Mark 9 points"
  }

  ngAfterViewInit() {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;
    this.draw();
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

  }

  public handleReset(): void {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LevelSelectionPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        let response = modalDataResponse.data;
        console.log('Modal Sent Data : '+ response);
      }
    });

    return await modal.present();
  }
}