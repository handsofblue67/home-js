import { Component, OnInit } from '@angular/core';

import * as moment from 'moment'
import * as _ from 'lodash'

import { GeofenceService } from './geofence.service'

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  maps: Array<any> = []

  constructor(private geofenceService: GeofenceService) { }

  ngOnInit() {
    this.geofenceService.map$.subscribe(maps => {
      this.maps = _.map(maps, map => { 
        return {
          lat: +map.latitude,
          lng: +map.longitude,
          info: moment(+map.timestamp*1000).calendar(),
          marker: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=M|${(map.trigger === 'enter') ?'3FFF33' : 'FF3333'}`
        }
      })
    })
  }

}
