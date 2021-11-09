import { Component } from '@angular/core';
import { TranslationsService } from './service/translations-service/translations.service';
import { AuthServices } from './service/auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app2';
  constructor(
    private authService: AuthServices,
    private translationsService: TranslationsService
    ) {}

  ngOnInit() {
    this.translationsService.init();
    // this.translationsService.setDefaultLang('es');
    
    this.authService.autoLogin();
  }
}
