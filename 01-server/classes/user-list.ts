// Classes
import { User } from './user';

export class UserList {
  private list: User[] = [];

  constructor() { }

  add( user: User ) {
    this.list.push( user );
    console.log( this.list );
    return user;
  }

  updateName( id: string, name: string ) {
    for ( let user of this.list ) {
      if ( user.id === id ) {
        user.name = name;
        break;
      }
    }

    console.log( '======= Uploading User ========' );
    console.log( this.list );
  }

  getList() {
    return this.list;
  }

  getUserById( id: string ) {
    return this.list.find( user => user.id === id );
  }

  getUserByRoom( room: string ) {
    return this.list.filter( user => user.room === room )
  }

  deleteUserById( id: string ) {
    const tempUser = this.getUserById( id );

    this.list = this.list.filter( user => user.id !== id )

    return tempUser;
  }

}