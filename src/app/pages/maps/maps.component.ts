import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {

 selectedFile: File | null = null;
uploadMessage: string = '';

constructor(private uploadService: UserService) {}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadImage() {
  if (!this.selectedFile) {
    this.uploadMessage = "Please select a file first.";
    return;
  }

  const userId = 1; // Replace with the actual user ID
  this.uploadService.uploadProfileImage(this.selectedFile,8).subscribe({
    next: (response) => {
      this.uploadMessage = response;
    },
    error: (error) => {
      this.uploadMessage = error.message;
    }
  });
}

}
