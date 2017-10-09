import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule, MdCardModule } from '@angular/material';
import { AwsService } from './services/aws/aws.service';
// import { DataFormService } from './services/data-form/data-form.service';
import { RouteAuthService } from './services/route-auth/route-auth.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';

// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// Import the video service
import { VideoService } from './services/video/video.service';
import { VoteService } from './services/vote/vote.service';
import { VideoOptionsComponent } from './video-options/video-options.component'
// import { VotePage } from './vote-page/vote-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full' },
  { path: 'auth/:authprovider', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'data-entry', component: DataEntryComponent, canActivate: [RouteAuthService] },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataEntryComponent,
    VideoOptionsComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, BrowserAnimationsModule, RouterModule.forRoot(routes),
    MdButtonModule, MdCheckboxModule, ReactiveFormsModule, MdInputModule, MdCardModule
  ],
  providers: [ AwsService, RouteAuthService, VideoService, VoteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
