/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import Pair from '../models/pair.model';


/**
 * Responsible for providing star management services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class StarService {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private readonly labels: Array<string>;

  /**
   * A cycle graph where every edge represents a valid possible marking.
   */ 
   private readonly markingGraph: Map<string, Set<Pair<string>>>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.labels = this.initializeNodeLabels();
    this.markingGraph = this.initializeMarkingGraph();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private initializeNodeLabels(): string[] {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
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


  //---------------------------------------------------------------------------
  //		Getters
  //---------------------------------------------------------------------------
  public getPathFrom(node: string): Set<Pair<string>> {
    return this.markingGraph.get(node);
  }

  public getPaths(): Map<string, Set<Pair<string>>> {
    return this.markingGraph;
  }

  public getLabels(): Array<string> {
    return this.labels;
  }
}