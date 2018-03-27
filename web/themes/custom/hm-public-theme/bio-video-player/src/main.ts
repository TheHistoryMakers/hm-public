import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

var INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g; // default

platformBrowserDynamic().bootstrapModule(AppModule);
