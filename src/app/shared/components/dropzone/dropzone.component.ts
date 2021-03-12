import { Component, OnInit, Inject, ViewEncapsulation, Input, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropzoneModalComponent } from '../dropzone-modal/dropzone-modal.component';

@Component({
  selector: 'rms-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {
  @Input() title: string;
  files: File[] = [];
  constructor(public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
  }

  getFile() {
    return this.files[0];
  }
  
  onChange() {
    const dialogRef = this.dialog.open(DropzoneModalComponent, {
      data: {
        filename: this.title
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.files = result.data;
      } else {
        return
      }
    });
  }
}
