import { Ticket } from './ticket';

export class TicketList {
  private tickets: Ticket[] = [];
  private takedTickets: Ticket[] = [];
  private counter: number = 0;

  constructor() { }

  add() {
    if ( this.counter > 99 ) {
      this.counter = 1;
    }
    this.counter += 1;

    const ticket = new Ticket( this.counter );
    this.tickets.push( ticket );
    return ticket;
  }

  takeTicket( desk: string ) {
    const ticket = this.tickets.shift();

    if ( ticket) {
      ticket.desk = desk;
      this.takedTickets.unshift( ticket );

      return ticket;
    }
  }

  getTakedTicked() {
    return this.takedTickets;
  }
}