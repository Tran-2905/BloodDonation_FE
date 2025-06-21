import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/auth.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(SocialLoginModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('331644149748-lq5svlpe8d0je01ulmpblecb2r24l780.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
    },
  ]
})
  .catch((err) => console.error(err));
