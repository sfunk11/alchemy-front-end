import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  puzzleData = "";

  constructor() { }

  get puzzleName():string{
    return this.puzzleData;

  }

  set puzzleName(fileName:string){
    this.puzzleData = fileName.substr(0, fileName.lastIndexOf("."));
  }
}
