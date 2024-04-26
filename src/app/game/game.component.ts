import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../firebase-service/game-service.service';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';







@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    PlayerMobileComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {

  game: Game = new Game();
  id: string = "";
  gameOver = false;


  constructor(public dialog: MatDialog, private gameService: GameService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getGameId();
    this.gameService.subGame(this.game, this.id);
  }


  getGameId() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.id = params['id'];
    });
  }


  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // modulo Bsp. 3:3 dann Restwert 0
      this.gameService.saveGame(this.game, this.id);
    }
    setTimeout(() => {
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.gameService.saveGame(this.game, this.id);
    }, 1000);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_image.push('monkey.png');
        this.gameService.saveGame(this.game, this.id);
      }
    });
  }


  editProfile(playerId: number): void {
    const dialogRef = this.dialog.open(EditProfileComponent);
    console.log(playerId);
    dialogRef.afterClosed().subscribe(change => {
      console.log('receive', change);
      if (change) {
        if (change == 'delete') {
          this.game.player_image.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.player_image[playerId] = change;
        }
        this.gameService.saveGame(this.game, this.id);
      }
    });
  }

}