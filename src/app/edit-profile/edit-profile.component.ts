import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';




@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatDialogClose,
    MatDialogActions,
    MatButtonModule,
    MatDialogContent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  allProfilePictures = ['monkey.png', 'pinguin.svg', 'toucan.svg', 'owl.png', 'cat.svg', 'dog.svg', 'shark.svg',
    'elephant.svg', 'kangaroo.svg',];

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>) { }

}
