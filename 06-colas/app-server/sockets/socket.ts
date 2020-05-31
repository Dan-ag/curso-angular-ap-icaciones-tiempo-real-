import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Classes
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';
import { Ticket } from '../classes/ticket';
import { TicketList } from '../classes/ticket-list';
import { response } from 'express';

export const connectedUsers = new UserList();
export const tickets = new TicketList();

export const clientConnect = ( client: Socket ) => {
  const user = new User( client.id );
  connectedUsers.add( user );
};

export const disconnect = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'disconnect', () => {
    console.log( 'client disconnected!' );
    connectedUsers.deleteUserById( client.id );
  } );
};

export const message = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'message', ( payload: { from: string, body: string; } ) => {
    console.log( 'Message received:', payload );
    io.emit( 'newMessage', payload );
  } );
};

export const userConfig = ( client: Socket, io: socketIO.Server ) => {
  client.on( 'user-config', ( payload: { name: string; }, callback: ( obj: any ) => void ) => {

    connectedUsers.updateName( client.id, payload.name );
    setTimeout( () => {
      io.emit( 'activeUsers', connectedUsers.getList() );
    }, 10 );

    callback( {
      ok: true,
      message: `Usuario ${ payload.name }, configurated`
    } );
  } );
};

export const ticketEvents = ( client: Socket, io: socketIO.Server ) => {

  client.on( 'create-ticket', ( payload: any, callback: ( obj: any ) => void ) => {

    callback( {
      ok: true,
      ticket: tickets.add()
    } );
  } );

  client.on( 'take-ticket', ( payload: string, callback: ( obj: any ) => void ) => {
    const resp: { ok: boolean, ticket: Ticket | undefined; } = {
      ok: false,
      ticket: undefined,
    };

    const ticket = tickets.takeTicket( payload );

    if ( ticket ) {
      resp.ok = true;
      resp.ticket = ticket;
      callback( resp );
      io.emit( 'tickets-taken-updated', tickets.getTakedTicked())
      return;
    }
    callback( resp );
  } );

  client.on( 'get-tickets-taken', ( payload: any, callback: ( obj: any ) => void ) => {
    callback( {
      ok: true,
      ticketsTaken: tickets.getTakedTicked()
    } );
  } );
  
};
