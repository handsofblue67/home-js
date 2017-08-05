import { Component, OnInit, OnDestroy } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { filter, flatMap, flow, reduce, map } from 'lodash/fp'
import * as moment from 'moment'
import { CalendarEvent } from 'calendar-utils'
import { CalendarService } from './'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  viewDate = new Date()
  currentDate = moment(this.viewDate)
  timeMin
  timeMax
  displayDate = moment(this.viewDate).format('MMMM YYYY')

  constructor(public calendarService: CalendarService) { }

  // TODO: getting closer
  changePage(turnTo: string, viewMode) {
    switch (turnTo) {
      case 'prev':
        this.currentDate = this.currentDate.subtract(1, 'month')
        break
      case 'next':
        this.currentDate = this.currentDate.add(1, 'month')
        break
      default:
        this.currentDate = moment(new Date())
        break
    }
    this.timeMin = moment(this.currentDate).startOf(viewMode).toDate()
    this.timeMax = moment(this.currentDate).endOf(viewMode).toDate()
    this.calendarService.findNext(this.timeMin, this.timeMax)
    this.displayDate = moment(this.currentDate).format('MMMM YYYY')
  }
}
