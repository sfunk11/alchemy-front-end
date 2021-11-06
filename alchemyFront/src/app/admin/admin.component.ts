import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin/admin.service';
import { User } from '../services/util/user';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ApiService } from '../services/api/api.service';
import { Photo } from '../services/util/photo';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
    public adServ:AdminService,
    public authServ: AuthenticationService,
    public apiServ: ApiService) { }


  ngOnInit(): void {
    this.apiServ.getAllPhotos().subscribe(
      res => {

        for(let i=0; i<res.length; i++){
          if(!res[i].isApproved){
            this.photoList.push(res[i]);
          }
        this.photoList.forEach(photo => {
          photo.url = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/" + photo.imageFileName;
        });

        }
      }
    )
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
