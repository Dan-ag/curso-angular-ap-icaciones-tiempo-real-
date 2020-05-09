import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    public wsService: WebSocketService,
    private router: Router
  ) { }

  canActivate() {

    if ( this.wsService.getUser() ) {
      return true;
    }

    this.router.navigateByUrl('/');
    return false;
  }
}
