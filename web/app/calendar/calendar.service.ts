import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'
import * as moment from 'moment'

import { AuthService } from '../auth.service'

@Injectable()
export class CalendarService {
  private calendarSource = new BehaviorSubject<any[]>([])
  public calendars$ = this.calendarSource.asObservable().share()

  private feathersService: any
  calendars = []
  authSubscription: Subscription

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.feathersService = this.authService.getService('calendars')
    const timeMin = moment().startOf('month')
    const timeMax = moment(timeMin).endOf('month').toDate()
    this.findNext(timeMin, timeMax)

    this.feathersService
      .on('created', calendar => this.onCreated(calendar))
      .on('updated', calendar => this.onUpdated(calendar))
      .on('removed', calendar => this.onRemoved(calendar))
  }

  private onCreated(calendar: any): void {
    this.calendars = [ ...this.calendars, calendar ]
    this.calendarSource.next(this.calendars)
  }

  private onUpdated(updatedCalendar: any): void {
    if (typeof updatedCalendar === 'number') { return }

    this.calendars = _.map(this.calendars, calendar => {
      return _.cloneDeep((calendar.calendarID === updatedCalendar.calendarID) ? updatedCalendar : calendar)
    })
    this.calendarSource.next(this.calendars)
  }

  private onRemoved(removedCalendar): void {
    this.calendars = _.reject(this.calendars, ['calendarID', removedCalendar.calendarID])
    this.calendarSource.next(this.calendars)
  }

  findNext(timeMin, timeMax): void {
    this.feathersService.find({ query: { timeMin: timeMin, timeMax: timeMax } })
      .then((update: any) => {
        this.calendars = update.data
        this.calendarSource.next(this.calendars)
      })
  }
}
