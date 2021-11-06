import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../util/photo';
import { User } from '../util/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase = "http://ec2-52-14-196-156.us-east-2.compute.amazonaws.com:9001";
  // private urlBase = "http://localhost:9001";
  private userUrl = this.urlBase + "/users";
  private photoUrl = this.urlBase + "/photos";
  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http:HttpClient) { }

  public getUserProfile(email:string) : Observable<User>{
    let url = this.userUrl + "/email/" + email;
    return this.http.get<User>(url, this.httpHead);
  }

  public updateUserProfile(user:any): Observable<Object>{
    return this.http.post<String>(this.userUrl, user, this.httpHead);
  }

  public deleteUser(user:any): Observable<Object>{

    return this.http.delete<Object>(user);
  }
  public getAllUsers() : Observable<User[]>{

    return this.http.get<User[]>(this.userUrl, this.httpHead);
  }

  public uploadPhoto(photo: FormData): Observable<any> {
    let httpHead = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post<Object>(this.photoUrl, photo, httpHead);
  }

  public getAllPuzzles(): Observable<Photo[]>{
    return this.http.get<Photo[]>(this.photoUrl, this.httpHead);
  }

  public getAllPhotos(): Observable<Photo[]>{
    let url = this.photoUrl + "/admin";
    return this.http.get<Photo[]>(url, this.httpHead);
  }

  public approvePhoto(adminId:number, photoId:number, ):Observable<any>{
    let url = this.photoUrl + `/admin/approve/${adminId}/${photoId}`
    return this.http.post<Object>(url,this.httpHead)
  }

}
