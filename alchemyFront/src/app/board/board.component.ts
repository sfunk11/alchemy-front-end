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


// ---------------------------------------   TEST DATA PUZZLE SELECT ---------------------------



  selectedValue = "";
  selectedArray : string[] = [];

  // movies = [
  //   "./assets/"+this.selected+"/img0.jpg",
  //   "./assets/"+this.selected+"/img8.jpg",
  //   "./assets/"+this.selected+"/img5.jpg",
  //   "./assets/"+this.selected+"/img6.jpg",
  //   "./assets/"+this.selected+"/img7.jpg",
  //   "./assets/"+this.selected+"/img4.jpg",
  //   "./assets/"+this.selected+"/img3.jpg",
  //   "./assets/"+this.selected+"/img2.jpg",
  //   "./assets/"+this.selected+"/img1.jpg",
  // ];


objArr =
[
  {
  "catpic" :
  [
    "./assets/catpic/img0.jpg",
    "./assets/catpic/img8.jpg",
    "./assets/catpic/img5.jpg",
    "./assets/catpic/img6.jpg",
    "./assets/catpic/img7.jpg",
    "./assets/catpic/img4.jpg",
    "./assets/catpic/img3.jpg",
    "./assets/catpic/img2.jpg",
    "./assets/catpic/img1.jpg"
   ]
  },

  {
  "earthpic" :
  [
    "./assets/earthpic/img0.jpg",
    "./assets/earthpic/img8.jpg",
    "./assets/earthpic/img5.jpg",
    "./assets/earthpic/img6.jpg",
    "./assets/earthpic/img7.jpg",
    "./assets/earthpic/img4.jpg",
    "./assets/earthpic/img3.jpg",
    "./assets/earthpic/img2.jpg",
    "./assets/earthpic/img1.jpg"
  ]
  }
];

  inOrder =
  [
    "./img0.jpg",
    "./img1.jpg",
    "./img2.jpg",
    "./img3.jpg",
    "./img4.jpg",
    "./img5.jpg",
    "./img6.jpg",
    "./img7.jpg",
    "./img8.jpg",
  ];



  listpics =
  [
    "catpic",
    "naturepic",
    "earthpic",
  ];



//-------------------------    DRAG DROP WITH GAME FUNCTIONALITY -----------------------------
// GAME FUNCTIONALITY COMMENTED OUT BECAUSE TRYING TO LOAD DIFFERENT PUZZLES BASED ON SELECT

  wonGame : boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);


    this.wonGame = arrayEqual(this.selectedArray, this.inOrder);

    console.log(this.selectedArray);
    // console.log(this.movies[0]);
  }




  switchArray(valz: any)
  {
    let optiontext = valz.source.selected.viewValue;
    console.log(optiontext);

    for (let i =0; i < 9; i++)
    {
    //this.selectedArray = this.objArr.${optiontext}[i];
    //this.selectedArray = this.objArr.catpic[i];
    }
    //console.log("check it out  " + valz);
  }



}


function arrayEqual(ary1 : String[], ary2: String[]):boolean
  {

    for (var i = 0; i < ary1.length; i++)
    {
      if (ary1[i] !== ary2[i]) return false;
    }

    return true;
  };
