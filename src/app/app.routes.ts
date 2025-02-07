import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EventListComponent } from './pages/events/event-list/event-list.component';

export const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'event-list', component: EventListComponent}
];

export const appConfig = [
  provideRouter(routes)
];
