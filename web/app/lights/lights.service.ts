import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'
import * as io from 'socket.io-client'
import * as feathers from 'feathers-client'

import { AuthService } from '../auth.service'

@Injectable()
export class LightsService {

  public lights$: Observable<any[]>
  private lightsObserver: Observer<any[]>
  private feathersService: any
  private dataStore: { lights: any[] }

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    authService.getService('users').subscribe(feathersService => {
      this.feathersService = feathersService
      this.feathersService
        .on('created', user => this.onCreated(user))
        .on('updated', user => this.onUpdated(user))
        .on('removed', user => this.onRemoved(user))
      this.lights$ = <Observable<any[]>>new Observable(observer => this.lightsObserver = observer).share()
      this.dataStore = { lights: [] }
      this.find()
    })
  }

  public find() {
    this.feathersService.find((err, lights: any[]) => {
      if (err) return console.error(err)
      this.dataStore.lights = lights
      this.lightsObserver.next(this.dataStore.lights)
    })
  }

  private getIndex(id: string): number {
    return _.findIndex(this.dataStore.lights, light => light.id === id)
  }

  private onCreated(light: any) {
    this.dataStore.lights = [...this.dataStore.lights, light]
    this.lightsObserver.next(this.dataStore.lights)
  }

  private onUpdated(light: any) {
    const index = this.getIndex(light.id)
    this.dataStore.lights[index] = light
    this.lightsObserver.next(this.dataStore.lights)
  }

  private onRemoved(light) {
    this.dataStore.lights = _.without(this.dataStore.lights, light)
    this.lightsObserver.next(this.dataStore.lights)
  }
}


// import { Injectable } from '@angular/core'

// import { Observable } from 'rxjs/Observable'
// import '../shared'
// import * as _ from 'lodash'
// import * as io from 'socket.io-client'

// import { Device } from '../models'

// @Injectable()
// export class LightsService {
//   private socket
//   states: Array<any> = []

//   constructor() { }

//   toggle(device: Device) {
//     const topic = device.topics.sub.toggle
//     const mqtt = { topic: topic, message: (new Date()).toString() }
//     this.socket.emit('publish', mqtt)
//   }

//   getStates(): Observable<any> {
//     return new Observable(observer => {
//       this.socket = io('/')
//       this.socket.emit('joinToggle', { username: JSON.parse(localStorage.getItem('currentUser')).username })

//       this.socket.on('initToggle', currentStatus => {
//         this.states = currentStatus
//         observer.next(this.states)
//       })
//       this.socket.on('stateChange', update => {
//         this.states = _.map(this.states, device => {
//           if (device.deviceID === update.status.deviceID) {
//             device.status = update.status
//           }
//           return device
//         })
//         observer.next(this.states)
//       })
//       return () => this.socket.disconnect()
//     })
//   }
// }
