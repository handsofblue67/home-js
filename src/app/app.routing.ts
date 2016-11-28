// Here we're also including the CanActivate API
import { Routes, RouterModule } from '@angular/router'
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service'
import { BrokerComponent } from './broker'
import { ChartComponent } from './chart'
import { ChatComponent } from './chat'
import { DextersLabComponent } from './dexters-lab'
import { HomeComponent } from './home'
import { LoginComponent } from './login'
import { MapComponent } from './map'
import { ToggleComponent } from './toggle'
import { FoodDispenserComponent } from './food-dispenser'

const appRoutes: Routes = [
<<<<<<< Updated upstream
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
=======
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dexters-lab', component: DextersLabComponent, canActivate: [AuthGuard] },
>>>>>>> Stashed changes
    { path: 'maps', component: MapComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },
    { path: 'lights', component: ToggleComponent, canActivate: [AuthGuard] },
    { path: 'debug', component: BrokerComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'food-dispenser', component: FoodDispenserComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: ''}
]

export const routing = RouterModule.forRoot(appRoutes)

export const routedComponents = [
    BrokerComponent,
    ChartComponent,
    ChatComponent,
<<<<<<< HEAD
    DextersLabComponent,
=======
    FoodDispenserComponent,
>>>>>>> develop
    HomeComponent,
    LoginComponent,
    MapComponent,
    ToggleComponent,
]
