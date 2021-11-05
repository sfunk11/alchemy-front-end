import { Component } from '@angular/core';
import { AuthenticationService } from '../app/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alchemyFront';

  constructor(  public authService: AuthenticationService) { }

}
