import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ApiService } from '../services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthenticationService, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  userInfo = new FormGroup({
    email: new FormControl(''),
    displayName: new FormControl(''),
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    photoURL: new FormControl(''),
    emailVerified: new FormControl('')
  });

  public submit(user: FormGroup){
    let stringUserInfo = JSON.stringify(user.value);
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
