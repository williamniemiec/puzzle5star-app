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
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


/**
 * Responsible for representing how to play page.
 */
@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.page.html',
  styleUrls: ['./how-to-play.page.scss']
})
export class HowToPlayPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  public howToPlayDescription = "";


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public router: Router) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  ngOnInit(): void {
      this.howToPlayDescription = "O problema consiste em, a partir de um ponto de partida escolhido livremente por um usuário entre os 10 disponíveis marcar outro ponto distante de um ponto deste em linha reta (ambos pontos não devem ainda ainda estarem marcados), O objetivo é marcar o maior número possível de pontos (que são 9). O ponto de passagem independe de marcação.";
  }
}