import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Photo } from '../services/util/photo';
import { ApiService } from '../services/api/api.service';
import { PuzzleService } from '../services/puzzle/puzzle.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  // your a wiener!
  wonGame : boolean = false;
  private puzzleName:string = '';
  puzzleList = [] as Photo[];
  puzzleExists = false;
  // ordered array of pics
  public movies:string[] = [];
  // disordered array of pics
  public moviesRand:string[] = [];
  // root directory of images?
  private basePuzzleUrl = "https://puzzle-alchemy-pieces.s3.us-east-2.amazonaws.com/"

  // dependent on api service to fetch image slices
  constructor(private api:ApiService, private puzzle:PuzzleService, private auth:AuthenticationService){}
 // neat trick


ngOnInit(): void
{
  this.puzzleName = this.puzzle.puzzleData;
  if (this.puzzleName != "" || this.puzzleName == undefined){
    this.createPuzzleBoard(this.puzzleName);
  }
}
puzzleEventTriggered(puzzle:string){
  this.createPuzzleBoard(puzzle);
  this.wonGame= false;
}

createPuzzleBoard(puzzleName:string){
  this.movies = [];
  this.moviesRand =[];
  this.puzzleExists = true;
  for (let  i = 0; i<10; i++)
  {
    // concat to get each image slice from bucket url, nice!
    let puzzleUrl = this.basePuzzleUrl + puzzleName + `/${puzzleName}_${i}.jpg`
    // this array is already in order
    this.movies.push(puzzleUrl);
  }

  // copy over all images to Random Array
  for (let  i = 0; i<10; i++)
  {
    this.moviesRand[i] = this.movies[i];
  }

  // wow wierd to look at this variable declarations
  let m = this.movies.length, t, i;

  // While there remain elements to shuffle
  while (m)
  {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = this.moviesRand[m];
    this.moviesRand[m] = this.moviesRand[i];
    this.moviesRand[i] = t;
  }
}

  drop(event: CdkDragDrop<string[]>)
  {
    // swap picture slice positions on board
    moveItemInArray(this.moviesRand, event.previousIndex, event.currentIndex);
    // call puzzle solved function
    this.wonGame = arrayEqual(this.moviesRand, this.movies);

    // console.log(event.previousContainer);
    // console.log(event.currentIndex);
    // console.log(this.moviesRand[0])

  }



  // gets value of selected drop down menu
  switchArray(valz: any)
  {
    let optiontext = valz.source.selected.viewValue;
    console.log(optiontext);

    for (let i =0; i < 10; i++)
    {
    //this.selectedArray = this.objArr.${optiontext}[i];
    //this.selectedArray = this.objArr.catpic[i];
    }
    //console.log("check it out  " + valz);
  }



}

// comnpare array in order vs random order on puzzle board
function arrayEqual(ary1 : String[], ary2: String[]):boolean
  {

    for (var i = 0; i < ary1.length; i++)
    {
      if (ary1[i] !== ary2[i]) return false;
    }

    return true;
  };
