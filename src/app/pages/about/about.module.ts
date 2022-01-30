import { AboutPageRoutingModule } from './about-routing.module';
import { NgModule } from '@angular/core';
import { AboutPage} from './about.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing about page context.
 */
@NgModule({
  declarations: [AboutPage],
  imports: [
    CommonModule,
    IonicModule,
    AboutPageRoutingModule
  ]
})
export class AboutPageModule {
}