/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Responsible for defining the state of a star node.
 */
export default interface StarNode {
  
  marked: boolean, 
  available: boolean, 
  selected: boolean
}
