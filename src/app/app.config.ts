import {
  type ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { userGuardGuard } from './UserGuard/user-guard.guard';
import { tokenInterceptorInterceptor } from './auth/token-interceptor.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
export const appConfig: ApplicationConfig = {
  providers: [
	CookieService,
    providePrimeNG({
      theme: {preset: Aura}
    }),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
