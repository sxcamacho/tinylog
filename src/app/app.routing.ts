import { Routes, RouterModule } from '@angular/router'

import { HomePageComponent } from './pages/home-page/home-page.component'
import { ClientsPageComponent } from './pages/clients-page/clients-page.component'
import { LogsPageComponent } from './pages/logs-page/logs-page.component'

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'clients',
        component: ClientsPageComponent,
    },
    {
        path: 'clients/:id',
        component: LogsPageComponent,
    },
]

export const AppRouting = RouterModule.forRoot(routes, { useHash: false })
