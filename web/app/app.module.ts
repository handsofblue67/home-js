import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'angular-calendar'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule, MdSnackBar, LiveAnnouncer } from '@angular/material'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { DeviceService } from './devices'
import { routing, routedComponents } from './app.routing'
import { UsersService } from './users'
import { KeysPipe } from './keys.pipe'

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    LiveAnnouncer,
    MdSnackBar,
    UsersService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
