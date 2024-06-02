import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { enviroment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: enviroment.auth0.auth.domain,
        clientId: enviroment.auth0.auth.clientId,
        authorizationParams: {
          redirect_uri: window.location.origin+'/redirect',
          audience: enviroment.auth0.auth.authorizationParams.audience
        },
        httpInterceptor: {
          ...enviroment.auth0.httpInterceptor,
        },
      }),
    ),
    importProvidersFrom(AngularFireModule.initializeApp(enviroment.firebaseConfig)),
    importProvidersFrom(AngularFireStorageModule),
    importProvidersFrom(AngularFireDatabaseModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
  ]
};
