import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore);
  game = new Game();


  constructor(private router: Router) { }


  async addNewGame() {
    await addDoc(this.getGamesRef(), this.game.toJson())
      .then((docRef) => {
        console.log(docRef.id);
        this.router.navigateByUrl('game/' + docRef.id);
      });
  }


  async saveGame(game: Game, id: string) {
    let testdoc = this.getSingleGameRef("games", id);
    await updateDoc(testdoc, game.toJson());
  }


  subGame(game: Game, id: string) {
    return onSnapshot(this.getSingleGameRef("games", id), (ele) => {
      let gameData = ele.data();
      if (gameData) {
        game.players = gameData['players'];
        game.stack = gameData['stack'];
        game.playedCards = gameData['playedCards'];
        game.currentPlayer = gameData['currentPlayer'];
        game.currentCard = gameData['currentCard'];
        game.pickCardAnimation = gameData['pickCardAnimation'];
        game.player_image = gameData['player_image'];
      }
    });
  }


  getGamesRef() {
    return collection(this.firestore, "games");
  }


  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


}
