import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditAuthorDialogData } from '../author-dialog-data';

/**
 * Dialog to add a new author or edit existing author.
 * 
 * @author Libor Grigerek
 */

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EditAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditAuthorDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
