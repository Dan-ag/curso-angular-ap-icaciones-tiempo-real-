import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = '';

  constructor(
    public wsService: WebSocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.wsService.loginWS( this.name ).then( () => {
      this.router.navigateByUrl('/messages');
    });
  }

}
