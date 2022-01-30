import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AboutPage } from './about.page';


const routes: Array<Route> = [
  {
      path: '',
      component: AboutPage
  },
];


/**
 * Responsible for handling about page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}
