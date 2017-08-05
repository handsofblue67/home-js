import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './auth-guard.service'
import { CalendarComponent } from './calendar'
import { DevicesComponent } from './devices'
import { DeviceTriggerComponent } from './device-trigger'
import { EditComponent } from './devices/edit/edit.component'
import { LoginComponent } from './login'
import { SensorComponent } from './devices/sensor/sensor.component'
import { UsersComponent } from './users'

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    { path: 'device-trigger/:deviceID', component: DeviceTriggerComponent, canActivate: [AuthGuard] },
    { path: 'edit-device/:deviceID', component: EditComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: ''},
]

export const routing = RouterModule.forRoot(appRoutes)

export const routedComponents = [
    CalendarComponent,
    DevicesComponent,
    DeviceTriggerComponent,
    EditComponent,
    LoginComponent,
    UsersComponent,
    SensorComponent,
]
