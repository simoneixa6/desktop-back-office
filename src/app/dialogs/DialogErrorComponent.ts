import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: 'dialog-error-component.html',
})

export class DialogErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogError) {}
}

export interface DialogError {
  content: string;
}
