import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Photo } from '../services/util/photo';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  private puzzleName:string = history.state.data;
  public movies:string[] = [];
  private basePuzzleUrl = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/"

  constructor(private api:ApiService){}

// compare two arrays one with correct order
// console log drop event and see changes
ngOnInit(): void {
  for (let  i = 0; i<10; i++){
    let puzzleUrl = this.basePuzzleUrl + this.puzzleName + `/${this.puzzleName}_${i}.jpg`
    this.movies.push(puzzleUrl);

  }
  let m = this.movies.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = this.movies[m];
    this.movies[m] = this.movies[i];
    this.movies[i] = t;
  }
}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }



}
