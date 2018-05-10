import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SessionService } from './services/session.service';
import { HoneyInfoService } from './services/honey-info.service';


import { routes } from './routes';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { HomeComponent } from './components/home/home.component';
import { HoneyListComponent } from './components/honey-list/honey-list.component';
import { HoneyDetailComponent } from './components/honey-detail/honey-detail.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { FillDetailsFormComponent } from './components/fill-details-form/fill-details-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    HomeComponent,
    HoneyListComponent,
    HoneyDetailComponent,
    MyProfileComponent,
    FillDetailsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService, HoneyInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
