import { Component, OnInit } from '@angular/core';

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
        return { lat: +map.latitude, lng: +map.longitude }
      })
    })
  }

}
