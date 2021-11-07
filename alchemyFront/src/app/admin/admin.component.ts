import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ApiService } from '../services/api/api.service';
import { Photo } from '../services/util/photo';
import { PuzzleService } from '../services/puzzle/puzzle.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAdmin = this.authServ.userData.roleID
  photoList= [] as Photo[];

  userGroup = new FormGroup({
    userEmail: new FormControl(''),
    userPW: new FormControl('')
  })

  updateGroup = new FormGroup({
    email: new FormControl(""),
    firstName : new FormControl(""),
    lastName: new FormControl(""),
    displayName: new FormControl(""),
  })

  photoGroup = new FormGroup({
    adminID: new FormControl(''),
    photoID: new FormControl('')
  })

  constructor(
    public authServ: AuthenticationService,
    public apiServ: ApiService,
    public puzServ: PuzzleService) { }


  ngOnInit(): void {
    this.puzServ.loadUnapprovedPhotos();
    this.photoList = this.puzServ.unapprovedPhotos;
  }

  public submitUser(user: FormGroup){

    let email = user.get("userEmail")?.value;
    let pw = user.get("userPW")?.value;
    this.authServ.SignUp(email, pw);

  }

  public updateUser(user: FormGroup){
    let stringUserInfo = JSON.stringify(user.value);
    this.apiServ.updateUserProfile(stringUserInfo).subscribe(
      res => {
        window.alert("User has been updated.");
      }
    );
  }

public deletePhoto(id:any){
  let aID = this.authServ.userData.userID;
  let pID = id as number;
  this.apiServ.deletePhoto(aID, pID).subscribe(
    res =>{
      this.photoList.forEach((photo,index) =>{
        if(photo.id==pID) this.photoList.splice(index,1);
      })
    }
  )
}


public approvePhoto(id:any){
  let aID = this.authServ.userData.userID;
  let pID = id as number;
  this.apiServ.approvePhoto(aID, pID).subscribe(
    res =>{
      this.photoList.forEach((photo,index) =>{
        if(photo.id==pID) this.photoList.splice(index,1);
      })
    }
  );
}

}
