import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Photo } from '../util/photo';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  puzzleData = "";

  puzzleList = [] as Photo[];
  personalPhotoList= [] as Photo[];
  unapprovedPhotos = [] as Photo[];

  constructor(private api: ApiService) { }

  set puzzleName(fileName:string){
    this.puzzleData = fileName.substr(0, fileName.lastIndexOf("."));
  }

  loadPuzzleList(email:string) {
    this.puzzleList=[];
    this.api.getAllPuzzles().subscribe(
      result => {
        for(let i=0; i<result.length; i++){
          if (result[i].approved){
            this.puzzleList.push(result[i])
          }else if (result[i].uploader.email == email){
            this.puzzleList.push(result[i])
          }
        }
        this.puzzleList.forEach(photo => {
          photo.url = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/" + photo.imageFileName;
        });
      }
    )
  }

 loadPersonalPhotoList(email:string) {
  this.personalPhotoList = []
  this.api.getAllPuzzles().subscribe(
    result => {
      for(let i=0; i<result.length; i++){
        if (result[i].uploader.email == email){
          this.personalPhotoList.push(result[i]);
         }
      }
      this.personalPhotoList.forEach(photo => {
        photo.url = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/" + photo.imageFileName;
      });
    })
  }

  loadUnapprovedPhotos() {
    this.unapprovedPhotos=[];
    this.api.getAllPhotos().subscribe(
      res => {

        for(let i=0; i<res.length; i++){
          if(!res[i].approved){
            this.unapprovedPhotos.push(res[i]);
          }
        this.unapprovedPhotos.forEach(photo => {
          photo.url = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/" + photo.imageFileName;
        });
        }
      })
  }
}
