import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebSocketService
  ) { }

  sendMessage( message: string ) {
    const payload = {
      from: this.wsService.getUser().name,
      body: message
    };

    this.wsService.emit('message', payload );
  }

  getMessage() {
    return this.wsService.listen( 'newMessage' );
  }

  getMessagesPrivate() {
    return this.wsService.listen( 'privateMessage' );
  }

}
