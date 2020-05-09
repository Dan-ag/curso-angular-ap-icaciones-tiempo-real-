import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit{
  title = 'basic';

  constructor(
    public wsService: WebSocketService,
    public chatSercice: ChatService
  ) {

  }

  ngOnInit() {
    this.chatSercice.getMessagesPrivate().subscribe( msg => {
      console.log('Private Message...', msg);
    } );
  }
}
