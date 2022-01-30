import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HowToPlayPage } from './how-to-play.page';


const routes: Array<Route> = [
  {
      path: '',
      component: HowToPlayPage
  },
];


/**
 * Responsible for handling how to play page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToPlayPageRoutingModule {}
