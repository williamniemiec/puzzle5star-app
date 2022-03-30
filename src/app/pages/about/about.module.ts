import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage} from './about.page';


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