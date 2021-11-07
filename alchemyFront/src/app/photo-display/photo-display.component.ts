import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { PhotoData } from '../file-upload/photo-data';
import { ApiService } from '../services/api/api.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { PuzzleService } from '../services/puzzle/puzzle.service';
import { Photo } from '../services/util/photo';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['./photo-display.component.css']
})
export class PhotoDisplayComponent implements OnInit {
  personalList= [] as Photo[];
  constructor(private api: ApiService, private puzServ: PuzzleService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loadPersonalList();
    this.populateChecks();
  }

  loadPersonalList(){
    console.log(this.auth.userData);
    this.personalList = [];
    this.puzServ.loadPersonalPhotoList(this.auth.userData.email);
    this.personalList = this.puzServ.personalPhotoList;
    console.log(this.personalList);
  }

  populateChecks() {
    this.personalList.forEach(photo => {
      let checkbox = <HTMLInputElement> document.getElementById(`${photo.id}`);
      if (photo.makePublic == true){
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    })
  }

  togglePublic(target: EventTarget |null) {
    let checkbox = target as HTMLInputElement;
    let photo = this.personalList[checkbox.id as unknown as number]
    if (checkbox.checked) {
      photo.makePublic = true;
    } else {
      photo.makePublic = false;
    }
    this.api.togglePublic(photo, this.auth.userData.email).subscribe(
      res =>{
        console.log(res);
      }
    );
  }

}
