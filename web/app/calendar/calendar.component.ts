import { Component, OnInit, OnDestroy } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { filter, flatMap, flow, reduce, map } from 'lodash/fp'
import * as moment from 'moment'
import { CalendarEvent } from 'calendar-utils'
import { CalendarService } from './'
import { Subject } from 'rxjs/Subject'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  // events: Array<CalendarEvent> = []
  viewDate = new Date()
  // calendars = []
  timeMin
  timeMax
  refresh: Subject<any> = new Subject()
  displayDate = moment(this.viewDate).format('MMMM YYYY')
  // selectedCalendar
  constructor(public calendarService: CalendarService) { }

  setView(viewMode) {
    this.timeMin = moment().startOf(viewMode).toDate()
    this.timeMax = moment(this.timeMin).endOf(viewMode).toDate()
    this.calendarService.findNext(this.timeMin, this.timeMax)
    this.displayDate = moment(this.timeMin).format('MMMM YYYY')
    this.refresh.next(true)
  }
}
