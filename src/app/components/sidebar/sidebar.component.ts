import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Tasks',  icon:'fa fa-tasks text-blue', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Table of Users',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/clients', title: 'List of candidates',      icon: 'fa fa-users text-purple',      class: '' },
    { path: '/clientsAV', title: 'List of clients',  icon: 'fa fa-briefcase text-orange', class: '' },
    { path: '/archive', title: 'Client Archive ', icon: 'fa fa-archive text-muted', class: '' },
 //   { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
