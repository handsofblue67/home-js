import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule, MdSnackBar } from '@angular/material'

// import { ChartModule } from 'angular2-highcharts'
// import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
// import { BackendService } from './backend.service'
// import { BrokerService } from './broker'
// import { ChartService } from './chart'
// import { ChatService } from './chat'
import { DeviceService } from './devices'
// import { GeofenceService } from './map'
// import { FoodDispenserService } from './food-dispenser'
import { routing, routedComponents } from './app.routing'
// import { TemperatureService } from './temperature'
// import { TodoService } from './todos'
// import { LightsService } from './lights'
import { UsersService } from './users'
import { KeysPipe } from './keys.pipe';
import { SensorComponent } from './devices/sensor/sensor.component'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    KeysPipe,
    SensorComponent,
  ],
  imports: [
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyDb-Foka_83ay6ofqqwuB33F_p11vtlBjY'}),
    BrowserModule,
    CommonModule,
    // ChartModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    // BackendService,
    // BrokerService,
    // ChartService,
    // ChatService,
    DeviceService,
    // FoodDispenserService,
    // GeofenceService,
    // LightsService,
    MdSnackBar,
    // TemperatureService,
    // TodoService,
    UsersService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
