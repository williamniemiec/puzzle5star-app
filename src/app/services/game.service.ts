/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import { StarNode } from '../models/star-node.model';
import Pair from '../models/pair.model';
import { GameSettings } from "../models/game-settings.model";
import { LevelService } from './level.service';
import { ArrayService } from './array.service';
import { SolverService } from './solver.service';
import { StarService } from './star.service';


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
  private levelService: LevelService;
  private solverService: SolverService;
  private starService: StarService;
  private selectedNodes: Array<string>;
  private markedNodes: Set<string>;
  private nodes: Map<string, StarNode>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.levelService = new LevelService();
    this.solverService = new SolverService();
    this.starService = new StarService();
    this.markedNodes = new Set();
    this.selectedNodes = [];
    this.nodes = this.initializeNodes();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private initializeNodes(): Map<string, StarNode> {
    const initializedNodes = new Map();

    for (let node of this.starService.getLabels()) {
      initializedNodes.set(node, { marked: false, available: true, selected: false });
    }

    return initializedNodes;
  }

  /**
   * Starts a new game.
   * 
   * @param         level Level difficulty
   * 
   * @return        Game settings based on level provided
   */
  public newGame(level: string): GameSettings {
    this.selectedNodes = [];
    this.markedNodes = new Set();
    this.nodes = this.initializeNodes();

    return this.levelService.getLevel(level);
  }

  public selectStar(label: string): boolean {
    let winGame = false;

    if (this.isNodeSelected(label)) { // Selected same node
      this.unselectNode(label);

      if (!this.hasNodeSelected()) {
        for (let node of this.starService.getLabels()) {
          this.nodes.get(node).available = !this.markedNodes.has(node);
        }
      }
      else {
        const availableNodes = this.getAvailableOptionsForNode(this.selectedNodes[0], this.markedNodes);
        for (let node of this.starService.getLabels()) {
          this.nodes.get(node).available = this.selectedNodes.includes(node) || availableNodes.has(node);
        }
      }
    }
    else if (this.hasNodeSelected()) { // Selected another node
      this.selectNode(label);

      const availableNodes = this.getAvailableOptionsForNodes(this.selectedNodes[0], this.selectedNodes[1]);

      for (let node of this.starService.getLabels()) {
        this.nodes.get(node).available = this.selectedNodes.includes(node) || availableNodes.has(node);
      }
      
      if (this.isLastNodeSelection()) {
        this.endSelection();
        winGame = this.hasGameFinished();
      }
    }
    else if (!this.markedNodes.has(label)) { // Selected a node without being selected another before
      this.selectNode(label);
      const availableNodes = this.getAvailableOptionsForNode(label, this.markedNodes);

      for (let node of this.starService.getLabels()) {
        this.nodes.get(node).available = availableNodes.has(node);
      }

      this.nodes.get(label).available = true;
    }

    return winGame;
  }

  private getAvailableOptionsForNodes(node1: string, node2: string): Set<string> {
    const availableNodes: Set<string> = new Set();

    for (let entry of this.starService.getPathFrom(node1)) {
      if (entry.getFirst() == node2) {
        availableNodes.add(entry.getSecond());
      }
      else if (entry.getSecond() == node2) {
        availableNodes.add(entry.getFirst());
      }
    }

    return availableNodes;
  }

  private getAvailableOptionsForNode(node: string, marked: Set<string>): Set<string> {
    const availableNodes: Set<string> = new Set();
    const validEdges: Array<Pair<string>> = this.buildValidEdges(node, marked);

    for (let pair of validEdges) {
      availableNodes.add(pair.getFirst());
      availableNodes.add(pair.getSecond());
    }

    return availableNodes;
  }

  private buildValidEdges(node: string, marked: Set<string>) {
    const validEdges: Array<Pair<string>> = []; 

    for (let pair of this.starService.getPathFrom(node)) {
      let destination = pair.getSecond();

      if (!marked.has(destination)) {
        validEdges.push(pair);
      }
    }

    return validEdges;
  }

  private isLastNodeSelection(): boolean {
    return (this.selectedNodes.length == 3);
  }

  private endSelection(): void {
    this.markedNodes.add(this.selectedNodes[2]);
    this.selectedNodes = [];

    for (let node of this.starService.getLabels()) {
      if (this.markedNodes.has(node)) {
        continue;
      }

      this.nodes.get(node).available = true;
    }
  }

  private hasGameFinished(): boolean {
    return (this.markedNodes.size == 9);
  }

  public solve(): Array<string> {
    return this.solverService.randomSolution(this.markedNodes);
  }

  public isNodeSelected(label: string): boolean {
    return this.selectedNodes.includes(label);
  }

  private unselectNode(label: string): void {
    const nodeIndex = this.selectedNodes.findIndex(node => node == label);

    this.selectedNodes = this.selectedNodes.slice(0, nodeIndex);
  }

  private selectNode(label: string): void {
    this.selectedNodes.push(label);
  }

  public hasNodeSelected(): boolean {
    return (this.selectedNodes.length > 0);
  }

  public isMarked(label: string): boolean {
    return this.markedNodes.has(label);
  }
  
  public isAvailable(label: string): boolean {
    return this.nodes.get(label).available;
  }

  public getNodes(): Map<string, StarNode> {
    return this.nodes;
  }
}