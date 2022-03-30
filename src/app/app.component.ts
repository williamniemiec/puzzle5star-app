import { Component } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';


/**
 * Responsible for defining application template.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');

    Globalization.getPreferredLanguage()
    .then(lang => {
      translate.use(this.normalizeLanguage(lang.value));
     })
    .catch(_ => {
      translate.use(this.normalizeLanguage(navigator.language));
     });
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private normalizeLanguage(language: string): string {
    if (!language.includes("-")) {
      return language;
    }

    return language.split("-")[0];
  }
}
