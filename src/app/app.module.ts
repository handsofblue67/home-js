import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { ChartModule } from 'angular2-highcharts'
import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { TogglePipe } from './toggle.pipe'
import { ToggleService } from './toggle.service'
import { ChartService } from './chart.service'
import { GeofenceService, MapComponent } from './map';

@NgModule({
  declarations: [
    AppComponent,
    TogglePipe,
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDb-Foka_83ay6ofqqwuB33F_p11vtlBjY'}),
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [ BackendService, ChartService, GeofenceService, ToggleService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
