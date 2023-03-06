import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorDialogData } from '../author/author.component';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EditAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
