import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'angular-calendar'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule, MdSnackBar } from '@angular/material'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { DeviceService } from './devices'
import { routing, routedComponents } from './app.routing'
import { UsersService } from './users'
import { KeysPipe } from './keys.pipe'
import { SensorComponent } from './devices/sensor/sensor.component'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    KeysPipe,
    SensorComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CalendarModule.forRoot(),
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    DeviceService,
    MdSnackBar,
    UsersService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
