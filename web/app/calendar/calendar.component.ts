import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core'
import * as _ from 'lodash'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('tileState', [
      state('inactive', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1)',
        zIndex: '*',
        boxShadow: '*',
      })),
      state('active',   style({
        backgroundColor: 'lightpink',
        transform: 'scale(1.1)',
        zIndex: '1000',
        boxShadow: '0 1px 18px 0 rgba(0,0,0,.12)',
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class CalendarComponent implements OnInit {
  weekdays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
  tiles: Array<any>

  ngOnInit() {
    this.tiles = _.times(38, iter => {
      return {
        text: iter + 1,
        cols: 1,
        rows: 1,
        color: 'lightpink',
        state: 'inactive',
      }
    })
  }

  enter(tile: any): void {
    tile.state = 'active'
  }

  leave(tile: any): void {
    tile.state = 'inactive'
  }

}
