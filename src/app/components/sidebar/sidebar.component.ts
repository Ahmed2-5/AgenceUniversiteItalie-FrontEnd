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
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/icons', title: 'Tasks',  icon:'fa fa-tasks text-blue', class: '' },
    { path: '/tables', title: 'Table of Users',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/clients', title: 'candidates List',      icon: 'fa fa-users text-purple',      class: '' },
    { path: '/myclients', title: 'My clients ', icon: 'fa fa-briefcase text-green', class: '' },
    { path: '/listclientsadmin', title: 'client List for AdminItalie ', icon: 'fa fa-briefcase text-black', class: '' },
    { path: '/clientsAV', title: 'client List',  icon: 'fa fa-briefcase text-orange', class: '' },
    { path: '/archive', title: 'Clients Archived ', icon: 'fa fa-archive text-muted', class: '' },
    { path: '/docArchive', title: 'docs Archived ', icon: 'fa fa-archive text-yellow', class: '' },
    { path: '/logs', title: 'Logs', icon: 'fa fa-history text-primary', class: '' },
    
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
  role: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

    this.menuItems = ROUTES;

    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.path === '/clients') {
        return this.role === 'SUPER_ADMIN' || this.role === 'ADMIN_TUNISIE';
      } else if (menuItem.path === '/archive') {
        return this.role === 'SUPER_ADMIN' || this.role === 'ADMIN_TUNISIE';
      } else if (menuItem.path === '/docArchive') {
        return this.role === 'SUPER_ADMIN' || this.role === 'ADMIN_TUNISIE';
      } else if (menuItem.path === '/myclients') {
        return this.role === 'ADMIN_ITALIE' || this.role === 'ADMIN_TUNISIE';
      }else if (menuItem.path === '/listclientsadmin') {
        return this.role === 'ADMIN_ITALIE' || this.role === 'SUPER_ADMIN';
      }else if (menuItem.path === '/clientsAV') {
        return this.role === 'SUPER_ADMIN' || this.role === 'ADMIN_TUNISIE';
      }else if (menuItem.path === '/tables') {
        return this.role === 'SUPER_ADMIN';
      }else if (menuItem.path === '/logs') {
        return this.role === 'SUPER_ADMIN';
      }else if (menuItem.path === '/dashboard') {
        return this.role === 'SUPER_ADMIN';
      }
      return true; // Other routes always shown
    });    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
