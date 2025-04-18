import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TestComponent } from 'src/app/test/test.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { ListClientsAdvancedComponent } from 'src/app/pages/list-clients-advanced/list-clients-advanced.component';
import { ArchiveComponent } from 'src/app/pages/archive/archive.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'clients',           component: ClientsComponent },
    { path: 'clientsAV',           component: ListClientsAdvancedComponent },
    { path: 'archive',           component: ArchiveComponent },
    { path: 'test',           component: TestComponent }
];
