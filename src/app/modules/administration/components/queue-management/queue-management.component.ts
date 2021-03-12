import { Component, OnInit, Inject, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rms-queue-management',
  templateUrl: './queue-management.component.html',
  styleUrls: ['./queue-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueueManagementModalComponent implements OnInit {
  queueManagementForm: FormGroup;
  @Input() title: string = 'Edit Queue';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() groups: Array<string> = ['1', '2', '3'];
  @Input() selectedGroup: string = '1';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<any>) {
    this.title = data.title;
    this.name = data.name;
    this.groups = data.groups;
    this.selectedGroup = data.selectedGroup;
    this.description = data.description;
  }

  private _createForm() {
    this.queueManagementForm = this.fb.group({
      title: [this.title, [Validators.required]],
      name: [this.name, [Validators.required]],
      description: [this.description, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this._createForm();
  }

  changeGroup(e) {
    this.selectedGroup = e;
  }

  onPressSave() {
    let newQueueData = {
      name: this.queueManagementForm.value.name,
      description: this.queueManagementForm.value.description,
      selectedGroup: this.selectedGroup
    }
    console.log('Here you should dispatch your action with data', newQueueData);
    this.dialogRef.close();
  }
}
