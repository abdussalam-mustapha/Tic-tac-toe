import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from "../square/square.component";
import { BoardService } from '../../service/board/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  constructor(public boardService: BoardService) {}

  ngOnInit(): void {
    // The game state is already loaded in the service constructor
  }

  get squares() {
    return this.boardService.squares;
  }

  get xIsNext() {
    return this.boardService.xIsNext;
  }

  get winner() {
    return this.boardService.winner;
  }

  get player() {
    return this.boardService.player;
  }

  newGame() {
    this.boardService.newGame();
  }

  makeMove(idx: number) {
    this.boardService.makeMove(idx);
  }
}
