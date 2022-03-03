import { StarNode } from './../models/star-node.model';
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
  private nodes: Map<string, StarNode>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.levelService = new LevelService();
    this.nodes = this.initializeNodes();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private initializeNodes(): Map<string, StarNode> {
    console.log("A")
    const initializedNodes = new Map();
    const nodeLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    for (let node of nodeLabels) {
      initializedNodes.set(node, { marked: false, available: true, selected: false });
    }

    return initializedNodes;
  }

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

  public solve(): void {
    alert('Not implemented yet!');
  }

  public isSelected(label: string): any {
    return (this.selectedNode === label);
  }

  public isMarked(label: string): boolean {
    return this.nodes.get(label).marked;
  }
  
  public isAvailable(label: string): boolean {
    return this.nodes.get(label).available;
  }

  public getNodes(): Map<string, StarNode> {
    return this.nodes;
  }
}