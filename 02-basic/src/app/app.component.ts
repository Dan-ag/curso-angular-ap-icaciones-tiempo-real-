import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {
  title = 'basic';
  constructor(
    public wsService: WebSocketService,
  ) {

  }
}
