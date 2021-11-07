import { Component, OnInit } from '@angular/core';
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
  }

  loadPersonalList(){
    console.log(this.auth.userData);
    this.personalList = [];
    this.puzServ.loadPersonalPhotoList(this.auth.userData.email);
    this.personalList = this.puzServ.personalPhotoList;
    console.log(this.personalList);
  }


}
