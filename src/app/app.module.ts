import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { ChartModule } from 'angular2-highcharts'
import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { ChatService } from './chat'
import { GeofenceService } from './map'
import { ChartService } from './chart'
import { ToggleService } from './toggle'
import { BrokerService } from './broker'
import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { AuthGuard } from './auth-guard.service'
import { routing, routedComponents } from './app.routing'
import { FoodDispenserService } from './food-dispenser'
import { TemperatureService } from './temperature'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDb-Foka_83ay6ofqqwuB33F_p11vtlBjY'}),
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    BackendService,
    BrokerService,
    ChartService,
    ChatService,
    FoodDispenserService,
    GeofenceService,
    TemperatureService,
    ToggleService,
    UserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
