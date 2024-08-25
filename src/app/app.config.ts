
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app-routing.module";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { httpInterceptor } from "./core/interceptors/http.interceptor";


export const appConfig : ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([httpInterceptor]))

    ]
};
