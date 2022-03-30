/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Responsible for representing an ordered pair.
 * 
 * @param       T Content type
 */
export default class Pair<T> {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private first: T;
  private second: T;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(first: T, second: T) {
    this.first = first;
    this.second = second;
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  /**
   * Creates a pair of two elements.
   * 
   * @param       first First element
   * @param       second Second element
   * 
   * @return      Pair containing the provided elements 
   */
  public static of<T>(first: T, second: T): Pair<T> {
    return new Pair(first, second);
  }


  //---------------------------------------------------------------------------
  //		Getters
  //---------------------------------------------------------------------------
  public getFirst(): T {
    return this.first;
  }

  public getSecond(): T {
    return this.second;
  }
}