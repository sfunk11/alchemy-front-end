import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isAdmin = false;
  constructor( public authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.userData.roleID = 1){
      this.isAdmin= true;
    }
  }

}
