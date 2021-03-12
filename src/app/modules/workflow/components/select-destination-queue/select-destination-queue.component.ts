import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'rms-select-destination-queue',
  templateUrl: './select-destination-queue.component.html',
  styleUrls: ['./select-destination-queue.component.scss']
})
export class SelectDestinationQueueComponent implements OnInit {
  selectDestinationQueueForm: FormGroup;

  selectDomainOptions: string[] = ['RMS QA Domain', 'RMS QA Domain 2', 'RMS QA Domain 3'];

  selectQueueOptions: string[] = ['Supervisor', 'Test Correspondence Default'];

  constructor(private fb: FormBuilder) { }

  private _createForm() {
    this.selectDestinationQueueForm = this.fb.group({
      selectDomain: ['', [Validators.required]],
      selectQueue: ['', [Validators.required]]
    })
  }

  get _selectDomain() {
    return this.selectDestinationQueueForm.get('selectDomain')
  }

  get _selectQueue() {
    return this.selectDestinationQueueForm.get('selectQueue')
  }

  ngOnInit(): void {
    this._createForm();
  }

  onPressSave() {
    //update all
    console.log('Save');
  }
}
