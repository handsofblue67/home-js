// Here we're also including the CanActivate API
import { Routes, RouterModule } from '@angular/router'
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service'
import { BrokerComponent } from './broker'
import { ChartComponent } from './chart'
import { ChatComponent } from './chat'
import { FoodDispenserComponent } from './food-dispenser'
import { HomeComponent } from './home'
import { LoginComponent } from './login'
import { MapComponent } from './map'
import { TemperatureComponent } from './temperature'
import { TodosComponent } from './todos'
import { ToggleComponent } from './toggle'

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'maps', component: MapComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },
    { path: 'lights', component: ToggleComponent, canActivate: [AuthGuard] },
    { path: 'debug', component: BrokerComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'food-dispenser', component: FoodDispenserComponent, canActivate: [AuthGuard] },
    { path: 'temperature', component: TemperatureComponent, canActivate: [AuthGuard] },
    { path: 'todos', component: TodosComponent },
    { path: '**', redirectTo: ''},
]

export const routing = RouterModule.forRoot(appRoutes)

export const routedComponents = [
    BrokerComponent,
    ChartComponent,
    ChatComponent,
    FoodDispenserComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    TemperatureComponent,
    TodosComponent,
    ToggleComponent,
]
