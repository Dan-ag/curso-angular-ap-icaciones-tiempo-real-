import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public wsService: WebSocketService
  ) { }

  ngOnInit(): void {
  }

}
