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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDialogModule,
    ReactiveFormsModule
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
    TaskdetailsComponent
  ]
})
export class AdminLayoutModule {}
