import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { ChatService } from './chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Array<any> = []
  connection: Subscription
  message: string = ''

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log(this.messages)
    this.connection = this.chatService
      .getMessages()
      .subscribe(messages => {
        this.messages = [ ...this.messages ]
      })
  }

  sendMessage() {
    this.chatService.sendMessage(this.message)
    this.message = ''
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }


}
