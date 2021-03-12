import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';

@Component({
  selector: 'rms-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportsComponent implements OnInit {
  reportForm: FormGroup;
  reportasd: string;
  reports: Array<string> = ['Option 1', 'Option 2'];
  @ViewChild('report') report: MatSelect; 
  @ViewChild('dateOfDeposit') dateOfDeposit: FilterDateComponent;
  
  constructor(private fb: FormBuilder) { }

  private _createForm() {
    this.reportForm = this.fb.group({
      dateOfDeposit: ['', [Validators.required]],
      reportType: ['']
    })
  }

  ngOnInit(): void {
    this._createForm();
  }

  get _dateOfDeposit() {
    return this.reportForm.get('dateOfDeposit')
  }

  onSearch() {    
    if (this.reportForm.invalid) {
      return
    } else {
      console.log('On run reports');
    }
  }

  onClear() {
    if (this.reportForm.controls['reportType'].value === 'Option 2') {
      this.dateOfDeposit.reset();
    }
    console.log('clear');
  }
}
