import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { tap } from 'rxjs/operators';
import { ITicket } from 'src/app/interfaces/ITicket';

@Component( {
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: [ './desk.component.scss' ]
} )
export class DeskComponent implements OnInit {
  desk: string;
  ticket: ITicket;

  constructor(
    public wsSerivce: WebSocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamId();
  }

  getParamId() {
    this.route.params.pipe( tap( console.log ) ).subscribe( params => {
      this.desk = params.id;
    } );
  }

  takeTicket() {
    this.wsSerivce.emit( 'take-ticket', this.desk, ( resp: { ok: boolean, ticket: ITicket; } ) => {
      if ( resp.ok ) {
        this.ticket = resp.ticket;
      }
    } );
  }
}

