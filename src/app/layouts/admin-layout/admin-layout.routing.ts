import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { ListClientsAdvancedComponent } from 'src/app/pages/list-clients-advanced/list-clients-advanced.component';
import { ArchiveComponent } from 'src/app/pages/archive/archive.component';
import { ClientByIdComponent } from 'src/app/dialogs/client-by-id/client-by-id.component';
import { DocArchiveComponent } from 'src/app/pages/doc-archive/doc-archive.component';
import { MyClientsComponent } from 'src/app/pages/my-clients/my-clients.component';
import { ListClientsAdminitalieComponent } from 'src/app/pages/list-clients-adminitalie/list-clients-adminitalie.component';
import { LogsComponent } from 'src/app/pages/logs/logs.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'clients',           component: ClientsComponent },
    { path: 'clientsAV',           component: ListClientsAdvancedComponent },
    { path: 'archive',           component: ArchiveComponent },
    { path: 'clientID',           component: ClientByIdComponent },
    { path: 'docArchive',           component: DocArchiveComponent },
    { path: 'listclientsadmin',           component: ListClientsAdminitalieComponent },
    { path: 'myclients',           component: MyClientsComponent },
    { path: 'logs',           component: LogsComponent }


    
];
