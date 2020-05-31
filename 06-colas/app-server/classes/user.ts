export class User {
  id: string;
  name: string;
  room: string;
  
  constructor(id: string) {
    this.id = id;
    this.name = 'nameless'
    this.room = 'no room'
  }
}