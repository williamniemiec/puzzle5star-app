/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";


/**
 * Responsible for providing array services.
 */
@Injectable(
  { providedIn: 'root' }
)
export default class ArrayService {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  /**
   * Selects a random element from a list.
   * 
   * @param         list List
   * 
   * @return        Random element from the provided list 
   */
  public randomChoice(list: Array<any>): any {
    const index = Math.floor(Math.random() * list.length);

    return list[index];
  }

  /**
   * Shuffle a list and return the shuffled list.
   * 
   * @param         list List
   * 
   * @return        Shuffled list
   */
  public shuffle(list: Array<any>): Array<any> {
    let currentIndex = list.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [list[currentIndex], list[randomIndex]] = [
        list[randomIndex], list[currentIndex]];
    }

    return list;
  }
}