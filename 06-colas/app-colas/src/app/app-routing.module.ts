import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeskComponent } from './pages/desk/desk.component';
import { HomeComponent } from './pages/home/home.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { PublicComponent } from './pages/public/public.component';


const routes: Routes = [
  { path: 'desk/:id', component: DeskComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-ticket', component: NewTicketComponent },
  { path: 'public', component: PublicComponent },
  { path: '**', component: HomeComponent }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
