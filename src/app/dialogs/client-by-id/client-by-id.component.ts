import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PayementByClientComponent } from '../payement-by-client/payement-by-client.component';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from 'src/app/models/Clients.model';
import { ClientDocument } from 'src/app/models/ClientDocument.model';
import { Payement } from 'src/app/models/Payement.model';
import { CredentialByClientComponent } from '../credential-by-client/credential-by-client.component';
import Swal from 'sweetalert2';

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
  
    payement1!: Payement | null;
    payement2!: Payement | null;

    montantTotal1: number = 0;
    montantTotal2: number = 0;

    reste1: number = 0;
    reste2: number = 0;

    nombreTranches1: number = 0;
    nombreTranches2: number = 0;

    role: string = '';

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
      private dialogRef: MatDialogRef<ClientByIdComponent>,
      private clientserv: ClientsService,
      private dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
        this.role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

        this.clientserv.getClientById(this.data.clientID).subscribe({
          next: (data) => {
            this.client = data;
            if (this.client.clientImageUrl) {
              this.client.clientImageUrl = `http://localhost:8082/api/Clients/uploads/${data.clientImageUrl}`;
           }
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
            this.payement1 = paiements[0];
            this.montantTotal1 = this.payement1?.montantaTotal || 0;
          
            this.clientserv.getTranchesByPaiement(this.payement1?.idPayement).subscribe({
              next: (tranches) => {
                this.nombreTranches1 = tranches.length;
                this.clientserv.getResteAPayer(this.payement1?.idPayement).subscribe({
                  next: (reste) => this.reste1 = reste,
                  error: (err) => console.error('Error while fetching remaining amount:', err)
                });
              },
              error: (err) => console.error('Erreur lors du chargement des tranches :', err)
            });
          }
          
          if (paiements.length > 1) {
            this.payement2 = paiements[1];

            this.montantTotal2 = this.payement2?.montantaTotal || 0;
          
            this.clientserv.getTranchesByPaiement(this.payement2?.idPayement).subscribe({
              next: (tranches) => {
                this.nombreTranches2 = tranches.length;
                this.clientserv.getResteAPayer(this.payement2?.idPayement).subscribe({
                  next: (reste) => this.reste2 = reste,
                  error: (err) => console.error('Error while fetching remaining amount:', err)
                });
              },
              error: (err) => console.error('Erreur lors du chargement des tranches :', err)
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
          this.documents = docs.filter(doc => doc.archiveDoc === 'NON_ARCHIVER');
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
  if (!doc || !doc.idDocument) {
    console.error("Document ou ID de document invalide.");
    return;
  }

  // Utiliser la méthode du service qui retourne un Blob
  this.clientserv.downloadFile(doc.idDocument).subscribe({
    next: (blob: Blob) => {
      // Vérifier si le blob a un type que le navigateur peut afficher
      // Les types courants sont 'application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain'
      // Si le type est 'application/octet-stream', l'affichage direct est peu probable
      if (blob.type && blob.type !== 'application/octet-stream') {
        // Créer une URL objet pour le Blob
        const fileURL = URL.createObjectURL(blob);

        // Ouvrir cette URL dans un nouvel onglet
        const newTab = window.open(fileURL, '_blank');

        // Libérer l'URL objet après un court instant (optionnel mais bonne pratique)
        // Cela permet au navigateur de libérer la mémoire associée au blob
        // Le délai est parfois nécessaire pour s'assurer que le navigateur a chargé l'URL
        setTimeout(() => URL.revokeObjectURL(fileURL), 100);


        if (!newTab) {
          alert('Bloqueur de pop-up activé ! Veuillez autoriser les pop-ups pour ce site.');
        }
      } else {
        // Si le type n'est pas affichable ou inconnu, revenir au téléchargement classique
        console.warn(`Le type de fichier '${blob.type}' pourrait ne pas être affichable directement. Tentative de téléchargement...`);
        // Vous pouvez recréer un lien et simuler un clic pour télécharger si nécessaire
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = doc.nom; // Utiliser le nom original du document
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl); // Nettoyer
      }
    },
    error: (err) => {
      console.error('Erreur lors du téléchargement du document pour affichage:', err);
      alert('Impossible de charger le document.'); // Message utilisateur
    }
  });
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

    archiverDocument(doc: ClientDocument): void {
      this.clientserv.archiveDoc(doc.idDocument).subscribe({
        next: () => {
        },
        error: err => console.error('Error:', err)
      });
    }

    confirmArchiverDocument(doc: ClientDocument) {
      Swal.fire({
        title: 'Are you sure you want to archive this document?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, archive it',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.archiverDocument(doc); 
          Swal.fire("document archived", "This document has been archived", "success").then(() => {
            this.loadDocuments(this.data.clientID)
          });
        }
      });
    }
    openPaymenetDialog(clientID: number ,index :number) {
      const dialogRef = this.dialog.open(PayementByClientComponent, {
        data: { clientID: clientID , payementId : index},
        disableClose: true, // This ensures the dialog closes when clicking outside
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadPaiements(this.data.clientID);
          console.log('Dialog closed with result:', result);
        }
      });
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    toggleCredential(clientID: number) {
      const dialogRef = this.dialog.open(CredentialByClientComponent, {
        data: { clientID: clientID },
        disableClose: true, // This ensures the dialog closes when clicking outside
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });
    }

    Archiver(clientID: number) {
          this.clientserv.archiveClient(clientID).subscribe({
            next: (updatedClient) => {
              console.log('Client archived successfully:');
            },
            error: (err) => {
              console.error('Error!!', err);
            }
          });
       }
    
       confirmArchiveBox() {
           Swal.fire({
             title: 'Are you sure you want to archive this client?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonText: 'Yes, archive it',
             cancelButtonText: 'No, keep it'
           }).then((result) => {
             if (result.value) {
               this.Archiver(this.data.clientID); // Activate user
               Swal.fire("client archived", "This client has been archived", "success").then(() => {
                this.closeDialog()
               });
             }
           });
         }

         triggerImageFileInput(): void {
          this.fileInput.nativeElement.click();
        }
      
        onImageFileSelected(event: Event): void {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            this.uploadImage(file);
          }
        }
      
        uploadImage(file: File): void {
          if (!this.data.clientID) return;
      
          this.clientserv.uploadProfileImage(file, this.data.clientID).subscribe({
            next: (imageUrl: string) => {
              console.log("Image uploaded successfully:", imageUrl);
              this.client.clientImageUrl = imageUrl; 
             
            },
            error: (error) => {
              console.error("Error uploading image:", error);
            }
          });
        }
}
