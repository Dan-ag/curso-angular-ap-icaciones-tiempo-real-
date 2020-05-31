import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/services/websocket.service';

import { ITicket } from 'src/app/interfaces/ITicket';

@Component( {
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: [ './new-ticket.component.scss' ]
} )
export class NewTicketComponent implements OnInit {
  ticket: ITicket;

  constructor( public wsService: WebSocketService ) {
  }

  ngOnInit(): void {
  }

  createTicket() {
    console.log( 'Creating ticket..' );
    this.wsService.emit( 'create-ticket', undefined, ( resp: { ok: boolean, ticket: ITicket; } ) => {
      if ( resp.ok ) {
        this.ticket = resp.ticket;
      }
    } );
  }
}
