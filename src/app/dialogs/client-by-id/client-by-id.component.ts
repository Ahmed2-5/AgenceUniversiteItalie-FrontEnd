import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PayementByClientComponent } from '../payement-by-client/payement-by-client.component';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from 'src/app/models/Clients.model';
import { ClientDocument } from 'src/app/models/ClientDocument.model';
import { Payement } from 'src/app/models/Payement.model';

@Component({
  selector: 'app-client-by-id',
  templateUrl: './client-by-id.component.html',
  styleUrls: ['./client-by-id.component.scss']
})
export class ClientByIdComponent implements OnInit {
    
    documents: ClientDocument[] = [];
    client: Clients = new Clients();
    @ViewChild('fileInput') fileInput!: ElementRef;
  
    editMode: { [key: number]: boolean } = {}; // Object with document id as key and edit mode status as value
    editedName: { [key: number]: string } = {};
  
    payement!: Payement | null;
    montantTotal: number = 0;
    reste: number = 0;
    nombreTranches: number = 0;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
      private dialogRef: MatDialogRef<ClientByIdComponent>,
      private clientserv: ClientsService,
      private dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
        this.clientserv.getClientById(this.data.clientID).subscribe({
          next: (data) => {
            this.client = data;
            this.loadDocuments(this.data.clientID);
            this.loadPaiements(this.data.clientID);
          },
          error: (error) => {
            console.error("Error fetching user:", error);
          }
        });
    }
  
    loadPaiements(clientId: number): void {
      this.clientserv.getPaiementsByClient(clientId).subscribe({
        next: (paiements) => {
          if (paiements.length > 0) {
            this.payement = paiements[0];
            this.montantTotal = this.payement.montantaTotal;
    
            // Récupérer les tranches à part
            this.clientserv.getTranchesByPaiement(this.payement.idPayement).subscribe({
              next: (tranches) => {
                this.nombreTranches = tranches.length;
    
                this.clientserv.getResteAPayer(this.payement.idPayement).subscribe({
                  next: (reste) => {
                    this.reste = reste;  // Set the remaining amount to pay
                  },
                  error: (err) => {
                    console.error('Error while fetching remaining amount:', err);
                  }
                });
              },
              error: (err) => {
                console.error('Erreur lors du chargement des tranches :', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des paiements :', err);
        }
      });
    }
    
    

    loadDocuments(idClient: number): void {
      this.clientserv.getDocumentsByClient(idClient).subscribe({
        next: (docs) => {
          this.documents = docs;
        },
        error: (err) => {
          console.error('Error fetching documents:', err);
        }
      });
    }

    
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (!input.files?.length || !this.client.idClients) return;

      const file = input.files[0];
      const nom = file.name;
      const idClient = this.client.idClients;
      // const idUtilisateur = this.authserv.getUserId(); // Ensure this method exists

      this.clientserv.uploadDocument(file, nom, idClient, 1).subscribe({
        next: (uploadedDoc) => {
          this.documents.push(uploadedDoc); // Add new doc to list
        },
        error: (err) => {
          console.error('Error uploading document:', err);
        }
      });

      input.value = ''; // Clear the input after upload
    }
  
    triggerFileInput(): void {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput?.click();
    }

    openDocument(doc: ClientDocument): void {
      this.clientserv.downloadFile(doc.idDocument).subscribe(
        (response: Blob) => {
          const blob = response;
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = doc.nom; // The file name will be the document's name
          link.click();
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
    }

    toggleEditMode(docId: number, docName: string, event: MouseEvent): void {
      // Prevent toggling if the input itself is clicked
      if ((event.target as HTMLElement).tagName === 'INPUT') {
          return;
      }

      this.editMode[docId] = !this.editMode[docId];  // Toggle edit mode
      if (this.editMode[docId]) {
          this.editedName[docId] = docName; // Store the original name when edit mode is enabled
      }
    }

    // Save the new name after editing
    saveDocumentName(docId: number): void {
      const updatedDocName = this.editedName[docId];
      // Call the service to save the updated document name
      this.clientserv.renameDocument(docId, updatedDocName).subscribe({
        next: (updatedDoc) => {
          // Update the documents array with the new name
          const doc = this.documents.find((d) => d.idDocument === docId);
          if (doc) {
            doc.nom = updatedDocName; // Update the document name
          }
          this.editMode[docId] = false;  // Disable edit mode
        },
        error: (err) => {
          console.error('Error saving document name:', err);
        }
      });
    }

    deleteDocument(doc: ClientDocument): void {
      this.clientserv.deleteDocument(doc.idDocument).subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.idDocument !== doc.idDocument);
        },
        error: err => console.error('Error deleting document:', err)
      });
    }

  /*  triggerReplaceInput(doc: ClientDocument): void {
      const input = document.getElementById('replaceInput_' + doc.idDocument) as HTMLInputElement;
      input?.click();
    }

    replaceDocument(event: Event, doc: ClientDocument, newFileName: string): void {
      const input = event.target as HTMLInputElement;
      if (!input.files?.length) return;

      const file = input.files[0];
      const formData = new FormData();

      // Append the file to the FormData
      formData.append("file", file);

      // Append the new file name to the FormData
      formData.append("newFileName", newFileName);

      // Call the service to replace the document
      this.clientserv.replaceDocument(doc.idDocument, formData).subscribe({
        next: (updatedDoc) => {
          // Update the documents array with the new document details
          const docIndex = this.documents.findIndex(d => d.idDocument === doc.idDocument);
          if (docIndex !== -1) {
            this.documents[docIndex] = updatedDoc; // Update the document in the array
          }
          console.log('Document updated successfully:', updatedDoc);
        },
        error: (err) => {
          console.error("Error replacing document:", err);
        }
      });

      // Clear the file input after uploading
      input.value = '';
    }*/

    openPaymenetDialog(clientID: number) {
      const dialogRef = this.dialog.open(PayementByClientComponent, {
        data: { clientID: clientID },
        disableClose: true, // This ensures the dialog closes when clicking outside
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
