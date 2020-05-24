import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

const config: SocketIoConfig = { url: 'http://10.42.0.41:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot( config ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
