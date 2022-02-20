import { Injectable } from "@angular/core";


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


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
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