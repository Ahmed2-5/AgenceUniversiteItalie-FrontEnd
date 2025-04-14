import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-clients-advanced',
  templateUrl: './list-clients-advanced.component.html',
  styleUrls: ['./list-clients-advanced.component.scss']
})
export class ListClientsAdvancedComponent implements OnInit {

  clients = [
    {
      id: 1,
      date: '13/11/24',
      pack: 'GOLD',
      nomPrenom: 'Ali Maghraoui',
      communication: 'OK',
      dateDebut: '13/11/24',
      drive: 'Ali Maghraoui',
      agent: 'Ibrahim',
      montant: '5900DT',
      reste: '3500DT',
      payement: '2400DT',
      tranche1: '2400DT',
      tranche2: '0DT',
      tranche3: '0DT',
      tranche4: '0DT',
      tranche5: '0DT'
    },
    {
      id: 2,
      date: '13/11/24',
      pack: 'GOLD',
      nomPrenom: 'Ali Maghraoui',
      communication: 'OK',
      dateDebut: '13/11/24',
      drive: 'Ali Maghraoui',
      agent: 'Ibrahim',
      montant: '5900DT',
      reste: '3500DT',
      payement: '2400DT',
      tranche1: '2400DT',
      tranche2: '0DT',
      tranche3: '0DT',
      tranche4: '0DT',
      tranche5: '0DT'

    }
  ];

  constructor() { }

  ngOnInit(): void {}

  packOptions = ['GOLD', 'SILVER', 'BRONZE'];
  agentOptions = ['Ibrahim', 'Nour'];


  changePack(client: any) {
    // Optional logic here
    console.log('Pack changed:', client.pack);
  }
  
  changeAgent(client: any) {
    // Optional logic here
    console.log('Agent changed:', client.agent);
  }
  
  openClientDialog(clientId: number) {
    // Replace this with actual dialog logic
    alert('Open ClientByIdComponent for ID: ' + clientId);
  }

}
