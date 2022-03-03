import { LevelService } from './level.service';
import { Injectable } from "@angular/core";
import { GameSettings } from "../models/game-settings.model";


/**
 * Responsible for providing star5puzzle services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class GameService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private selectedNode = "";
  private levelService: LevelService;
  private nodes = {
    "A": { marked: false, available: true, selected: false },
    "B": { marked: false, available: true, selected: false },
    "C": { marked: false, available: true, selected: false },
    "D": { marked: false, available: true, selected: false },
    "E": { marked: false, available: true, selected: false },
    "F": { marked: false, available: true, selected: false },
    "G": { marked: false, available: true, selected: false },
    "H": { marked: false, available: true, selected: false },
    "I": { marked: false, available: true, selected: false },
    "J": { marked: false, available: true, selected: false },
  };


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
    return this.nodes[label].marked;
  }
  
  public isAvailable(label: string): boolean {
    return this.nodes[label].available;
  }
}