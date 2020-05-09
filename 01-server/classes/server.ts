import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;


  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server( this.app );
    this.io = socketIO( this.httpServer );

    this.socketListener();

  }

  public static get instance() {
    return this._instance || ( this._instance = new this() )
  }

  private socketListener() {
    console.log('listen sockets...');

    this.io.on( 'connection', client => {
      console.log( 'Client conneted!', client.id );

      // client connect
      socket.clientConnect( client )

      // Message
      socket.message( client, this.io );

      // Disconnect
      socket.disconnect( client );

      // User Config
      socket.userConfig( client, this.io );

    })
  }

  start( callback: ( ...args: any[] ) => void ) {
    this.httpServer.listen( this.port , callback );
  }
}