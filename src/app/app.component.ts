import { 
  Component, 
  ElementRef,
  ViewChild,
  OnInit, 
  AfterViewInit
} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas') canvasEl : ElementRef;
  private _CANVAS  : any;
  //private _CONTEXT : any;
  private dx = 0; 
  public dy = 0; 
  public radius = 100;
  public dig = 10;

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  
  ngAfterViewInit() {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;
    this.draw();
  }

  draw() {
    
    //var context = canvas.getContext('2d');
    var context = this._CANVAS.getContext('2d');
    //context.fillStyle = "#EEEEDD";
    //context.fillRect(0, 0, 400, 300);
    context.translate(100, 100);
    context.strokeStyle = 'red';
    this.draw5Star(context);
    context.stroke();
    

  }

  draw5Star(context) { 
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
  
}
