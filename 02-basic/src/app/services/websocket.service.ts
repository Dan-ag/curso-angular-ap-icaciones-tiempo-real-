import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';

@Injectable( {
  providedIn: 'root'
} )
export class WebSocketService {

  public socketStatus = false;
  private user: User;

  constructor( private socket: Socket ) {
    this.checkStatus();
    this.loadStorage();
  }

  getUser() {
    return this.user;
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
    return this.socket.fromEvent( event );
  }

  loginWS( name: string ) {

    return new Promise( ( resolve, reject ) => {

      this.emit( 'user-config', { name }, ( resp ) => {
        console.log( resp );
        this.user = new User( name );
        this.saveStorage();
        resolve();
      } );
    } );
  }

  saveStorage() {
    localStorage.setItem( 'user', JSON.stringify( this.user ) );
  }

  loadStorage() {
    if ( localStorage.getItem( 'user' ) ) {
      this.user = JSON.parse( localStorage.getItem( 'user' ) )
      this.loginWS( this.user.name )
    }
  }
}
