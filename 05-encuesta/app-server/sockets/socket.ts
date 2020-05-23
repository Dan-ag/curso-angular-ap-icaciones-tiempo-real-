import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'disconnect', () => {
    console.log( 'client disconnected!' );
  } );
};

export const message = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'message', ( payload: { from: string, body: string; } ) => {
    console.log( 'Message received:', payload );
    io.emit( 'newMessage', payload );
  } );
};
