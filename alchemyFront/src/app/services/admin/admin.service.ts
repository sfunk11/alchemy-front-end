import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../util/user';
import { AuthenticationService } from '../auth/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../api/api.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

private urlBase = "http://ec2-52-14-196-156.us-east-2.compute.amazonaws.com:9001";
 
private userUrl = this.urlBase + "/users";

private httpHead = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
    })
}

    constructor(
        private authService: AuthenticationService,
        private apiServ: ApiService,
        private http: HttpClient
      ){ }

}