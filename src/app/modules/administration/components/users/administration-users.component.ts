import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getQueuedItemsForQueryAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-administration-users',
  templateUrl: './administration-users.component.html',
  styleUrls: ['./administration-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationUsersComponent implements OnInit {
  items$: Observable<any>;
  activeProvider = 'RMS QA Domain';
  tableData;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    const data = history.state;
    console.log('passed data: ', data);
    
    const getItems: QueuedItemsForQuery = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "queueItemTypeId" : "REMIT_POST",
        "date" : "",
        "requestTicket" : {
          "id" : 3,
          "pageNumber" : 0
        },
        "pageNumber" : 0,
        "lockboxNumber" : "",
        "indexStatus" : "",
        "pageSize" : 25,
        "provider" : "",
        "payerName" : "",
        "showOtherUsersItems" : false,
        "status" : "ALL",
        "batchNumber" : ""
      }
    }
    this.store.dispatch(getQueuedItemsForQueryAction(getItems));
    this.items$ = this.store.select(s => s.queue.items);
    this.items$.subscribe(i => {
      this.tableData = i
    });
  }

  onExport(val) {
    if (val === 'Export all CSV') {
      console.log('Export all CSV');
    } else if (val === 'Export current CSV') {
      console.log('Export current CSV');
    }
  }

  onSelectRow(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`select row indexed as ${index}`);
  }

  onEdit(row) {
    const data = {
      itemId: row
    } 
    this.router.navigate(['/administration/users/create'], {state: data});
  }

  displayedColumns = [
    {
      title: 'Username',
      column: 'userName',
      width: 120,
    },
    {
      title: 'First Name',
      column: 'firstName',
      width: 100,
    },
    {
      title: 'Middle Name',
      column: 'middleName',
      width: 100,
    },
    {
      title: 'Last Name',
      column: 'lastName',
      width: 100,
    },
    {
      title: 'Email Address',
      column: 'emailAddress',
      width: 120,
    },
    {
      title: 'External User',
      column: 'externalUser',
      width: 100,
    },
    {
      title: 'Login Enabled',
      column: 'loginEnabled',
      width: 100,
    },
    {
      title: 'Organization',
      column: 'organization',
      width: 100,
    },
    {
      title: 'Password Expiration',
      column: 'passwordExpiration',
      width: 150,
    },
    {
      title: '',
      column: 'edit',
      width: 40,
    }
  ];
}
