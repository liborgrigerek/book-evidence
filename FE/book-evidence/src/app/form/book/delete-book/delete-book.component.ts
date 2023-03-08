import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteBookDialogData } from '../book-dialog-data';

/**
 * Dialog to delete an author.
 */

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteBookDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
