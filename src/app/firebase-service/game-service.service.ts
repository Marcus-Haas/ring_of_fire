import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore);
  game = new Game();
  gameId: string = "";


  constructor(private router: Router) { }


  async addNewGame() {
    await addDoc(this.getGamesRef(), this.game.toJson())
      .then((docRef) => {
        console.log(docRef.id);
        this.gameId = docRef.id;
        this.router.navigateByUrl('game/' + this.gameId);
      });
  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }
}
