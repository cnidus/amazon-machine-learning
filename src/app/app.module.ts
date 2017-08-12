import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { MdButtonModule, MdCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { PredictionComponent } from './prediction/prediction.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'prediction', component: PredictionComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataEntryComponent,
    PredictionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes),
    MdButtonModule, MdCheckboxModule, ReactiveFormsModule, MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
