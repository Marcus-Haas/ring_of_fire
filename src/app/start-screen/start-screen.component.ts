import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../firebase-service/game-service.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {


  constructor(private router: Router, private test: GameService) { 
  }

  newGame() {
    this.test.addNewGame();
    // this.router.navigateByUrl('game/' + this.test.gameId);
  }

}
