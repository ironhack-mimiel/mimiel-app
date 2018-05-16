import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HoneyDetailComponent } from './components/honey-detail/honey-detail.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HiveDetailComponent } from './components/hive-detail/hive-detail.component';
import { HoneyListComponent } from './components/honey-list/honey-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'honey', component: HoneyListComponent}
  { path: 'honey/:id', component: HoneyDetailComponent },
  { path: 'hive/:id', component: HiveDetailComponent },
  { path: 'my-profile', component: MyProfileComponent}
];
