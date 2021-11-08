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
    this.puzzleSelected.emit(this.puzServ.puzzleData);
  }

  ngOnInit(): void {
    this.puzServ.loadPuzzleList(this.auth.userData.email);
    this.puzzleList = this.puzServ.puzzleList;
  }



}
