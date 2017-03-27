import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import * as _ from 'lodash'
import * as moment from 'moment'
import { CalendarEvent } from 'calendar-utils'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  events: Array<CalendarEvent> = []
  viewDate = new Date()
}
