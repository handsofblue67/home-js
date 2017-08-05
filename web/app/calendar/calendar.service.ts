import { Injectable } from '@angular/core'
import { CalendarEvent } from 'calendar-utils'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'
import { filter, flatMap, flow, reduce, map, uniqBy } from 'lodash/fp'
import * as moment from 'moment'

import { AuthService } from '../auth.service'

@Injectable()
export class CalendarService {
  private calendarSource = new BehaviorSubject<any>([])
  public calendars$ = this.calendarSource.asObservable().share()
  private eventSource = new BehaviorSubject<CalendarEvent<any>[]>([])
  public events$ = this.eventSource.asObservable().share()

  private feathersService: any
  calendars = []
  events: Array<CalendarEvent> = []
  authSubscription: Subscription

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.feathersService = this.authService.getService('calendars')
    const timeMin = moment()
      .startOf('month')
      .toDate()
    const timeMax = moment(timeMin)
      .endOf('month')
      .toDate()
    this.findNext(timeMin, timeMax)

    this.feathersService
      .on('created', calendar => this.onCreated(calendar))
      .on('updated', calendar => this.onUpdated(calendar))
      .on('removed', calendar => this.onRemoved(calendar))
  }

  private onCreated(calendar: any): void {
    console.log('onCreated')
    this.calendars = [ ...this.calendars, calendar ]
    this.calendarSource.next(this.calendars)
    this.calendarToEvents(this.calendars)
  }

  private onUpdated(updatedCalendar: any): void {
    console.log('onUpdated')
    if (typeof updatedCalendar === 'number') { return }

    this.calendars = _.map(this.calendars, calendar => {
      return _.cloneDeep((calendar.calendarID === updatedCalendar.calendarID) ? updatedCalendar : calendar)
    })

    this.calendarSource.next(this.calendars)
    this.calendarToEvents(this.calendars)
  }

  private onRemoved(removedCalendar): void {
    console.log('onRemoved')
    this.calendars = _.reject(this.calendars, ['calendarID', removedCalendar.calendarID])
    this.calendarSource.next(this.calendars)
    this.calendarToEvents(this.calendars)
  }

  findNext(timeMin, timeMax): void {
    console.log('findNext')
    this.feathersService.find({ query: { timeMin: timeMin, timeMax: timeMax } })
      .then((update: any) => {
        this.calendars = update.data
        this.calendarSource.next(this.calendars)
        this.calendarToEvents(this.calendars)
      })
  }

  calendarToEvents(calendars) {
    console.log('calendars:', this.calendars)
    const events = flow(
      flatMap(this.mapColorsToEvents),
      uniqBy('_id'),
      map(this.mapToEvents)
    )(calendars)

    this.events = [...this.events, ...events]
    console.log('events:', this.events)
    this.eventSource.next(this.events)
  }

  mapColorsToEvents(calendar) {
    return map(event => {
      return {
        ...event,
        color: {
          primary: calendar.foregroundColor,
          secondary: calendar.backgroundColor
        }
      }
    })(calendar.events)
  }

  // still plenty to fix here
  mapToEvents(event) {
    const { _id, color, summary: title, start: { date: startDate, dateTime: startDateTime }, end: { date: endDate, dateTime: endDateTime } } = event
    return {
      id: _id,
      title,
      start: new Date(startDate || startDateTime),
      end: new Date(endDate || endDateTime),
      color
    }
  }
}
