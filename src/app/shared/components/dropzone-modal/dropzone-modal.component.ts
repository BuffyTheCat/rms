import { Component, OnInit, Inject, ViewEncapsulation, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rms-dropzone-modal',
  templateUrl: './dropzone-modal.component.html',
  styleUrls: ['./dropzone-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneModalComponent implements OnInit {
  @Input() filename: string;
  files: File[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.filename = this.data.filename;
  }


	onSelect(event) {
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  onApply() {
    this.dialogRef.close({ data: this.files });
  }
}
