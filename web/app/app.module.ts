import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'angular-calendar'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MdSnackBar, LiveAnnouncer, MdButtonModule, MdButtonToggleModule, MdOptionModule, MdCardModule, MdSidenavModule, MdMenuModule, MdSlideToggleModule, MdSelectModule, MdInputModule, MdToolbarModule, MdIconModule, MdTooltipModule, } from '@angular/material'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { DeviceService } from './devices'
import { DeviceTriggerService } from './device-trigger'
import { routing, routedComponents } from './app.routing'
import { UsersService } from './users'
import { KeysPipe } from './keys.pipe'
import { TriggerFormComponent } from './device-trigger/trigger-form/trigger-form.component';
import { DeviceComponent } from './models/device/device.component'
import { CalendarService } from './calendar'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    KeysPipe,
    TriggerFormComponent,
    DeviceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule.forRoot(),
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSidenavModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdIconModule,
    MdOptionModule,
    MdButtonToggleModule,
    MdTooltipModule,
    MdToolbarModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    CalendarService,
    DeviceService,
    DeviceTriggerService,
    LiveAnnouncer,
    MdSnackBar,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
