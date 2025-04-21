import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversityComponent } from '../dialogs/university/university.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [
    trigger('slideToggle', [
      state('paid', style({ transform: 'translateX(0)', opacity: 1 })),
      state('unpaid', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('unpaid => paid', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class TestComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  credentials = [
    {
      logo: '/assets/img/outlook.png',
      email: 'Bougachaahmed98@gmail.com',
      password: 'Ahlawasahla!',
      editMode: false
    },
    {
      logo: '/assets/img/brand/red.png',
      email: 'Bougachaahmed98@gmail.com',
      password: 'Ahlawasahla!',
      editMode: false
    },
    {
      logo: '/assets/img/prenomtami.png',
      email: 'Bougachaahmed98@gmail.com',
      password: 'Ahlawasahla!',
      editMode: false
    }
  ];
  
  toggleEdit(item: any) {
    item.editMode = !item.editMode;
  }
  
  rdvDate = new Date('2025-05-02');
  

openUniversityDialog() {
  this.dialog.open(UniversityComponent, {
    width: '500px'
  });
}
}
