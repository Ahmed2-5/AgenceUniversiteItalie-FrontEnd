import { Component, OnInit } from '@angular/core';
import { ClientDocument } from 'src/app/models/ClientDocument.model';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-archive',
  templateUrl: './doc-archive.component.html',
  styleUrls: ['./doc-archive.component.scss']
})
export class DocArchiveComponent implements OnInit {

  clients: Clients[] = [];
  selectedClientId: number | null = null;
  documents: ClientDocument[] = [];
  searchTerm: string = '';

  editMode: { [key: number]: boolean } = {}; // Object with document id as key and edit mode status as value
    editedName: { [key: number]: string } = {};
  constructor(
        private clientserv: ClientsService
  ){}
    
  ngOnInit(): void {
      this.loadClients();
  }
          
  loadClients() {
      this.clientserv.getAllClients().subscribe({
        next: (data) => {
            this.clients = data.filter(client => client.archive === 'NON_ARCHIVER');
          },
        error: (err) => console.error('Error loading clients', err)
      });
  }
    
  loadDocuments(idClient: number): void {
    this.selectedClientId = idClient;
    this.clientserv.getDocumentsByClient(idClient).subscribe({
      next: (docs) => {
        this.documents = docs.filter(doc => doc.archiveDoc === 'ARCHIVER');
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
      }
    });
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

  closeDialog(){
    this.selectedClientId = null
  }

  deleteDocument(doc: ClientDocument): void {
    this.clientserv.deleteDocument(doc.idDocument).subscribe({
      next: () => {
        this.loadDocuments(this.selectedClientId)
      },
      error: err => console.error('Error deleting document:', err)
    });
  }
  confirmDeleteDocument(doc: ClientDocument) {
    Swal.fire({
      title: 'Are you sure you want to delete this document?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(doc); 
        Swal.fire("document deleted", "This document has been deleted", "success").then(() => {
        });
      }
    });
  }

  unarchiverDocument(doc: ClientDocument): void {
        this.clientserv.unarchiveDoc(doc.idDocument).subscribe({
          next: () => {
            this.documents = this.documents.filter(d => d.idDocument !== doc.idDocument);
          },
          error: err => console.error('Error:', err)
        });
      }
  
      confirmunArchiverDocument(doc: ClientDocument) {
        Swal.fire({
          title: 'Are you sure you want to unarchive this document?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, unarchive it',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.unarchiverDocument(doc); 
            Swal.fire("document unarchived", "This document has been unarchived", "success").then(() => {
            });
          }
        });
      }

      filterClients() {
        const search = this.searchTerm.trim().toLowerCase();
      
        return this.clients.filter(client => {
          const matchesSearch = !search || 
            (client.prenomClient.toLowerCase().startsWith(search) || 
             client.nomClient.toLowerCase().startsWith(search));
      
      
          return matchesSearch;
        });
      }
}
