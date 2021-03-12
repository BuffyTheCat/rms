import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {
  selectOption = ['setting', 'setting 2', 'setting 3']
  shedulerReports = [
    {value: 'prevWholeMonth', name: 'Previous whole month'},
    {value: 'value2', name: 'Value 2'},
    {value: 'value3', name: 'Value 3'}
  ];

  filterItems = ['ERA', 'CORR', 'EOBL', 'PatPay', 'EFS']

  reportsControl = new FormControl(this.shedulerReports[0].value);

  constructor() { }

  ngOnInit(): void {
  }

}
