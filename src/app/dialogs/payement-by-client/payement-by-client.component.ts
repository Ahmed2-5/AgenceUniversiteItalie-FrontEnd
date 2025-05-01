import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payement } from 'src/app/models/Payement.model';
import { Tranche } from 'src/app/models/Tranche.model'; 
import { ClientsService } from 'src/app/services/clients.service';

export enum StatusTranche {
  EN_ATTENTE = 'EN_ATTENTE',
  PAYEE = 'PAYEE',
  EN_RETARD = 'EN_RETARD',
}

@Component({
  selector: 'app-payement-by-client',
  templateUrl: './payement-by-client.component.html',
  styleUrls: ['./payement-by-client.component.scss']
})
export class PayementByClientComponent implements OnInit {

  totalAmountDue: string;
  remainingAmountDue: string;
  numberOfInstallments: number;
  installments: Tranche[] = [];
  payement: Payement;
  email: string = '';
  editTrancheIndexMap: { [key: number]: boolean } = {};

  isAddingTranche: boolean = false;
  newTrancheMontant: number = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number ,payementId :number},
    private dialogRef: MatDialogRef<PayementByClientComponent>, 
    private payementService: ClientsService
  ) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.loadPaiements();
  }

  loadPaiements() {
    this.payementService.getPaiementsByClient(this.data.clientID).subscribe((paiements: Payement[]) => {
      if (paiements && paiements.length > 0) {
        this.payement = paiements[this.data.payementId];
        this.totalAmountDue = `${this.payement.montantaTotal} DT`;

        this.payementService.getTranchesByPaiement(this.payement.idPayement).subscribe({
          next: (tranches) => {
            this.numberOfInstallments = tranches.length;
            this.installments = tranches;
            this.payementService.getResteAPayer(this.payement.idPayement).subscribe({
              next: (reste) => {
                this.remainingAmountDue = `${reste} DT`;
              },
              error: (err) => {
                console.error('Error while fetching remaining amount:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error loading installments:', err);
          }
        });
      }
    });
  }

  // Calculate remaining amount to pay
  calculateRemainingAmount(tranches: Tranche[]): number {
    let remaining = 0;
    tranches.forEach(tranche => {
      if (tranche.statusTranche !== StatusTranche.PAYEE) {
        remaining += tranche.montant;
      }
    });
    return remaining;
  }

  markAsPaid(index: number) {
    const tranche = this.installments[index];
    this.payementService.payerTranche(tranche.idTranche,this.email).subscribe(() => {
      this.installments[index].statusTranche = StatusTranche.PAYEE;
      this.remainingAmountDue = `${this.calculateRemainingAmount(this.installments)} DT`;
    });
  }
  toggleEditTrancheField(index: number) {
    this.editTrancheIndexMap[index] = true;
  }
  closeEditTrancheField(index: number) {
    this.editTrancheIndexMap[index] = false;
    this.loadPaiements() 

  }
  editMontant(i: number, newMontant: number) {
    const tranche = this.installments[i];
  
    this.payementService.updateTrancheAndRedistribute(tranche.idTranche, newMontant, this.email)
      .subscribe({
        next: () => {
          console.log('✅ Montant updated');
          tranche.montant = newMontant;
          this.remainingAmountDue = `${this.calculateRemainingAmount(this.installments)} DT`;
          this.editTrancheIndexMap[i] = false; // Exit edit mode
          this.loadPaiements() 
        },
        error: (err) => {
          console.error('❌ Error updating montant:', err);
        }
      });
  }
  
  startAddingTranche() {
  this.isAddingTranche = true;
  this.newTrancheMontant = null;
}

cancelAddingTranche() {
  this.isAddingTranche = false;
  this.newTrancheMontant = null;
}

confirmAddTranche() {
  if (this.newTrancheMontant && this.newTrancheMontant > 0) {
    const newTranche: Tranche = {
      montant: this.newTrancheMontant,
      dateLimite: null,             // Set this to current date or calculate accordingly
      dateResglement: new Date(),         // Same as above, or adjust if necessary
      numero: null,  // Assuming the next tranche number is one more than the length
      statusTranche: StatusTranche.EN_ATTENTE, // Default status
      notificationEnvoyee: false,         // Default value
      notificationRetardEnvoyee: false,  // Default value
      montantFixe: false,                // Default value
      payement: null            // Link to current payment
    };

    this.payementService.addTrancheToPayement(this.payement.idPayement, newTranche)
      .subscribe({
        next: () => {
          console.log('✅ Tranche added');
          this.loadPaiements();
          this.cancelAddingTranche();
        },
        error: (err) => {
          console.error('❌ Failed to add tranche:', err);
          this.loadPaiements();
          this.cancelAddingTranche();
        }
      });
  }
}
  






  closeDialog(): void {
    this.loadPaiements();
    this.dialogRef.close();

  }
}
