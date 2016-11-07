import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { RouterModule }   from '@angular/router';

import { ChartModule } from 'angular2-highcharts'
import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { ChartService } from './chart.service'
import { GeofenceService, MapComponent } from './map';
import { ChartComponent } from './chart/chart.component';
import { ToggleComponent, ToggleService } from './toggle';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChartComponent,
    ToggleComponent
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDb-Foka_83ay6ofqqwuB33F_p11vtlBjY'}),
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: '/lights', pathMatch: 'full' },
      { path: 'maps', component: MapComponent },
      { path: 'charts', component: ChartComponent },
      { path: 'lights', component: ToggleComponent },
    ])
  ],
  providers: [ BackendService, ChartService, GeofenceService, ToggleService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
