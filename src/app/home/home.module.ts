import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    HomeRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
