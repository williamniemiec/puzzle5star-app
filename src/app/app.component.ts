import { 
  Component, 
  ElementRef,
  ViewChild,
  OnInit, 
  AfterViewInit
} from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');

    Globalization.getPreferredLanguage()
    .then(lang => {
      translate.use(this.normalizeLanguage(lang.value));
     })
    .catch(error => {
      translate.use(this.normalizeLanguage(navigator.language));
     });
  }

  private normalizeLanguage(language: string): string {
    if (!language.includes("-")) {
      return language;
    }

    return language.split("-")[0];
  }
}
