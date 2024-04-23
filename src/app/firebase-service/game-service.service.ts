import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc, doc, onSnapshot, and } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore);
  game = new Game();
  gameId: string = '';



  constructor(private router: Router, private route: ActivatedRoute) {

  }


  ngOnDestroy(): void {
  }


  async addNewGame() {
    await addDoc(this.getGamesRef(), this.game.toJson())
      .then((docRef) => {
        console.log(docRef.id);
        this.gameId = docRef.id;
        this.router.navigateByUrl('game/' + this.gameId);
      });
  }


  async saveGame(game: Game, id: string) {
    let testdoc = this.getSingleGameRef("games", id);
    await updateDoc(testdoc, game.toJson());
  }

  subGame(game: Game, blablaId: string) {
    return onSnapshot(this.getSingleGameRef("games", blablaId), (ele) => {
      let gameData = ele.data();
      if (gameData) {
        game.players = gameData['players'];
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
