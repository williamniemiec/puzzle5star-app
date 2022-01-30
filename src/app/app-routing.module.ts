import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => (
      import('./pages/home/home.module')
        .then(m => m.HomePageModule)
    )
  },
  {
    path: 'about',
    loadChildren: () => (
      import('./pages/about/about.module')
        .then(m => m.AboutPageModule)
    )
  },
  {
    path: 'how-to-play',
    loadChildren: () => (
      import('./pages/how-to-play/how-to-play.module')
        .then(m => m.HowToPlayPageModule)
    )
  },
  {
    path: 'play',
    loadChildren: () => (
      import('./pages/play/play.module')
        .then(m => m.PlayPageModule)
    )
  },
];


/**
 * Responsible for handling application routes.
 */
 @NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
