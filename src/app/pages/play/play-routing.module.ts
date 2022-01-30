import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PlayPage } from './play.page';


const routes: Array<Route> = [
  {
      path: '',
      component: PlayPage
  },
];


/**
 * Responsible for handling play page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}
