import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, onSnapshot, doc, collectionData, getDoc, addDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';







@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {

  // firestore: Firestore = inject(Firestore);

  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = '';
  lalala: object = [];
  id: string = "";


  // testAddGame() {
  //   addDoc(collection(this.firestore, "games"), this.game.toJson());
  // }


  // testRead() {
  //   this.lalala = onSnapshot(collection(this.firestore, "games"), (x) => {
  //     x.forEach(element => {
  //       console.log(element.id);
  //     })
  //   });
  // }

  // getSingleDocRef(colId: string, docId: string) {
  //   return doc(collection(this.firestore, colId), docId);
  // }




  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newGame();
    // this.route.params.subscribe((params) => {
    //   console.log(params['id']);
    //   this.id = params['id'];
    // })
    // this.testRead();
    // this.testAddGame();
    // this.singleGameTest();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  // singleGameTest() {
  //   this.lalala = onSnapshot(this.getSingleDocRef("games", this.id), (element: any) => {
  //     console.log(element.data());
  //     this.game.players = element.players;
  //     this.game.currentPlayer = element.currentPlayer;
  //     this.game.stack = element.stack;
  //     this.game.playedCards = element.playedCards;
  //   });
  // }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // modulo Bsp. 3:3 dann Restwert 0
    }
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }



}

