import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { ChartModule } from 'angular2-highcharts'
import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { BackendService } from './backend.service'
import { BrokerService } from './broker'
import { ChartService } from './chart'
import { ChatService } from './chat'
import { GeofenceService } from './map'
import { FoodDispenserService } from './food-dispenser'
import { routing, routedComponents } from './app.routing'
import { ShadowOnScrollDirective } from './shared'
import { TemperatureService } from './temperature'
import { TodoService } from './todos'
import { ToggleService } from './toggle'
import { UserService } from './user.service'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    ShadowOnScrollDirective,
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
    TodoService,
    ToggleService,
    UserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
