import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { Filter } from '../../interfaces/global-info-interface';

@Component({
  selector: 'rms-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  editForm: FormGroup;
  @Input() title: string = 'Edit';
  @ViewChild('dateOfService') dateOfService:FilterDateComponent;

  firstNameOptions: string[] = ['015', '016', '17'];
  firstNameSelectedOption: string = '015';

  lastNameOptions: string[] = ['015', '016', '17'];
  lastNameSelectedOption: string = '015';

  accountNumberOptions: string[] = ['015', '016', '17'];
  accountNumberSelectedOption: string = '015';

  remitAmountOptions: string[] = ['015', '016', '17'];
  remitAmountSelectedOption: string = '015';

  submittedAmountOptions: string[] = ['015', '016', '17'];
  submittedAmountSelectedOption: string = '015';

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }

  private _createForm() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      accountNumber:  ['', [Validators.required]],
      dateOfService: ['', [Validators.required]],
      remitAmount: ['', [Validators.required]],
      submittedAmount: ['', [Validators.required]],
    })
  }

  get _firstName() {
    return this.editForm.get('firstName')
  }

  get _lastName() {
    return this.editForm.get('lastName')
  }

  get _accountNumber() {
    return this.editForm.get('accountNumber')
  }

  get _dateOfService() {
    return this.editForm.get('dateOfService')
  }

  get _remitAmount() {
    return this.editForm.get('remitAmount')
  }

  get _submittedAmount() {
    return this.editForm.get('submittedAmount')
  }

  ngOnInit(): void {
    this._createForm();
  }

  onPressSave() {
    const editData: Filter = {
      firstName: `${this.editForm.value.firstName}`,
      lastName: `${this.editForm.value.lastName}`,
      accountNumber: `${this.editForm.value.accountNumber}`,
      dateOfService: this.editForm.value.dateOfService,
      remitAmount: `${this.editForm.value.remitAmount}`,
      submittedAmount: `${this.editForm.value.submittedAmount}`,
    }
    console.log('feigning of senting request', editData);
  }

  onChangedateOfService(val) {
    console.log('date of service', val.target.value);
  }
}
