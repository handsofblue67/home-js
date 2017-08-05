import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'angular-calendar'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdIconModule,
  MdMenuModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSelectModule,
  MdInputModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { DeviceService } from './devices'
import { DeviceTriggerService } from './device-trigger'
import { routing, routedComponents } from './app.routing'
import { UsersService } from './users'
import { KeysPipe } from './keys.pipe'
import { PrettyDatePipe } from './shared/pretty-date.pipe'
import { TriggerFormComponent } from './device-trigger/trigger-form/trigger-form.component';
import { DeviceComponent } from './models/device/device.component'
import { CalendarService } from './calendar'
import { CdkTableModule } from '@angular/cdk'


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    routedComponents,
    KeysPipe,
    PrettyDatePipe,
    TriggerFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule.forRoot(),
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    CalendarService,
    DeviceService,
    DeviceTriggerService,
    // LiveAnnouncer,
    // MdSnackBar,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
