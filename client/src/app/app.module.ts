import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {AngularGooglePlaceModule} from 'angular-google-place';
import { ChartsModule } from 'ng2-charts';

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
import { HiveDetailComponent } from './components/hive-detail/hive-detail.component';
import { HiveInfoService } from './services/hive-info.service';
import { MyProfileEditComponent } from './components/my-profile/my-profile-edit/my-profile-edit.component';
import { MyProfileDeleteComponent } from './components/my-profile/my-profile-delete/my-profile-delete.component';
import { MyProfileHivesComponent } from './components/my-profile/my-profile-hives/my-profile-hives.component';
import { MyProfileAddnewhiveComponent } from './components/my-profile/my-profile-addnewhive/my-profile-addnewhive.component';
import { MyProfilePaymentsComponent } from './components/my-profile/my-profile-payments/my-profile-payments.component';
import { MyProfileBillingComponent } from './components/my-profile/my-profile-billing/my-profile-billing.component';
import { IsPatronService } from './services/is-patron.service';
import { ShowMessagesComponent } from './components//my-profile/show-messages/show-messages.component';
import { MessagingService } from './services/messaging.service';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AddnewhivePicsComponent } from './components/my-profile/my-profile-addnewhive/addnewhive-pics/addnewhive-pics.component';
import { GeocodeComponent } from './components/geocode/geocode.component';
import { PictureUploadService } from './services/picture-upload.service';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MyProfileAddnewhoneyComponent } from './components/my-profile/my-profile-addnewhoney/my-profile-addnewhoney.component';
import { MyProfileAddnewhoneyPicsComponent } from './components/my-profile/my-profile-addnewhoney/my-profile-addnewhoney-pics/my-profile-addnewhoney-pics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeBeekeeperComponent } from './components/home-beekeeper/home-beekeeper.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    HomeComponent,
    HoneyListComponent,
    HoneyDetailComponent,
    MyProfileComponent,
    GeocodeComponent,
    FillDetailsFormComponent,
    HiveDetailComponent,
    MyProfileEditComponent,
    MyProfileDeleteComponent,
    MyProfileHivesComponent,
    MyProfileAddnewhiveComponent,
    MyProfilePaymentsComponent,
    MyProfileBillingComponent,
    ShowMessagesComponent,
    SendMessageComponent,
    AddnewhivePicsComponent,
    GeocodeComponent,
    ChartTestComponent,
    FilterPipe,
    MyProfileAddnewhoneyComponent,
    MyProfileAddnewhoneyPicsComponent,
    HomeBeekeeperComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEJmeY3Pyn91jt-VceT2StgpSovA9jcrs'
    }),
    FileUploadModule,
    AngularGooglePlaceModule,
    ChartsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [
    SessionService,
    HoneyInfoService,
    HiveInfoService,
    IsPatronService,
    MessagingService,
    FileUploadModule,
    PictureUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
