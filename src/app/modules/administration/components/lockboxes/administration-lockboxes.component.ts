import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getQueuedItemsForQueryAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-administration-lockboxes',
  templateUrl: './administration-lockboxes.component.html',
  styleUrls: ['./administration-lockboxes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationLockboxesComponent implements OnInit {
  items$: Observable<any>;
  provider$: Observable<any>;
  tableData;
  activeProvider: string;

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
    this.provider$ = this.store.select(s => s.queue.params.providerSelectedOption);
    this.items$.subscribe(i => {
      this.tableData = i
    }); 
    this.provider$.subscribe(i => {
      this.activeProvider = i
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
    this.router.navigate(['/administration/lockboxes/create'], {state: data});
  }

  onPressCreate() {
    console.log('onPressCreate');
  }

  displayedColumns = [
    {
      title: 'Name',
      column: 'lockboxName',
      width: 100,
    },
    {
      title: 'Bank Identifier',
      column: 'bankIdentifier',
      width: 120,
    },
    {
      title: 'Transit Routing Number',
      column: 'transitRoutingNumber',
      width: 160,
    },
    {
      title: 'Lockbox Number',
      column: 'lockboxNumber',
      width: 110,
    },
    {
      title: 'Street',
      column: 'street',
      width: 100,
    },
    {
      title: 'Additional Street Information',
      column: 'additionalStreetInformation',
      width: 180,
    },
    {
      title: 'City',
      column: 'city',
      width: 100,
    },
    {
      title: 'State',
      column: 'state',
      width: 100,
    },
    {
      title: 'Zip Code',
      column: 'zipCode',
      width: 100,
    },
    {
      title: '',
      column: 'edit',
      width: 40,
    }
  ];
}
