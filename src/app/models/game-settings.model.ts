/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Responsible for defining game settings.
 */
export interface GameSettings {

  level: string;
  hasTimer: boolean;
  timer: number;
  message: string;
  solverEnabled: boolean;
}
