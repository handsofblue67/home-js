import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import '../shared'

@Injectable()
export class FoodDispenserService {
  private socket: SocketIOClient.Socket
  currentStatus: any = {}

  constructor() { }

  getStatus(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.emit('joinFoodDispenser', {username: JSON.parse(localStorage.getItem('currentUser')).username})

      this.socket.on('initFoodDispenser', currentStatus => {
        console.log(currentStatus)
        this.currentStatus = currentStatus
        observer.next(this.currentStatus)
      })

      this.socket.on('stateChange', currentStatus => {
        this.currentStatus = currentStatus
        observer.next(this.currentStatus)
      })
      return () => this.socket.disconnect()
    })
  }

  updateStatus(status): void {
    const publish: any = {
      topic: '/update/12658677',
      message: JSON.stringify(status)
    }
    this.socket.emit('publish', publish)
  }

}