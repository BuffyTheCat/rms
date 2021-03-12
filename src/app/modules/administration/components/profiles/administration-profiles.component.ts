import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetParams, QueuedItemsForQuery, userInfo } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getQueuedItemsForQueryAction, getUserInfoAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-administration-profiles',
  templateUrl: './administration-profiles.component.html',
  styleUrls: ['./administration-profiles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationProfilesComponent implements OnInit {
  items$: Observable<any>;
  activeProvider = 'RMS QA Domain';
  tableData;
  userInfo$: Observable<any>;
  userInfo: userInfo;
  category: string = 'admin'

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

    const getUserInfo: GetParams = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "userId" : "123123132",
      }
    }
    this.store.dispatch(getUserInfoAction(getUserInfo));

    this.userInfo$ = this.store.select(s => s.queue.userInfo);
    this.userInfo$.subscribe(i => {
      this.userInfo = i;
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

  copyTo(event) {
    console.log(event);
  }

  onEdit(row) {
    const data = {
      itemId: row
    } 
    this.router.navigate(['/administration/profiles/create'], {state: data});
  }

  
  onPressProfilesSave() {
    console.log('save profiles');
  }

  displayedColumns = [
    {
      title: 'Profile Name',
      column: 'profileName',
    },
    {
      title: '',
      column: 'edit',
      width: 40,
    }
  ];
}
