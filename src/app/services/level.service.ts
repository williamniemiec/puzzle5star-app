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
      message: "Mark 9 points."
    }
  }

  private buildMediumGameSettings(): GameSettings {
    return {
      level: "medium",
      hasTimer: true,
      timer: 50,
      message: "Mark 9 points before time expires."
    }
  }

  private buildHardGameSettings(): GameSettings {
    return {
      level: "easy",
      hasTimer: true,
      timer: 15,
      message: "Mark 9 points before time expires."
    }
  }

  public getLevel(level: string): GameSettings {
    return this.levels.get(level);
  }
}