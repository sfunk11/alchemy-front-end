import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { PuzzleService } from '../services/puzzle/puzzle.service';
import { Photo } from '../services/util/photo';

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.css']
})
export class PuzzleSelectorComponent implements OnInit {
  puzzleList = [] as Photo[];
  selectedPuzzle = {} as Photo;
  constructor(private api:ApiService, private auth:AuthenticationService, private puzServ:PuzzleService) { }

  @Output()
  puzzleSelected= new EventEmitter<string>();

  onPuzzleSelect(puzzle:string){
    console.log("puzzle selected: " + puzzle);
    this.puzServ.puzzleName = puzzle;
    this.puzzleSelected.emit(this.puzServ.puzzleName);
  }

  ngOnInit(): void {
    this.loadPuzzleList();
  }


  loadPuzzleList() {
    this.api.getAllPuzzles().subscribe(
      result => {
        console.log(result);
        for(let i=0; i<result.length; i++){
          if (result[i].approved){
            this.puzzleList.push(result[i])
          }else if (result[i].uploader.email == this.auth.userData.email){
            this.puzzleList.push(result[i])
          }
        }
        console.log(this.puzzleList);
      }
    )
  }


}
