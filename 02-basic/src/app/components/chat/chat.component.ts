import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
} )
export class ChatComponent implements OnInit, OnDestroy {

  text: string;
  messageSuscription: Subscription;
  messages: any[];

  messageContainer: HTMLElement;

  constructor(
    private charService: ChatService
  ) {
    this.text = '';
    this.messages = [];
  }

  ngOnInit(): void {
    this.messageContainer = document.getElementById('chat-message');

    this.messageSuscription = this.charService.getMessage().subscribe( msg => {
      console.log( msg );
      this.messages.push( msg );

      setTimeout( () => {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
      })
    } );
  }

  send(): void {

    if ( !this.text.trim().length ) {
      return;
    }

    this.charService.sendMessage( this.text );
    this.text = '';
  }

  ngOnDestroy(): void {
    this.messageSuscription.unsubscribe();
  }
}
