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

  public user= {} as User;
  constructor(public authService: AuthenticationService, private apiService: ApiService) { }

  public isAdmin = false;
  public showForm = false;

  ngOnInit(): void {
      this.getUser();
      if (this.authService.userData.displayName == ''){
        this.showForm = true;
      }
      this.setAdmin();
  }


  userInfo = new FormGroup({
    userID: new FormControl(0),
    email: new FormControl(''),
    displayName: new FormControl(''),
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    roleID: new FormControl(),
    photoURL: new FormControl(''),
    emailVerified: new FormControl('')
  });

  public submit(userForm: FormGroup){

    userForm.patchValue({email: this.authService.userData.email});

    let stringUserInfo = JSON.stringify(userForm.value);
    this.apiService.updateUserProfile(stringUserInfo).subscribe(
    response => {

        this.user = response as User;
        console.log(this.user);
        this.setAdmin();
        this.showForm= false;
      },
      error =>{
        console.warn("there was an error ", error);
      }
    )
  }

  getUser() {
    this.apiService.getUserProfile(this.authService.userData.email).subscribe (
      res => {
        this.user = res as User;
        this.setAdmin();
      },
      error => {
        console.warn("there was an error ", error);
      }
    )
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  setAdmin() {
    if (this.user.roleID == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  /* Query Selector Functions go Here */

}
