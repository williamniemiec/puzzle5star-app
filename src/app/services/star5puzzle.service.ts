import { LevelService } from './level.service';
import { Injectable } from "@angular/core";
import { GameSettings } from "../models/game-settings.model";


/**
 * Responsible for providing star5puzzle services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class Star5PuzzleService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private selectedNode = "";
  private levelService: LevelService;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.levelService = new LevelService();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public newGame(level: string): GameSettings {
    return this.levelService.getLevel(level);
  }

  public selectStar(label: string): void {
    if (this.isSelected(label)) {
      this.selectedNode = "";
    }
    else {
      this.selectedNode = label;
    }
  }

  public isSelected(label: string): any {
    return (this.selectedNode === label);
  }

  public isMarked(label: string): boolean {
    return false;
  }
  
  public isAvailable(label: string): boolean {
    return true;
  }
}