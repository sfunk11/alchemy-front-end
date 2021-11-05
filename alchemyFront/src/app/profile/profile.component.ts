import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ApiService } from '../services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../services/util/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthenticationService, private apiService: ApiService) { }

  ngOnInit(): void {

  }
  // public user:User;

  userInfo = new FormGroup({
    userID: new FormControl(0),
    email: new FormControl(''),
    displayName: new FormControl(''),
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    roleID: new FormControl(1),
    photoURL: new FormControl(''),
    emailVerified: new FormControl('')
  });

  public submit(userForm: FormGroup){

    userForm.patchValue({email: this.authService.userData.email});

    let stringUserInfo = JSON.stringify(userForm.value);
    this.apiService.updateUserProfile(stringUserInfo).subscribe(
    response => {
        console.log(response);
      },
      error =>{
        console.warn("there was an error ", error);
      }
    )
  }



  /* Query Selector Functions go Here */

}
