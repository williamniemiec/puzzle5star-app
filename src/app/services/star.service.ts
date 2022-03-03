import { Injectable } from "@angular/core";


/**
 * Responsible for providing star5puzzle star services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class StarService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private dx = 0;
  public dy = 0;
  public radius = 100;
  public dig = 10;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public drawStar(context): void {
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
  
}