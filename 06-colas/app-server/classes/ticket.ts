export class Ticket {

  id: string;
  number: number;
  desk: string;

  constructor( numTicket: number ) {
    this.id = new Date().getTime().toString();
    this.number = numTicket;
    this.desk = '';
    console.log('ticket', this.id);
  }
}