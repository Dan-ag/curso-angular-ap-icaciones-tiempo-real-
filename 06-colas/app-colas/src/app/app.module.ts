import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { DeskComponent } from './pages/desk/desk.component';
import { HomeComponent } from './pages/home/home.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { PublicComponent } from './pages/public/public.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    HomeComponent,
    NewTicketComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot( config ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


