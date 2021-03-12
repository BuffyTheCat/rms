import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'rms-update-all',
  templateUrl: './update-all.component.html',
  styleUrls: ['./update-all.component.scss']
})
export class UpdateAllComponent implements OnInit {
  updateAllForm: FormGroup;

  providerOptions: string[] = ['RMS QA Domain', 'RMS QA Domain 2', 'RMS QA Domain 3'];
  providerSelectedOption: string = 'RMS QA Domain';

  sourceQueueOptions: string[] = ['1', '2', '3'];
  sourceQueueSelectedOption: string = '1';

  currentStatusOptions: string[] = ['Unprocessed', 'Complete', 'Deleted'];
  currentStatusSelectedOption: string = 'Unprocessed';

  newStatusOptions: string[] = ['Unprocessed', 'Complete', 'Deleted'];
  newStatusSelectedOption: string = 'Unprocessed';

  destinationQueueOptions: string[] = ['0St Johns RMS Health System15', '0St Johns RMS Health System16', '0St Johns RMS Health System17'];
  destinationQueueSelectedOption: string = '0St Johns RMS Health System15';

  constructor(private fb: FormBuilder) { }

  private _createForm() {
    this.updateAllForm = this.fb.group({
      provider: ['', [Validators.required]],
      beginDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      sourceQueue: ['', [Validators.required]],
      currentStatus: ['', [Validators.required]],
      newStatus: ['', [Validators.required]],
      destinationQueue: ['', [Validators.required]],
    }, { validator: this.dateRangeValidator })
  }

  get _provider() {
    return this.updateAllForm.get('provider')
  }

  get _beginDate() {
    return this.updateAllForm.get('beginDate')
  }

  get _endDate() {
    return this.updateAllForm.get('endDate')
  }

  get _sourceQueue() {
    return this.updateAllForm.get('sourceQueue')
  }

  get _currentStatus() {
    return this.updateAllForm.get('currentStatus')
  }

  get _newStatus() {
    return this.updateAllForm.get('newStatus')
  }

  get _destinationQueue() {
    return this.updateAllForm.get('destinationQueue')
  }

  ngOnInit(): void {
    this._createForm();
  }
  
  onChangeBeginDate(val) {
    console.log('begin Date', val.target.value);
  }

  onChangeEndDate(val) {
    console.log('end Date', val.target.value);
  }


  onPressUpdate() {
    console.log('update all');
  }

  dateRangeValidator: ValidatorFn = (fg: FormGroup) => {
    let beg = moment(fg.get('beginDate').value);
    let range = moment(beg).add(30, 'days');
    let end = moment(fg.get('endDate').value);
   return moment(end).isBetween(beg, range, null, '[)') 
     ? null 
     : { range: true };
  };
}
