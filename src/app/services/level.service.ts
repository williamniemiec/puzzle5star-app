/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import { GameSettings } from "../models/game-settings.model";


/**
 * Responsible for providing star5puzzle level services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class LevelService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private levels: Map<string, GameSettings>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
      this.levels = new Map();
      this.levels.set("easy", this.buildEasyGameSettings());
      this.levels.set("medium", this.buildMediumGameSettings());
      this.levels.set("hard", this.buildHardGameSettings());
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private buildEasyGameSettings(): GameSettings {
    return {
      level: "easy",
      hasTimer: false,
      timer: 0,
      message: "EASY_MESSAGE"
    }
  }

  private buildMediumGameSettings(): GameSettings {
    return {
      level: "medium",
      hasTimer: true,
      timer: 50,
      message: "MEDIUM_MESSAGE"
    }
  }

  private buildHardGameSettings(): GameSettings {
    return {
      level: "easy",
      hasTimer: true,
      timer: 15,
      message: "HARD_MESSAGE"
    }
  }

  public getLevel(level: string): GameSettings {
    return this.levels.get(level);
  }
}