import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { RouterModule }   from '@angular/router'

import { AUTH_PROVIDERS } from 'angular2-jwt'
import { ChartModule } from 'angular2-highcharts'
import { AgmCoreModule } from 'angular2-google-maps/core'
import { AuthHttp } from 'angular2-jwt'

import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { GeofenceService, MapComponent } from './map'
import { ChartComponent, ChartService } from './chart'
import { ToggleComponent, ToggleService } from './toggle'
import { BrokerComponent, BrokerService } from './broker'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth-guard.service'
import { routing } from './app.routing'
import { HomeComponent } from './home'

@NgModule({
  declarations: [
    AppComponent,
    BrokerComponent,
    ChartComponent,
    MapComponent,
    ToggleComponent,
    HomeComponent,
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
    AuthHttp,
    AuthGuard,
    AuthService,
    AUTH_PROVIDERS,
    BackendService,
    BrokerService,
    ChartService,
    GeofenceService,
    ToggleService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
