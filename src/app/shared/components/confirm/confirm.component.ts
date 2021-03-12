import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rms-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  question: string = '';
  apply: string = 'Yes';
  cancel: string = 'No';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.question = this.data.question;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

