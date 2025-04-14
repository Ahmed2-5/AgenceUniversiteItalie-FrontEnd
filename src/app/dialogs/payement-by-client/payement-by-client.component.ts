import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payement-by-client',
  templateUrl: './payement-by-client.component.html',
  styleUrls: ['./payement-by-client.component.scss']
})
export class PayementByClientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
    private dialogRef: MatDialogRef<PayementByClientComponent>, 
  ) { }

  ngOnInit(): void {
  }
  totalAmountDue = '5900 DT';
  remainingAmountDue = '3500 DT';
  numberOfInstallments = 3;

  installments = [
    { name: 'Tranche 1', amount: '2400 DT', dueDate: '07/11/2024', isPaid: true },
    { name: 'Tranche 2', amount: '2400 DT', dueDate: '07/12/2024', isPaid: false },
    { name: 'Tranche 3', amount: '2400 DT', dueDate: '07/12/2024', isPaid: false }
  ];

  markAsPaid(index: number) {
    this.installments[index].isPaid = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
