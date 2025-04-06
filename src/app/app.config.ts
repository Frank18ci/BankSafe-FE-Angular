import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withFetch } from "@angular/common/http";
import {
	provideClientHydration,
	withEventReplay,
} from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		provideToastr(),
		provideHttpClient(withFetch()),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
	],
};
