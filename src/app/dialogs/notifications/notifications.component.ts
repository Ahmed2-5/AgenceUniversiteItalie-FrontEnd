import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/Notification.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  userId!: number; 
  listofcreatedNotifusers : Utilisateur[] = [];
  user!: Utilisateur;
  visibleNotifications: number = 4;
  visibleAdminNotifications: number = 4;
  NotifDates: Set<Date> = new Set<Date>();

  constructor(private notificationService: NotificationService,
              private authserv: AuthService,
              private route:Router,
              private dialogRef: MatDialogRef<NotificationsComponent>,
            ) {}

  ngOnInit(): void {
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
    this.loadNotifications();
  }

  loadNotifications(): void {
    
    this.notificationService.getNotifications(this.userId).subscribe(notifications => {
      this.notifications = notifications.sort((a, b) => new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime());
      this.NotifDates = new Set<Date>(this.notifications.map(notif => new Date(notif.notificationDate)));

    });
    this.notificationService.getcreatedusers(this.userId).subscribe(data => {
      this.listofcreatedNotifusers = data.reverse();
    });
    
    
    
    
  }

  getcreatedUser(index: number): Utilisateur {
    return this.listofcreatedNotifusers[index];
  }

  markAllAsRead(){
    return this.notificationService.MarkAllAsReaded(this.userId).subscribe((d)=>{
       console.log(d)
       this.loadNotifications()
    })
  }
 
  showMore(): void {
    this.visibleNotifications = this.notifications.length;
  }

  getNotifDate(index: number): Date {
    const NotifArray = Array.from(this.NotifDates);
    return NotifArray[index];
  }

  getTimeDifference(idnotif: number): string {
    const currentDate = new Date();
    const NotifDate = this.getNotifDate(idnotif);
   
   

    // Round the time difference to the nearest integer
    let timeDifference = Math.round(Math.abs(currentDate.getTime() - NotifDate.getTime()) / 1000);
  
    const years = Math.floor(timeDifference / (3600 * 24 * 365.25));
    if (years > 0) {
      return `${years}y`;
    }
    timeDifference -= years * 3600 * 24 * 365.25;
  
    const months = Math.floor(timeDifference / (3600 * 24 * 30.44));
    if (months > 0) {
      return `${months}mo`;
    }
    timeDifference -= months * 3600 * 24 * 30.44;
  
    const days = Math.floor(timeDifference / (3600 * 24));
    if (days > 0) {
      return `${days}d`;
    }
    timeDifference -= days * 3600 * 24;
  
    const hours = Math.floor(timeDifference / 3600);
    if (hours > 0) {
      return `${hours}h`;
    }
    timeDifference -= hours * 3600;
  
    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
      return `${minutes}min`;
    }
  
    const seconds = Math.floor(timeDifference % 60);
    return `${seconds}s`;
  }

}