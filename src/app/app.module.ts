import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { ChartModule } from 'angular2-highcharts'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { TogglePipe } from './toggle.pipe'
import { ToggleService } from './toggle.service'
import { ChartService } from './chart.service'

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
  providers: [ BackendService, ChartService,ToggleService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
