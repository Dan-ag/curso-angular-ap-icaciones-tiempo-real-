import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class WebSocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket,
  ) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on( 'connect', () => {
      console.log( 'Connected to server..' );
      this.socketStatus = true;

    } );

    this.socket.on( 'disconnect', () => {
      console.log( 'Disconnected from server..' );
      this.socketStatus = false;
    } );
  }

  emit( event: string, payload?: any, callback?: ( obj: any ) => void ) {
    this.socket.emit( event, payload, callback );
  }

  listen( event: string ) {
    console.log( 'event', event );
    return this.socket.fromEvent( event ).pipe(
      tap( console.log )
    );
  }


}
