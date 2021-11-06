import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { NgModule } from '@angular/core';
import { Photo } from '../services/util/photo';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { PhotoData } from './photo-data';
import { FormControl, FormGroup} from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {



//--------------------   PHOTO FILE UPLOAD STUFF //--------------------


 // Inject service 
 constructor(private fileUploadService: FileUploadService ) { }

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | undefined; // Variable to store file


  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      this.fileUploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;

                  this.loading = false; // Flag variable 
              }
          }
      );
  }




//--------------------   PHOTO INFO BINDING STUFF //--------------------

PhotoInformation = new FormControl('');

// just to know how
photodata1 : PhotoData = new PhotoData("this is my cat", "catpic1", "joe@gmail.com");


photoDescript : string = "";
photoEmail : string = "";
photoName : string = "";

temp : string = "";


onSubmit()
{


console.log(this.photoDescript);
this.temp = this.photoName;

console.log(this.temp);

}

photodata2 : PhotoData = new PhotoData(this.photoDescript, this.photoName, this.photoEmail);

// dont know how to use these from here










}