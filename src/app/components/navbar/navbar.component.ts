import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { NotificationService } from 'src/app/services/notification.service';
import { filter, map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notification } from 'src/app/models/Notification.model';

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

  userId!: number; 
  listofcreatedNotifusers : Utilisateur[] = [];
  visibleNotifications: number = 4;
  visibleAdminNotifications: number = 4;
  NotifDates: Set<Date> = new Set<Date>();

  showNotifDialog = false;
  filterType: string = 'ALL';

  constructor(location: Location,  private element: ElementRef, private router: Router,
    private authserv:AuthService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.location = location;
  } 

 

  ngOnInit() {
    const email = sessionStorage.getItem("email")

    if (email) {
      this.authserv.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data
          this.userId = data.idUtilisateur
          if (this.user.profileImageUrl) {
            this.user.profileImageUrl = `http://localhost:8082/api/utilisateurs/uploads/${data.profileImageUrl}`
          }
          // Load notifications after getting user data

          this.loadNotificationsCount()
        },
        error: (error) => {
          console.error("Error fetching user:", error)
        },
      })
    }
    this.listTitles = ROUTES.filter((listTitle) => listTitle)
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path())
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1)
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title
      }
    }
    return "Dashboard"
  }

  logout() {
    this.authserv.logout()
  }

  loadNotificationsCount(){
    this.notificationService.getNotifications(this.userId).pipe(
      map(notifications => notifications.filter(notification => !notification.readed))
    ).subscribe(filteredNotifications => {
      this.notifications = filteredNotifications;
    });
  }

  toggleNotifDialog(event: Event) {
    // Prevent the click from propagating to the document
    event.stopPropagation()
    this.showNotifDialog = !this.showNotifDialog
    this.loadNotificationsCount()
    if (this.showNotifDialog) {
      this.loadNotifications()
    }
  }

  getUnreadNotificationCount(): number {
    return this.notifications.length
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(this.userId).subscribe((notifications) => {
      const sorted = notifications.sort(
        (a, b) => new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime(),
      );
  
      // Apply filtering based on selected filterType
      if (this.filterType !== 'ALL') {
        this.notifications = sorted.filter(notif => notif.typeNotif === this.filterType);
      } else {
        this.notifications = sorted;
      }
  
      this.NotifDates = new Set<Date>(this.notifications.map((notif) => new Date(notif.notificationDate)));
    });
  
    this.notificationService.getcreatedusers(this.userId).subscribe((data) => {
      this.listofcreatedNotifusers = data.reverse();
    });
  }
  
  setFilter(type: string) {
    this.filterType = type;
    this.loadNotifications();
  }
  

  getcreatedUser(index: number): Utilisateur {
    return this.listofcreatedNotifusers[index]
  }

  markAllAsRead() {
    return this.notificationService.MarkAllAsReaded(this.userId).subscribe((d) => {
      console.log(d)
      this.loadNotifications()
    })
  }

  showMore(): void {
    this.visibleNotifications = this.notifications.length
  }

  getNotifDate(index: number): Date {
    const NotifArray = Array.from(this.NotifDates)
    return NotifArray[index]
  }

  getTimeDifference(index: number): string {
    const currentDate = new Date()
    const NotifDate = this.getNotifDate(index)

    if (!NotifDate) {
      return ""
    }

    // Round the time difference to the nearest integer
    let timeDifference = Math.round(Math.abs(currentDate.getTime() - NotifDate.getTime()) / 1000)

    const years = Math.floor(timeDifference / (3600 * 24 * 365.25))
    if (years > 0) {
      return `${years}y`
    }
    timeDifference -= years * 3600 * 24 * 365.25

    const months = Math.floor(timeDifference / (3600 * 24 * 30.44))
    if (months > 0) {
      return `${months}mo`
    }
    timeDifference -= months * 3600 * 24 * 30.44

    const days = Math.floor(timeDifference / (3600 * 24))
    if (days > 0) {
      return `${days}d`
    }
    timeDifference -= days * 3600 * 24

    const hours = Math.floor(timeDifference / 3600)
    if (hours > 0) {
      return `${hours}h`
    }
    timeDifference -= hours * 3600

    const minutes = Math.floor(timeDifference / 60)
    if (minutes > 0) {
      return `${minutes}min`
    }

    const seconds = Math.floor(timeDifference % 60)
    return `${seconds}s`
  }
}