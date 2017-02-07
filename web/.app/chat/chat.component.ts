import { Component } from '@angular/core'

import { ChatService } from './chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  message: string = ''
  constructor(private chatService: ChatService) { }
  sendMessage() {
    this.chatService.create(this.message)
    this.message = ''
  }
}

// import { Component, OnInit, OnDestroy } from '@angular/core'

// import { Subscription } from 'rxjs/Subscription'

// import { ChatService } from './chat.service'

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit, OnDestroy {
//   messages: Array<any> = []
//   connection: Subscription
//   message: string = ''

//   constructor(private chatService: ChatService) { }

//   ngOnInit() {
//     this.connection = this.chatService
//       .getMessages()
//       .subscribe(messages => {
//         this.messages = messages
//       })
//   }

//   sendMessage() {
//     this.chatService.sendMessage(this.message)
//     this.message = ''
//   }

//   ngOnDestroy() {
//     this.connection.unsubscribe()
//   }
// }
