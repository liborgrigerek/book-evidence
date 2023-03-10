import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteRentedBookDialogData } from '../rented-book-dialog-data';

/**
 * Dialog to delete an rented book.
 */

@Component({
  selector: 'app-delete-rented-book',
  templateUrl: './delete-rented-book.component.html',
  styleUrls: ['./delete-rented-book.component.scss']
})
export class DeleteRentedBookComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteRentedBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteRentedBookDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
