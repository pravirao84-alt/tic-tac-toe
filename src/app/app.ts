import { Component } from '@angular/core';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

@Component({
  selector: 'app-root',
  imports: [TicTacToeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
