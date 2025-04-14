import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { NotificationService } from 'src/app/services/notification.service';
import { filter, map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsComponent } from 'src/app/dialogs/notifications/notifications.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user:Utilisateur=new Utilisateur()
  notifications: Notification[] = [];

  
  constructor(location: Location,  private element: ElementRef, private router: Router,
    private authserv:AuthService,
  //  private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.location = location;
  }

  ngOnInit() {
    const email = sessionStorage.getItem('email');

    if (email) {
      this.authserv.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data;
          if (this.user.profileImageUrl) {
            this.user.profileImageUrl = `http://localhost:8082/api/utilisateurs/uploads/${data.profileImageUrl}`;
         }
        },
        error: (error) => {
          console.error("Error fetching user:", error);
        }
      });
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);

  //  this.loadNotificationsCount()
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout(){
    this.authserv.logout()
  }

 /* loadNotificationsCount(){
    this.notificationService.getNotifications(this.user.idUtilisateur).pipe(
      map(notifications => notifications.filter(notification => !notification.readed))
    ).subscribe(filteredNotifications => {
      this.notifications = filteredNotifications;
    });
  } 

    openNotifdialog(event: MouseEvent) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();  // Get the bell icon's position
    
      const dialogConfig = new MatDialogConfig();
      
      // Set the dialog position relative to the bell icon
      dialogConfig.position = {
        top: `${rect.bottom - 600}px`,  // Position the dialog slightly below the bell
        left: `${rect.left - 220}px`,        // Align the dialog horizontally with the bell
      };
    
      dialogConfig.data = { idUtilisateur: this.user.idUtilisateur };
      dialogConfig.panelClass = 'custom-dialog-container';  // Custom CSS class for styling
      
      // Open the dialog with configuration
      const dialogRef = this.dialog.open(NotificationsComponent, dialogConfig);
    
      // Close the dialog if clicked outside
      dialogRef.backdropClick().subscribe(() => {
        dialogRef.close();
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });
    }
    
     getUnreadNotificationCount(): number {
    return this.notifications.length;
  }*/
}
