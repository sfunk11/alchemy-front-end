import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream

import { User } from '../services/user';
=======
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin/admin.service';
import { User } from '../services/util/user';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ApiService } from '../services/api/api.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

<<<<<<< Updated upstream
  constructor() { }
=======
  userList: User[] = [];

  userGroup = new FormGroup({
    userEmail: new FormControl(''),
    userPW: new FormControl('')
  })

  photoGroup = new FormGroup({
    adminID: new FormControl(''),
    photoID: new FormControl('')
  })

  constructor(
    public adServ:AdminService,
    public authServ: AuthenticationService,
    public apiServ: ApiService) { }
>>>>>>> Stashed changes

  ngOnInit(): void {
  }

<<<<<<< Updated upstream
=======
  public submitUser(user: FormGroup){

    console.log("Adding user " + user);
    let email = user.get("userEmail")?.value;
    let pw = user.get("userPW")?.value;
    this.authServ.SignUp(email, pw);
    
  }

  public updateUser(user: FormGroup){
    console.log("Updating user " + user);
    let email = user.get("userEmail")?.value;
    let pw = user.get("userPW")?.value;
    let dName = user.get("userDisplayName")?.value;
    let pURL = user.get("userPhoto")?.value;
    this.apiServ.updateUserProfile(user);
  }

  public deleteUser(user: FormGroup){
    console.log("Deleting user " + user);
    let email = user.get("userEmail")?.value;
    this.apiServ.deleteUser(user);
  }

  public approve(photo: FormGroup){
    console.log("Deleting photo " + photo);
    let aID = photo.get("adminID")?.value;
    let pID = photo.get("photoID")?.value;
    this.apiServ.approvePhoto(aID, pID)
  }
>>>>>>> Stashed changes
}
