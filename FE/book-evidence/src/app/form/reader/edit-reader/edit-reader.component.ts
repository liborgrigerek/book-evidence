import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditReaderDialogData } from '../reader-dialog-data';

/**
 * Dialog to add a new reader or edit existing reader.
 * 
 * @author Libor Grigerek
 */

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.scss']
})
export class EditReaderComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EditReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditReaderDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
