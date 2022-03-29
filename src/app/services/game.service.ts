/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StarNode } from './../models/star-node.model';
import { LevelService } from './level.service';
import { Injectable } from "@angular/core";
import { GameSettings } from "../models/game-settings.model";


class Pair<T> {
  private first: T;
  private second: T;

  constructor(first: T, second: T) {
    this.first = first;
    this.second = second;
  }

  public static of(first, second) {
    return new Pair(first, second);
  }

  public getFirst(): T {
    return this.first;
  }

  public getSecond(): T {
    return this.second;
  }
}


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
  private selectedNodes: Array<string>;
  private levelService: LevelService;
  private nodeLabels: Array<string>;
  private markedNodes: Set<string>;
  private nodes: Map<string, StarNode>;

  /**
   * A cycle graph where every edge represents a valid possible marking.
   */ 
  private markingGraph: Map<string, Set<Pair<string>>>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.levelService = new LevelService();
    this.nodeLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.selectedNodes = [];
    this.markedNodes = new Set();
    this.nodes = this.initializeNodes();
    this.markingGraph = this.initializeMarkingGraph();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private initializeNodes(): Map<string, StarNode> {
    const initializedNodes = new Map();
    

    for (let node of this.nodeLabels) {
      initializedNodes.set(node, { marked: false, available: true, selected: false });
    }

    return initializedNodes;
  }

  private initializeMarkingGraph(): Map<string, Set<Pair<string>>> {
    const initializedMarkingGraph = new Map();

    initializedMarkingGraph.set('A', new Set([Pair.of('J', 'H'), Pair.of('B', 'D')]));
    initializedMarkingGraph.set('B', new Set([Pair.of('J', 'I'), Pair.of('D', 'E')]));
    initializedMarkingGraph.set('C', new Set([Pair.of('B', 'J'), Pair.of('D', 'F')]));
    initializedMarkingGraph.set('D', new Set([Pair.of('B', 'A'), Pair.of('F', 'G')]));
    initializedMarkingGraph.set('E', new Set([Pair.of('D', 'B'), Pair.of('F', 'H')]));
    initializedMarkingGraph.set('F', new Set([Pair.of('D', 'C'), Pair.of('H', 'I')]));
    initializedMarkingGraph.set('G', new Set([Pair.of('F', 'D'), Pair.of('H', 'J')]));
    initializedMarkingGraph.set('H', new Set([Pair.of('F', 'E'), Pair.of('J', 'A')]));
    initializedMarkingGraph.set('I', new Set([Pair.of('H', 'F'), Pair.of('J', 'B')]));
    initializedMarkingGraph.set('J', new Set([Pair.of('H', 'G'), Pair.of('B', 'C')]));

    return initializedMarkingGraph;
  }

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
        for (let node of this.nodeLabels) {
          this.nodes.get(node).available = !this.markedNodes.has(node);
        }
      }
      else {
        const availableNodes = this.getAvailableOptionsForNode(this.selectedNodes[0], this.markedNodes);
        for (let node of this.nodeLabels) {
          this.nodes.get(node).available = this.selectedNodes.includes(node) || availableNodes.has(node);
        }
      }
    }
    else if (this.hasNodeSelected()) { // Selected another node
      this.selectNode(label);

      const availableNodes = this.getAvailableOptionsForNodes(this.selectedNodes[0], this.selectedNodes[1]);

      for (let node of this.nodeLabels) {
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

      for (let node of this.nodeLabels) {
        this.nodes.get(node).available = availableNodes.has(node);
      }

      this.nodes.get(label).available = true;
    }

    return winGame;
  }

  private getAvailableOptionsForNodes(node1: string, node2: string): Set<string> {
    const availableNodes: Set<string> = new Set();

    for (let entry of this.markingGraph.get(node1)) {
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

    for (let pair of this.markingGraph.get(node)) {
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

    for (let node of this.nodeLabels) {
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
    return this.random_solution(this.markedNodes);
  }

  private random_solution(marked: Set<string>=null): Array<string> {
    const start = this.randomChoice(Array.from(this.markingGraph.keys()));
    const markings = [];
    let markedFromSolution = new Set(marked);
    let candidates = [start];

    while (candidates && markedFromSolution.size < 9) {
      candidates = this.shuffle(candidates);
      let currentTarget = candidates.pop();

      let validEdges: Array<Pair<string>> = this.buildValidEdges(currentTarget, markedFromSolution);
      
      let possibleMarkings = [];
      for (let pair of validEdges) {
        let middle = pair.getFirst();
        let destination = pair.getSecond();

        possibleMarkings.push(`${destination}${middle}${currentTarget}`);
      }

      let marking = this.randomChoice(possibleMarkings);
      markedFromSolution.add(currentTarget);
      markings.push(marking);

      for (let pair of validEdges) {
        let destination = pair.getSecond();

        candidates.push(destination);
      }
    }

    return markings;
  }

  /* ARRAY SERVICE - START */
  private randomChoice(list: Array<string>) {
    const index = Math.floor(Math.random() * list.length);
    
    return list[index];
  }

  private shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }  

  /* ARRAY SERVICE - END */

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