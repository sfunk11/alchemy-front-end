import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  constructor(private apiService:ApiService, private authService:AuthenticationService) { }

  photoGroup = new FormGroup({
    title: new FormControl(""),
    description: new FormControl("") ,
    fileName: new FormControl(""),
    uploader: new FormControl("")
  })
  file: File = {} as File;

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
}
  public uploadPhoto(photo:FormGroup){

    this.photoGroup.patchValue({uploader: this.authService.userData.email})
    let formData = new FormData();
    formData.append("file", this.file, this.photoGroup.get("fileName")!.value);
    formData.append("title", this.photoGroup.get("title")!.value);
    formData.append("description", this.photoGroup.get("description")!.value);
    formData.append("fileName", this.photoGroup.get("fileName")!.value);
    formData.append("uploader", this.photoGroup.get("uploader")!.value);
    this.apiService.uploadPhoto(formData).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
