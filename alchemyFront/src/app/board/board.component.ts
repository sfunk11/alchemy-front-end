import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Photo } from '../services/photo';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  private puzzleName:string = history.state.data;
  private movies:string[] = [];
  private basePuzzleUrl = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/"

  constructor(private api:ApiService){}

// compare two arrays one with correct order
// console log drop event and see changes
ngOnInit(): void {
  for (let  i = 0; i<10; i++){
    let puzzleUrl = this.basePuzzleUrl + this.puzzleName + `/${this.puzzleName}_${i}.jpg`
    this.movies.push(puzzleUrl);
  }
}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }



}
