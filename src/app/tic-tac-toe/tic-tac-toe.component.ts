import { Component } from '@angular/core';

type Player = 'X' | 'O';
type Cell = Player | null;

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css',
})
export class TicTacToeComponent {
  readonly cells = Array.from({ length: 9 }, (_, index) => index);
  board: Cell[] = Array(9).fill(null);
  currentPlayer: Player = 'X';
  winner: Player | null = null;
  isDraw = false;
  winningCells: number[] = [];

  private readonly winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  makeMove(index: number): void {
    if (this.board[index] || this.winner || this.isDraw) {
      return;
    }

    this.board[index] = this.currentPlayer;

    if (this.checkWinner()) {
      return;
    }

    if (this.checkDraw()) {
      return;
    }

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner(): boolean {
    for (const combination of this.winningCombinations) {
      const [first, second, third] = combination;
      const symbol = this.board[first];

      if (symbol && symbol === this.board[second] && symbol === this.board[third]) {
        this.winner = symbol;
        this.winningCells = combination;
        return true;
      }
    }

    return false;
  }

  checkDraw(): boolean {
    this.isDraw = this.board.every((cell) => cell !== null);
    return this.isDraw;
  }

  resetGame(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
    this.winningCells = [];
  }

  isWinningCell(index: number): boolean {
    return this.winningCells.includes(index);
  }

  statusMessage(): string {
    if (this.winner) {
      return `Player ${this.winner} Wins!`;
    }

    if (this.isDraw) {
      return "It's a Draw!";
    }

    return `Player ${this.currentPlayer}'s Turn`;
  }
}
