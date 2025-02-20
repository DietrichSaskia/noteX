import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: 
    [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes), provideFirebaseApp(() => 
        initializeApp
        ({
          "projectId":"notex-23660",
          "appId":"1:455250890389:web:e23b134eecb0a68d45d59c",
          "storageBucket":"notex-23660.firebasestorage.app",
          "apiKey":"AIzaSyA20TCmQW9syTzGFvhHzkZkAi77QbN2Le4",
          "authDomain":"notex-23660.firebaseapp.com",
          "messagingSenderId":"455250890389"
        })),
        provideFirestore(() => getFirestore())
    ]
};
