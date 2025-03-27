import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    
  constructor(private httpclt: HttpClient) {}

  getNotifications(userId: number): Observable<Notification[]> {
    return this.httpclt.get<any[]>(`http://localhost:8082/getNotifications/${userId}`);
  }
  

  getNotificationsByIsReadedOrNot(isReaded: boolean): Observable<Notification[]> {
    return this.httpclt.get<Notification[]>(`http://localhost:8082/getNotificationsByIsReadedOrNot/${isReaded}`);
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.httpclt.post<Notification>(`http://localhost:8082/createNotification`,notification);
  }
 
  getcreatedusers(userId: number): Observable<Utilisateur[]> {
    return this.httpclt.get<Utilisateur[]>(`http://localhost:8082/getcreatedusers/${userId}`);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.httpclt.put(`http://localhost:8082/markAsRead/${notificationId}`, {});
  }

  MarkAllAsReaded(userId: number): Observable<any> {
    return this.httpclt.put(`http://localhost:8082/MarkAllAsReaded/${userId}`, {});
  }
  
  getlistofReadedOrUnreadedNotifications(userId: number): Observable<boolean[]> {
      return this.httpclt.get<boolean[]>(`http://localhost:8082/getlistofReadedOrUnreadedNotifications/${userId}`);
  }
}
