import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getQueuedItemsForQueryAction} from 'src/app/store/main/main.action';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { RemoveModalComponent } from 'src/app/shared/components/remove-modal/remove-modal.component';
import { QueueManagementModalComponent } from '../queue-management/queue-management.component';

@Component({
  selector: 'rms-domains-queues',
  templateUrl: './domains-queues.component.html',
  styleUrls: ['./domains-queues.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationDomainsQueuesComponent implements OnInit {
  items$: Observable<any>;
  activeProvider = 'RMS QA Domain';
  tableData;

  constructor(private store: Store<AppState>, private location: Location, public dialog: MatDialog,) { }

  ngOnInit(): void {
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

  onPressSave() {
    console.log('save');
  }

  onSelectRow(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`select row indexed as ${index}`);
  }

  onPressCancel() {
    this.location.back();
  }

  onEdit(e) {
    let elem = this.tableData.find(el => el.queueItemId === e);
    const dialogRef = this.dialog.open(QueueManagementModalComponent, {
      data: {
        title: 'Edit Queue',
        name: elem.queueName ? elem.queueName : '',
        description: elem.queueDesc ? elem.queueDesc : '',
        groups: elem.queueGroups ? elem.queueGroups : [''],
        selectedGroup: elem.queueSelectedGroup ? elem.queueSelectedGroup : ''
      }
    });
  }

  onPressAdd() {
    const dialogRef = this.dialog.open(QueueManagementModalComponent, {
      data: {
        title: 'Add Queue',
        name: 'My New Queue',
        description: '',
        groups: [''],
        selectedGroup: ''
      }
    });
  }

  onRemove(e) {
    console.log(e);
    
    let sentence = e.queueName.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    };
    sentence = sentence.join(" ");

    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: {
        title: 'Delete Queue',
        question: `Are you sure you want to delete the ${sentence} queues?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Here you should remove item with id', e.queueItemId);
      } else {
        return
      }
    });
  }

  displayedColumns = [
    {
      title: 'Name',
      column: 'queueName',
      width: 485,
    },
    {
      title: 'Description',
      column: 'queueDescription',
      width: 485,
    },
    {
      title: 'Group',
      column: 'queueGroup',
      width: 485,
    },
    {
      title: '',
      column: 'edit',
      width: 40,
    },
    {
      title: '',
      column: 'remove',
      width: 40,
    }
  ];
}
