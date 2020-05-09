import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';

// Sockets
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

// Router
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    UserListComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot( config ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
