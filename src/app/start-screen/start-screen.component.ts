import { Component } from '@angular/core';
import { GameService } from '../firebase-service/game-service.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {


  constructor(private gameService: GameService) { 
  }

  newGame() {
    this.gameService.addNewGame();
  }

}
