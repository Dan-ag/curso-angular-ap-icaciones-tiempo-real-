import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/services/websocket.service';
import { ITicket } from 'src/app/interfaces/ITicket';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  audio = new Audio( 'assets/new-ticket.mp3' );
  ticketsTaken: ITicket[] = [];

  constructor( public wsService: WebSocketService ) {
    this.audio.load();
   }

  ngOnInit(): void {
    this.wsService.emit( 'get-tickets-taken', null, ( resp ) => {
      this.ticketsTaken = resp.ticketsTaken;
    } );

    this.wsService.listen( 'tickets-taken-updated' ).subscribe( ticketsTaken => {
      this.ticketsTaken = ticketsTaken;
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.play();
    } );
  }

}
