import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HoneyDetailComponent } from './components/honey-detail/honey-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'honey/:id', component: HoneyDetailComponent },
];
