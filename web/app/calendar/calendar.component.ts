import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import * as _ from 'lodash'
import * as moment from 'moment'
import { CalendarEvent } from 'calendar-utils'
import { CalendarService } from './'
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: Array<CalendarEvent> = []
  viewDate = new Date()
  calendars = []
  timeMin
  timeMax
  refresh: Subject<any> = new Subject()

  // selectedCalendar
  constructor(private calendarService: CalendarService) {

  }

  ngOnInit() {
    this.calendarService.calendars$.subscribe(calendars => {
      this.calendars = calendars
      this.events = <Array<CalendarEvent>>_.reduce(this.calendars, (acc, calendar) => {
        return [...acc, ..._.map(calendar.events, (event: any) => {
          return <CalendarEvent>{
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            title: event.summary,
            color: { primary: calendar.foregroundColor, secondary: calendar.backgroundColor }
          }
        })]
      }, [])
      console.log(this.events)
    })
  }

  changeView(viewMode) {
    this.timeMin = moment().startOf(viewMode)
    this.timeMax = moment(this.timeMin).endOf(viewMode).toDate()
    this.calendarService.findNext(this.timeMin, this.timeMax)
  }
}
