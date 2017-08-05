import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { cloneDeep, compact, filter, flatMap, flow, reduce, reject, map, uniqBy } from 'lodash/fp'
import * as moment from 'moment'
import { CalendarEvent } from 'calendar-utils'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'

import { AuthService } from '../auth.service'

@Injectable()
export class CalendarService {
  public events$: Observable<CalendarEvent[]>

  private feathersService: any
  calendars = []
  events: Array<CalendarEvent> = []

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
    this.events$ = Observable.of(this.calendarToEvents(this.calendars))
  }

  private onUpdated(updatedCalendar: any): void {
    console.log('onUpdated')
    if (typeof updatedCalendar === 'number') { return }

    // TODO: I hate this... find a better way
    this.calendars = map(calendar => {
      return {
        ...(calendar.calendarID === updatedCalendar.calendarID) ? updatedCalendar : calendar
      }
    })(this.calendars)
    this.events$ = Observable.of(this.calendarToEvents(this.calendars))
  }

  private onRemoved(removedCalendar): void {
    console.log('onRemoved')
    this.calendars = reject(['calendarID', removedCalendar.calendarID])(this.calendars)
    this.events$ = Observable.of(this.calendarToEvents(this.calendars))
  }

  async findNext(timeMin, timeMax) {
    console.log('findNext')
    const update = await this.feathersService.find({ query: { timeMin: timeMin, timeMax: timeMax } })
    console.log(update)
    this.calendars = update.data
    this.events$ = Observable.of(this.calendarToEvents(this.calendars))
  }

  calendarToEvents(calendars) {
    console.log('calendars:', this.calendars)
    const events = flow(
      compact, //remove nulls from calendar list
      flatMap(this.mapColorsToEvents),
      uniqBy('id'),
      map(this.mapToEvents),
      compact // remove nulls from event list
    )(calendars)

    this.events = [...this.events, ...events]
    console.log('events:', this.events)
    return this.events
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

  // TODO: still plenty to fix here
  mapToEvents(event) {
    try {
      const { id, color, summary: title, start: { date: startDate, dateTime: startDateTime }, end: { date: endDate, dateTime: endDateTime } } = event
      
      const startHour: number = +moment(startDate || startDateTime).format('HH')
      const endHour: number = +moment(endDate || endDateTime).format('HH')
      const allDay: boolean =  endHour - startHour === 0

      return {
        id,
        title,
        start: new Date(startDate || startDateTime),
        end: allDay ? undefined : new Date(endDate || endDateTime),
        color,
        allDay
      }

    } catch (err) {
      return
    }
  }
}
