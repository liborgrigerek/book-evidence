import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditRentedBookDialogData } from '../rented-book-dialog-data';

/**
 * Dialog to add a new rented book or edit existing rented book.
 * 
 * @author Libor Grigerek
 */

@Component({
  selector: 'app-edit-rented-book',
  templateUrl: './edit-rented-book.component.html',
  styleUrls: ['./edit-rented-book.component.scss']
})
export class EditRentedBookComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EditRentedBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditRentedBookDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
