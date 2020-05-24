import { Component } from '@angular/core';
import { WebSocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( public webSocketService: WebSocketService){}
  title = 'mapbox';
}
