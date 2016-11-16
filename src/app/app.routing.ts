// Here we're also including the CanActivate API
import { Routes, RouterModule, CanActivate } from '@angular/router'
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service';
import { BrokerComponent } from './broker'
import { ChartComponent } from './chart'
import { ChatComponent } from './chat'
import { HomeComponent } from './home'
import { MapComponent } from './map'
import { ToggleComponent } from './toggle'

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'maps', component: MapComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },
    { path: 'lights', component: ToggleComponent, canActivate: [AuthGuard] },
    { path: 'debug', component: BrokerComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
]

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    BrokerComponent,
    ChartComponent,
    ChatComponent,
    HomeComponent,
    MapComponent,
    ToggleComponent,
]
