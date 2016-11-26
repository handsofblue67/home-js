import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import '../shared'
import { Mqtt } from '../models'

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
        this.currentStatus = { }
        observer.next(this.currentStatus)
      })

      this.socket.on('newStatus', message => {
        this.currentStatus = { }
        observer.next(this.currentStatus)
      })
      return () => this.socket.disconnect()
    })
  }

  updateStatus(status): void {
    const publish: any = { topic: `update/${this.currentStatus.deviceID}`, message: status }
    this.socket.emit('changeFoodDispenserStatus', JSON.stringify(publish))
  }

}
