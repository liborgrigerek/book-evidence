import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteReaderDialogData } from '../reader-dialog-data';

/**
 * Dialog to delete a reader.
 */

@Component({
  selector: 'app-delete-reader',
  templateUrl: './delete-reader.component.html',
  styleUrls: ['./delete-reader.component.scss']
})
export class DeleteReaderComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteReaderDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
