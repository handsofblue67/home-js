import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { ChartModule } from 'angular2-highcharts'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { TogglePipe } from './toggle.pipe'
import { MqttService } from './mqtt.service'

@NgModule({
  declarations: [
    AppComponent,
    TogglePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartModule,
  ],
  providers: [ BackendService, /*MqttService*/ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
