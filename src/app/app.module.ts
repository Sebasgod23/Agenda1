import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
<<<<<<< HEAD
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; 
=======
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
>>>>>>> e2d75ef (Subida de Agenda1)
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
<<<<<<< HEAD
    provideFirestore(() => getFirestore()), 
=======
    provideFirestore(() => getFirestore()),
>>>>>>> e2d75ef (Subida de Agenda1)
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

<<<<<<< HEAD
 // Autor: Sebastian Andoney
=======
 // Autor: Sebastian Andoney
>>>>>>> e2d75ef (Subida de Agenda1)
