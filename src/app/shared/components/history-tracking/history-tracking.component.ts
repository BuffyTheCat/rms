import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'rms-history-tracking',
  templateUrl: './history-tracking.component.html',
  styleUrls: ['./history-tracking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryTrackingComponent implements OnInit {
  filterForm: FormGroup;
  dataSource;
  tableDataResult;
  displayedColumnsArray;

  patientAccountNumberOptions: string[] = ['924576', '9245761', '9245762'];
  
  firstNameOptions: string[] = ['John', 'Stanley'];
  
  lastNameOptions: string[] = ['Travolta', 'Ipkiss'];

  providerOptions: string[] = ['RMS QA Domain', 'RMS QA Domain 2', 'RMS QA Domain 3'];
  
  @ViewChild('perfectScrollHistory') perfectScrollHistory: PerfectScrollbarComponent;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  

  private _createForm() {
    this.filterForm = this.fb.group({
      patientAccountNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dataOfService: ['', [Validators.required]],
      provider: ['', [Validators.required]],
    })
  }

  get _patientAccountNumber() {
    return this.filterForm.get('patientAccountNumber')
  }

  get _firstName() {
    return this.filterForm.get('firstName')
  }
  
  get _lastName() {
    return this.filterForm.get('lastName')
  }

  get _dataOfService() {
    return this.filterForm.get('dataOfService')
  }

  get _provider() {
    return this.filterForm.get('provider')
  }

  ngOnInit(): void {
    this.tableDataResult = this.data.map((item) => {
      return {
        ...item,
        dateOfService: moment(item.dateOfService).format('DD/MM/YYYY')
      }
    })
    this._createForm();
    this.displayedColumnsArray = this.displayedColumnsResult.map((item) => item.column);
    this.dataSource = new MatTableDataSource(this.tableDataResult);

    setTimeout(() => {
      this.perfectScrollHistory.directiveRef.update();
    }, 500);
  }

  onPressSave() {
    console.log('onPressSave');
  }
  
  onFilterClear() {
    console.log('onFilterClear');
  }

  onPressFinish() {
    console.log('onPressFinish');
  }
  
  onHistoryTrackingClear() {
    console.log('onHistoryTrackingClear');
  }

  displayedColumnsResult = [
    {
      title: 'Patient Account',
      column: 'patientAccountNumber',
      width: 100,
    },
    {
      title: 'Data Of Service',
      column: 'dateOfService',
      width: 100,
    },
    {
      title: 'Name',
      column: 'firstName',
      width: 100,
    },
    {
      title: 'Submitted Amount',
      column: 'submittedAmount',
      width: 100,
    }
  ];
}
