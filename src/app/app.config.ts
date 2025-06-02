/**
 * import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

 */
//registerLocaleData(en);

/**
 * export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideNzIcons(icons), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
 */

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    AuthService
  ]
};
