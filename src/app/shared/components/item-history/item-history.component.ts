import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'rms-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemHistoryComponent implements OnInit {
  filterForm: FormGroup;
  dataSource;
  tableDataResult;
  displayedColumnsArray;
  
  @ViewChild('perfectScrollHistory') perfectScrollHistory: PerfectScrollbarComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.tableDataResult = this.data.map((item) => {
      return {
        ...item      
      }
    })
    this.displayedColumnsArray = this.displayedColumnsResult.map((item) => item.column);
    this.dataSource = new MatTableDataSource(this.tableDataResult);

    setTimeout(() => {
      this.perfectScrollHistory.directiveRef.update();
    }, 500);
  }
  
  onHistoryTrackingClose() {
    this.dialogRef.close();
  }

  displayedColumnsResult = [
    {
      title: 'Time (CST)',
      column: 'time',
      width: 100,
    },
    {
      title: 'User',
      column: 'userName',
      width: 100,
    },
    {
      title: 'Change',
      column: 'change',
      width: 100,
    },
  ];
}
