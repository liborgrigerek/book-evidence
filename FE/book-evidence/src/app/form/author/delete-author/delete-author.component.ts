import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteAuthorDialogData } from '../author-dialog-data';

/**
 * Dialog to delete an author.
 */

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.scss']
})
export class DeleteAuthorComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteAuthorDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
