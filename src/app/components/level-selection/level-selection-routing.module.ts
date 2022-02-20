import { LevelSelectionPage } from './level-selection.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
      path: '',
      component: LevelSelectionPage
  },
];


/**
 * Responsible for handling level selection modal routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelSelectionPageRoutingModule {}
