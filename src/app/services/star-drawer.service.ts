/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";


/**
 * Responsible for drawing a star.
 */
@Injectable(
  { providedIn: 'root' }
)
export default class StarDrawerService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private readonly angle: number;
  private dx: number;
  private dy: number;
  private radius: number;
  private width: number;
  private color: string;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.angle = 10;
    this.dx = 0;
    this.dy = 0;
    this.radius = 100;
    this.width = 3;
    this.color = '#f7c11e';
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  /**
   * Draws a five pointed star in a canvas.
   * 
   * @param       context Canvas context
   */
  public drawStar(context: any): void {
    this.setUpStar(context);
    this.draw(context);
    context.stroke();
  }

  private setUpStar(context: any): void {
    context.translate(this.radius, this.radius);
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
  }

  private draw(context: any): void {
    context.beginPath();
    this.setStarPosition(context);
    this.drawLines(context);
    context.closePath();
  }

  private setStarPosition(context: any): void {
    const x = this.radius * Math.sin(Math.PI / 5) + this.dx;
    const y = this.radius * Math.cos(Math.PI / 5) + this.dy;

    context.moveTo(x, y);
  }

  private drawLines(context: any): void {
    for (let i = 1; i < 5; i++) {
      let x = this.radius * Math.sin(i * this.angle + Math.PI / 5);
      let y = this.radius * Math.cos(i * this.angle + Math.PI / 5);
      
      context.lineTo(this.dx + x, this.dy + y);
    }
  }


  //---------------------------------------------------------------------------
  //		Setters
  //---------------------------------------------------------------------------
  public setOffset(dx: number, dy: number): void {
    this.dx = dx;
    this.dy = dy;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setColor(color: string): void {
    this.color = color;
  }
}