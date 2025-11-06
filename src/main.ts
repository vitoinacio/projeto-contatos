import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database'; // RTDB

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCpMQRxvd9w1nSPDB1RtrekM-6n4sh42r8',
  authDomain: 'projeto-contatos-60226.firebaseapp.com',
  databaseURL: 'https://projeto-contatos-60226-default-rtdb.firebaseio.com',
  projectId: 'projeto-contatos-60226',
  storageBucket: 'projeto-contatos-60226.firebasestorage.app',
  messagingSenderId: '988591081517',
  appId: '1:988591081517:web:5b42b47e4d15b4f8a3d0a4',
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
  ],
});
