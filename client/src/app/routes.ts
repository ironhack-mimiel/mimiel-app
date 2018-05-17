import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeBeekeeperComponent } from './components/home-beekeeper/home-beekeeper.component';
import { HoneyDetailComponent } from './components/honey-detail/honey-detail.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HiveDetailComponent } from './components/hive-detail/hive-detail.component';
import { HoneyListComponent } from './components/honey-list/honey-list.component';
import { ShowMessagesComponent } from './components/my-profile/show-messages/show-messages.component';
import { MyProfileEditComponent } from './components/my-profile/my-profile-edit/my-profile-edit.component';
import { MyProfileHivesComponent } from './components/my-profile/my-profile-hives/my-profile-hives.component';
import { MyProfileAddnewhiveComponent } from './components/my-profile/my-profile-addnewhive/my-profile-addnewhive.component';
import { MyProfileAddnewhoneyComponent } from './components/my-profile/my-profile-addnewhoney/my-profile-addnewhoney.component';
import { MyProfilePaymentsComponent } from './components/my-profile/my-profile-payments/my-profile-payments.component';
import { MyProfileBillingComponent } from './components/my-profile/my-profile-billing/my-profile-billing.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'beekeeper', component: HomeBeekeeperComponent },
  { path: 'honey', component: HoneyListComponent},
  { path: 'honey/:id', component: HoneyDetailComponent },
  { path: 'hive/:id', component: HiveDetailComponent },
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'messages', component: ShowMessagesComponent },
  { path: 'editprofile', component: MyProfileEditComponent },
  { path: 'hives', component: MyProfileHivesComponent },
  { path: 'addnewhive', component: MyProfileAddnewhiveComponent },
  { path: 'addnewhoney', component: MyProfileAddnewhoneyComponent },
  { path: 'payments', component: MyProfilePaymentsComponent },
  { path: 'billing', component: MyProfileBillingComponent },
  { path: 'error', component: ErrorComponent }
];
