import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  movies = [
    "./assets/img0.jpg",
    "./assets/img8.jpg",
    "./assets/img5.jpg",
    "./assets/img6.jpg",
    "./assets/img7.jpg",
    "./assets/img4.jpg",
    "./assets/img3.jpg",
    "./assets/img2.jpg",
    "./assets/img1.jpg",
  ];
  
// compare two arrays one with correct order
// console log drop event and see changes 

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
