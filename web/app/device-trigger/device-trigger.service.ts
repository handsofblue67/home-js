import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'

import { AuthService } from '../auth.service'

@Injectable()
export class DeviceTriggerService {
  private triggerSource = new BehaviorSubject<any[]>([])
  public triggers$ = this.triggerSource.asObservable().share()

  private feathersService: any
  triggers = []
  authSubscription: Subscription

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.feathersService = this.authService.getService('deviceTriggers')
    this.feathersService.find().then((update: any) => {
      this.triggers = update.data
      this.triggerSource.next(this.triggers)
    })
    this.feathersService
      .on('created', device => this.onCreated(device))
      .on('updated', device => this.onUpdated(device))
      .on('removed', device => this.onRemoved(device))
  }

  private onCreated(device: any) {
    this.triggers = [...this.triggers, device]
    this.triggerSource.next(this.triggers)
  }

  private onUpdated(updatedTrigger: any) {
    if (typeof updatedTrigger === 'number') return

    this.triggers = _.map(this.triggers, trigger => {
      return _.cloneDeep((trigger._id === updatedTrigger._id) ? updatedTrigger : trigger)
    })
    this.triggerSource.next(this.triggers)
  }

  private onRemoved(removedTrigger) {
    this.triggers = _.reject(this.triggers, ['_id', removedTrigger._id])
    this.triggerSource.next(this.triggers)
  }

  public updateTrigger(trigger: any, index: number) {
    this.feathersService.update(trigger._id, trigger)
  }

  public findTrigger(id: string): Promise<any> {
    return Promise.resolve(this.triggers).then(triggers => _.find(triggers, ['_id', id]))
  }

  public createTrigger(trigger) {
    this.feathersService.create(trigger)
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  public findTriggers(deviceID): Promise<any> {
    return Promise.resolve(this.triggers).then(triggers => _.filter(triggers, ['source', deviceID]))
  }
}
