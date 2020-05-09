import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Classes
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

let connectedUsers: UserList;

export const getConnectedUsers = () => {
  return connectedUsers || ( connectedUsers = new UserList() );
};
getConnectedUsers();

export const clientConnect = ( client: Socket ) => {
  const user = new User( client.id );
  connectedUsers.add( user );
  
}

export const disconnect = ( client: Socket ) => {
  client.on( 'disconnect', () => {
    console.log( 'client disconnected!' );
    getConnectedUsers().deleteUserById( client.id );
  } );
};

export const message = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'message', ( payload: { from: string, body: string; } ) => {
    console.log( 'Message received:', payload );
    io.emit( 'newMessage', payload );
  } );
};

export const userConfig = ( client: Socket, io: socketIO.Server ) => {
  client.on(
    'user-config',
    ( payload: { name: string; },
      callback: ( obj: any ) => void
    ) => {

      console.log( 'Config User:', payload );
      console.log( 'Ip Client:', client.handshake.url );

      connectedUsers.updateName( client.id, payload.name );

      callback( {
        ok: true,
        message: `Usuario ${ payload.name }, configurated`
      } );
    } );
};
