import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { UserService } from 'src/app/services/user.service';
=======
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
<<<<<<< HEAD
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
=======
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   }
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

}
