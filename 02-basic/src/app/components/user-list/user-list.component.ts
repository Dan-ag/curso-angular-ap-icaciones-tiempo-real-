import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

// Services
import { ChatService } from 'src/app/services/chat.service';

// Models
import { User } from 'src/app/models/user.model';

@Component( {
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.scss' ]
} )
export class UserListComponent implements OnInit {

  userActive$: Observable<any>;

  constructor(
    private charService: ChatService
  ) {}

  ngOnInit(): void {
    this.userActive$ = this.charService.getActiveUser();
    // this.charService.emitGetUsers();
  }

}
