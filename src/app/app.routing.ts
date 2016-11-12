// Here we're also including the CanActivate API
import { Routes, RouterModule, CanActivate } from '@angular/router'
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service';
import { ToggleComponent } from './toggle'
import { ChartComponent } from './chart'
import { MapComponent } from './map'
import { BrokerComponent } from './broker'
import { HomeComponent } from './home'

const appRoutes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'maps', component: MapComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },
    { path: 'lights', component: ToggleComponent, canActivate: [AuthGuard] },
    { path: 'debug', component: BrokerComponent, canActivate: [AuthGuard] },
]

export const routing = RouterModule.forRoot(appRoutes);
