import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payement } from 'src/app/models/Payement.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-payement-to-client',
  templateUrl: './add-payement-to-client.component.html',
  styleUrls: ['./add-payement-to-client.component.scss']
})
export class AddPayementToCLientComponent implements OnInit {

  payementForm!: FormGroup;
  isSubmitting = false;
  email: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
    private dialogRef: MatDialogRef<AddPayementToCLientComponent>,
    private payementService: ClientsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');

    this.payementForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(1)]],
      nombreTranches: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  submitForm() {
    if (this.payementForm.invalid) return;

    const { montant, nombreTranches } = this.payementForm.value;
    this.isSubmitting = true;

    this.payementService.createPaiement(this.data.clientID, montant, nombreTranches,this.email).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erreur lors de la création du paiement :', err);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}