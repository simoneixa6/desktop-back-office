import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './DialogConfirmDelete.html',
})

export class DialogConfirmDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>) {
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
