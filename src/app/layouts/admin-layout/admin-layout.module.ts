import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { AdduserComponent } from 'src/app/dialogs/adduser/adduser.component';
import { UpdateuserComponent } from 'src/app/dialogs/updateuser/updateuser.component';
import { NotificationsComponent } from 'src/app/dialogs/notifications/notifications.component';
import { UserslistforaddtaskComponent } from 'src/app/dialogs/userslistforaddtask/userslistforaddtask.component';
import { AddtaskComponent } from 'src/app/dialogs/addtask/addtask.component';
import { TaskdetailsComponent } from 'src/app/dialogs/taskdetails/taskdetails.component';
import { CommentsComponent } from 'src/app/dialogs/comments/comments.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { PayementByClientComponent } from 'src/app/dialogs/payement-by-client/payement-by-client.component';
import { ClientByIdComponent } from 'src/app/dialogs/client-by-id/client-by-id.component';
import { AddCondidatComponent } from 'src/app/dialogs/add-condidat/add-condidat.component';
import { ListClientsAdvancedComponent } from 'src/app/pages/list-clients-advanced/list-clients-advanced.component';
import { UpdateCondidatComponent } from 'src/app/dialogs/update-condidat/update-condidat.component';
import { AddPayementToCLientComponent } from 'src/app/dialogs/add-payement-to-client/add-payement-to-client.component';
import { ArchiveComponent } from 'src/app/pages/archive/archive.component';
import { CredentialByClientComponent } from 'src/app/dialogs/credential-by-client/credential-by-client.component';
import { DocArchiveComponent } from 'src/app/pages/doc-archive/doc-archive.component';
import { UserslistforaddcondidatComponent } from 'src/app/dialogs/userslistforaddcondidat/userslistforaddcondidat.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MyClientsComponent } from 'src/app/pages/my-clients/my-clients.component';

@NgModule({
  imports: [
  CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    AdduserComponent,
    UpdateuserComponent,
    NotificationsComponent,
    UserslistforaddtaskComponent,
    AddtaskComponent,
    TaskdetailsComponent,
    CommentsComponent,
    ClientsComponent,
    PayementByClientComponent,
    ClientByIdComponent,
    AddCondidatComponent,
    ListClientsAdvancedComponent,
    UpdateCondidatComponent,
    AddPayementToCLientComponent,
    ArchiveComponent,
    CredentialByClientComponent,
    DocArchiveComponent,
    UserslistforaddcondidatComponent,
    MyClientsComponent
    ]
})
export class AdminLayoutModule {}
