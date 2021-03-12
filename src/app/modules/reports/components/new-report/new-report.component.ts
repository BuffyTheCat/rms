import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {
  reportForm: FormGroup;
  checked: boolean = true;
  params$: Observable<any>;
  params = null;
  filteredOptions: Observable<string[]>;
  passedData = null;
  isDayOfWeek: boolean = false;
  isDayOfMonth: boolean = false;

  shedulerReports = [
    {value: 'previousDate', name: 'Previous Date'},
    {value: 'previousSevenDays', name: 'Previous 7 Days'},
    {value: 'previousThirtyOneDays', name: 'Previous 31 Days'},
    {value: 'monthToDate', name: 'Month to Date'}
  ];
  shedulerReportsWeek = [
    {value: 'everyDay', name: 'Every Day'},
    {value: 'everyWeekday', name: 'Every Weekday'},
    {value: 'selectDayOfWeek', name: 'Select Day of Week'},
    {value: 'selectDayOfMonth', name: 'Select Day of Month'},
  ];
  shedulerReportsDayOfMonth = ['1st','2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
  shedulerReportsHour = [ '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', 'Noon', '1pm', '2px', '3pm', '4pm', '5pm', '6pm', '7pm'];
  shedulerReportsDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
  

  shedulerGrouping = [
    {value: 'type', name: 'Type'},
    {value: 'payment', name: 'Payment'},
    {value: 'payerName', name: 'Payer Name'},
    {value: 'payeeName', name: 'Payee Name'},
    {value: 'post', name: 'Post'},
    {value: 'dateOfDeposit', name: 'Date Of Deposit'},
    {value: 'rmsPayerID', name: 'RMS Payer ID'},
    {value: 'lockboxID', name: 'Lockbox ID'},
    {value: 'check#', name: 'Check #'},
    {value: 'atchID', name: 'Batch ID'},
    {value: 'groupID', name: 'Group ID'},
  ];

  constructor( private store: Store<AppState>, public dialog: MatDialog, private router: Router, private fb: FormBuilder) { }
  
  private _createForm() {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required]],
      enable: null,
      domain: ['', [Validators.required]],
      file: ['', null],
      grouping: ['', null],
      dateOfDeposite: ['', null],
      interval: ['', [Validators.required]],
      dayOfMonth: ['', this.isDayOfMonth ? [Validators.required] : null],
      dayOfWeek: ['', this.isDayOfWeek ? [Validators.required] : null],
      hour: ['', [Validators.required]],
    })
  }

  
  
  

  get _hour() {
    return this.reportForm.get('hour')
  }

  get _domain() {
    return this.reportForm.get('domain')
  }
  get _name() {
    return this.reportForm.get('name')
  }
  get _interval() {
    return this.reportForm.get('interval')
  }
  get _dayOfMonth() {
    return this.reportForm.get('dayOfMonth')
  }
  get _dayOfWeek() {
    return this.reportForm.get('dayOfWeek')
  }


  ngOnInit(): void {
    this._createForm();
    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i;
    })

    this.filteredOptions = this.reportForm.controls['domain'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    if (history.state.item) {
      this.passedData = history.state.item;
      console.log('passed data:', this.passedData);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.params.provider.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }




  onSave() {
    console.log('save');
  }

  onCancel() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        question: 'Your changes will not be saved. Continue?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/reports/report-scheduler']);
      } else {
        return
      }
    });
  }

  onChangeInterval(val) {
    if ( val === 'selectDayOfWeek') {
      this.isDayOfWeek = true;
      this.isDayOfMonth = false;
    } else if ( val === 'selectDayOfMonth' ) {
      this.isDayOfWeek = false;
      this.isDayOfMonth = true;
    } else {
      this.isDayOfWeek = false;
      this.isDayOfMonth = false;
    }
  }
}
