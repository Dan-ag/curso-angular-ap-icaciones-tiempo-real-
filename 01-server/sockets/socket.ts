import { Socket } from 'socket.io';

export const disconnect = ( client: Socket ) => {
  client.on( 'disconnect', () => {
    console.log( 'client disconnected!' );
  } )
}


export const message = ( client: Socket, io: SocketIO.Server ) => {
  client.on( 'message', ( payload: { from: string, body: string } ) => {
    console.log( 'Message received:', payload );
    
    io.emit('newMessage', payload);
    
  })
}