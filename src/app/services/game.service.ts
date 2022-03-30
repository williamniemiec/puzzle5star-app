/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import LevelService from './level.service';
import SolverService from './solver.service';
import StarService from './star.service';
import StarNode from '../models/star-node.model';
import Pair from '../models/pair.model';
import GameSettings from "../models/game-settings.model";


/**
 * Responsible for providing star5puzzle services.
 */
@Injectable(
  { providedIn: 'root' }
)
export default class GameService {
  
  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private readonly levelService: LevelService;
  private readonly solverService: SolverService;
  private readonly starService: StarService;
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

  /**
   * Selects a node.
   * 
   * @param         label Node label
   * 
   * @return        True if game has been won; false otherwise
   */
  public selectStar(label: string): boolean {
    let hasWonGame = false;

    if (this.isNodeSelected(label)) {
      this.handleSameNodeSelection(label);
    }
    else if (this.hasAnyNodeSelected()) {
      hasWonGame = this.handleAnotherNodeSelection(label);
    }
    else if (!this.isMarked(label)) {
      this.handleFirstNodeSelection(label);
    }

    return hasWonGame;
  }

  /**
   * Checks whether a node is selected in current selection.
   * 
   * @param         label Node label
   * 
   * @return        True if node is selected; false otherwise
   */
  public isNodeSelected(label: string): boolean {
    return this.selectedNodes.includes(label);
  }

  private handleSameNodeSelection(label: string) {
    this.unselectNode(label);

    if (this.hasAnyNodeSelected()) {
      const currentSelectedNode = this.selectedNodes[0];
      const availableNodes = this.getAvailableOptionsForNode(currentSelectedNode);

      this.updateAvailableNodes(availableNodes);
    }
    else {
      this.makeOnlyMarkedNodesAvailable();
    }
  }

  private unselectNode(label: string): void {
    const nodeIndex = this.selectedNodes.findIndex(node => node == label);

    this.selectedNodes = this.selectedNodes.slice(0, nodeIndex);
  }

  private getAvailableOptionsForNode(node: string): Set<string> {
    const availableNodes: Set<string> = new Set();
    const validEdges: Array<Pair<string>> = this.buildValidEdges(node, this.markedNodes);

    for (let edge of validEdges) {
      availableNodes.add(edge.getFirst());
      availableNodes.add(edge.getSecond());
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

  private updateAvailableNodes(availableNodes: Set<string>) {
    for (let node of this.starService.getLabels()) {
      this.nodes.get(node).available = this.selectedNodes.includes(node) || availableNodes.has(node);
    }
  }

  private makeOnlyMarkedNodesAvailable(): void {
    for (let node of this.starService.getLabels()) {
      this.nodes.get(node).available = !this.isMarked(node);
    }
  }

  public hasAnyNodeSelected(): boolean {
    return (this.selectedNodes.length > 0);
  }

  private handleAnotherNodeSelection(label: string) {
    let hasWonGame: boolean = false;
    const availableNodes = this.getAvailableOptionsForNodes(this.selectedNodes[0], this.selectedNodes[1]);
    
    this.updateAvailableNodes(availableNodes);
    this.selectNode(label);

    if (this.isLastNodeSelection()) {
      this.endSelection();
      hasWonGame = this.hasGameFinished();
    }

    return hasWonGame;
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

  private selectNode(label: string): void {
    this.selectedNodes.push(label);
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

  public isMarked(label: string): boolean {
    return this.markedNodes.has(label);
  }

  private handleFirstNodeSelection(label: string) {
    const availableNodes = this.getAvailableOptionsForNode(label);

    this.updateAvailableNodes(availableNodes);
    this.selectNode(label);
    this.makeNodeAvailable(label);
  }

  private makeNodeAvailable(node: string): void {
    this.nodes.get(node).available = true;
  }

  /**
   * Generates a solution for the game.
   * 
   * @return        List of paths to be selected in order to win the game
   */
  public solve(): Array<string> {
    return this.solverService.randomSolution(this.markedNodes);
  }
  
  /**
   * Checks whether a node is available for selection.
   * 
   * @param         label Node label
   * 
   * @return        True if node is available; false otherwise
   */
  public isAvailable(label: string): boolean {
    return this.nodes.get(label).available;
  }


  //---------------------------------------------------------------------------
  //		Getters
  //---------------------------------------------------------------------------
  public getNodes(): Map<string, StarNode> {
    return this.nodes;
  }
}