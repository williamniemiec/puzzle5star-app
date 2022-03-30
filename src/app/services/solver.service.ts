/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import Pair from '../models/pair.model';
import StarService from './star.service';
import ArrayService from './array.service';


/**
 * Responsible for providing game solvers.
 */
@Injectable(
  { providedIn: 'root' }
)
export default class SolverService {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  private readonly arrayService: ArrayService;
  private readonly starService: StarService;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
    this.arrayService = new ArrayService();
    this.starService = new StarService();
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public randomSolution(marked: Set<string> = null): Array<string> {
    const start = this.selectRandomNode();
    const markings = [];
    let markedFromSolution = new Set(marked);
    let candidates = [start];

    while (candidates && markedFromSolution.size < 9) {
      candidates = this.arrayService.shuffle(candidates);
      let currentTarget = candidates.pop();

      let validEdges: Array<Pair<string>> = this.buildValidEdges(currentTarget, markedFromSolution);

      let possibleMarkings = [];
      for (let pair of validEdges) {
        let middle = pair.getFirst();
        let destination = pair.getSecond();

        possibleMarkings.push(`${destination}${middle}${currentTarget}`);
      }

      let marking = this.arrayService.randomChoice(possibleMarkings);
      markedFromSolution.add(currentTarget);
      markings.push(marking);

      for (let pair of validEdges) {
        let destination = pair.getSecond();

        candidates.push(destination);
      }
    }

    return markings;
  }

  private selectRandomNode() {
    const nodes = Array.from(this.starService.getPaths().keys());

    return this.arrayService.randomChoice(nodes);
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
}