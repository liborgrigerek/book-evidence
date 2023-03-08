import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBookDialogData } from '../book-dialog-data';

/**
 * Dialog to add a new book or edit existing book.
 * 
 * @author Libor Grigerek
 */

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditBookDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
