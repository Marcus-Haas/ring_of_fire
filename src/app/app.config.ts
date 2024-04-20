import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-60fd9", "appId": "1:56845266036:web:b9744e0631d1ebff1af521", "storageBucket": "ring-of-fire-60fd9.appspot.com", "apiKey": "AIzaSyDKN6nLg_YyR9i1jLHCEs7xTSho6ODW6sI", "authDomain": "ring-of-fire-60fd9.firebaseapp.com", "messagingSenderId": "56845266036" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
