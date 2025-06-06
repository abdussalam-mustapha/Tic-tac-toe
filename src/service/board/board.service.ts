import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly STORAGE_KEY = 'tic-tac-toe-game';
  
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string | null = null;

  constructor(private localStorageService: LocalStorageService) {
    this.loadGame();
  }

  get player() {
    return this.xIsNext ? 'O' : 'X';
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.saveGame();
  }

  makeMove(idx: number): void {
    if (!this.squares[idx] && !this.winner) {
      this.squares[idx] = this.player;
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
      this.saveGame();
    }
  }

  calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }

    return null;
  }

  private saveGame(): void {
    this.localStorageService.save(this.STORAGE_KEY, {
      squares: this.squares,
      xIsNext: this.xIsNext,
      winner: this.winner
    });
  }

  private loadGame(): void {
    const saved = this.localStorageService.load<{
      squares: any[],
      xIsNext: boolean,
      winner: string | null
    }>(this.STORAGE_KEY);

    if (saved) {
      this.squares = saved.squares;
      this.xIsNext = saved.xIsNext;
      this.winner = saved.winner;
    } else {
      this.newGame();
    }
  }
}
