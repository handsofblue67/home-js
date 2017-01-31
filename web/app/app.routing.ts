// Here we're also including the CanActivate API
import { Routes, RouterModule } from '@angular/router'
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service'
// import { BrokerComponent } from './broker'
// import { ChartComponent } from './chart'
// import { ChatComponent } from './chat'
import { DevicesComponent } from './devices'
// import { FoodDispenserComponent } from './food-dispenser'
// import { LightsComponent } from './lights'
import { LoginComponent } from './login'
// import { MapComponent } from './map'
// import { TemperatureComponent } from './temperature'
// import { TodosComponent } from './todos'
import { UsersComponent } from './users'

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    // { path: 'maps', component: MapComponent, canActivate: [AuthGuard] },
    // { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },
    // { path: 'lights', component: LightsComponent, canActivate: [AuthGuard] },
    // { path: 'debug', component: BrokerComponent, canActivate: [AuthGuard] },
    // { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    // { path: 'food-dispenser', component: FoodDispenserComponent, canActivate: [AuthGuard] },
    // { path: 'temperature', component: TemperatureComponent, canActivate: [AuthGuard] },
    // { path: 'todos', component: TodosComponent },
    // { path: '**', redirectTo: ''},
]

export const routing = RouterModule.forRoot(appRoutes)

export const routedComponents = [
    // BrokerComponent,
    // ChartComponent,
    // ChatComponent,
    DevicesComponent,
    // FoodDispenserComponent,
    UsersComponent,
    LoginComponent,
    // MapComponent,
    // TemperatureComponent,
    // TodosComponent,
    // LightsComponent,
]
