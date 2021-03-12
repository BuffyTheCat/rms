import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'rms-report-scheduler',
  templateUrl: './report-scheduler.component.html',
  styleUrls: ['./report-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportSchedulerComponent implements OnInit {
  reportData;
  displayedColumnsArray;
  shedulerReports = [
    {value: 'checkDetails', name: 'Check Details'},
    {value: 'select', name: 'Select New Report'},
    {value: 'value3', name: 'Value 3'}
  ];

  reportsControl = new FormControl(this.shedulerReports[0].value);
  constructor(public dialog: MatDialog, private router: Router,) { }

  ngOnInit(): void {
    this.displayedColumnsArray = this.displayedColumns.map((item) => item.column);
    this.reportData = new MatTableDataSource(this.tableData);
  }

  onEdit(row) {
    const data = {
      item: row
    } 
    this.router.navigate(['/reports/report-scheduler/create'], {state: data});
    
  }

  onSelect(val) {
    if ( val === 'select') {
      this.router.navigate(['/reports/report-scheduler/create']);
    }
  }


  tableData = [
    {
      report: 'Check Details',
      reportName: 'Report 1',
      interval: 'Monthly on the 15th at 10am',
      running: 'Yes'
    },
    {
      report: 'Check Details',
      reportName: 'Report 2',
      interval: 'Monthly on the 15th at 10am',
      running: 'Yes'
    }
  ]

  displayedColumns = [
    {
      title: 'Report',
      column: 'report'
    },
    {
      title: 'Report Name',
      column: 'reportName'
    },
    {
      title: 'Interval',
      column: 'interval'
    },
    {
      title: 'Running',
      column: 'running'
    },
    {
      title: 'Edit',
      column: 'edit'
    }
  ]

}
