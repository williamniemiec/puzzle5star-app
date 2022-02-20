import { Star5PuzzleService } from './../../services/star5puzzle.service';
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
  private selectedNode = "";
  public nodes = {
    "A": { marked: false, available: true, isSelected: () => this.isSelected("A") },
    "B": { marked: false, available: true, isSelected: () => this.isSelected("B") },
    "C": { marked: false, available: true, isSelected: () => this.isSelected("C") },
    "D": { marked: false, available: true, isSelected: () => this.isSelected("D") },
    "E": { marked: false, available: true, isSelected: () => this.isSelected("E") },
    "F": { marked: false, available: true, isSelected: () => this.isSelected("F")},
    "G": { marked: false, available: true, isSelected: () => this.isSelected("G") },
    "H": { marked: false, available: true, isSelected: () => this.isSelected("H") },
    "I": { marked: false, available: true, isSelected: () => this.isSelected("I") },
    "J": { marked: false, available: true, isSelected: () => this.isSelected("J") },
  };


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router,
    public star5puzzleService: Star5PuzzleService
  ) {
    this.nodes['D'].marked = true;
    this.message = "Mark 9 points"
  }

  isSelected(nodeLabel: string) {
    return (this.selectedNode === nodeLabel);
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
    console.log('CLICOU NO NODO ' + nodeLabel);
    
    for (let label of Object.keys(this.nodes)) {
      if (!this.nodes[label].marked) {
        this.nodes[label].available = false;
        this.nodes[label].selected = false;
      }
    }

    this.selectedNode = nodeLabel;
    this.nodes['H'].available = true;
  }

  public handleSolve(): void {

  }

  public handleReset(): void {
    
  }
}