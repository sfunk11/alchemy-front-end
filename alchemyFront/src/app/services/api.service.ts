import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photo';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase = "http://localhost:9001";
  private userUrl = this.urlBase + "/user";
  private photoUrl = this.urlBase + "/photo";
  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http:HttpClient) { }

  public getUserProfile(username:string) : Observable<User>{
    let url = this.userUrl + `/${username}`;
    return this.http.get<User>(url, this.httpHead);
  }

  public updateUserProfile(user:any): Observable<Object>{

    return this.http.post<Object>(this.userUrl, user, this.httpHead);
  }
  public getAllUsers() : Observable<User[]>{

    return this.http.get<User[]>(this.userUrl, this.httpHead);
  }

  public uploadPhoto(photo: any): Observable<any> {

    return this.http.post<Object>(this.photoUrl, this.httpHead);
  }

  // public getPuzzle(photoId:number): Observable<Photo[]>{


  // }
}
