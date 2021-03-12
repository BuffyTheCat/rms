import { Component, OnInit, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { getQueuedItemsForQueryAction, UpdateQueueItemStatusAndQueueIdAction, getNotesForDocumentAction, getQueueItemHistoryAction, getParamsAction } from 'src/app/store/main/main.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { QueuedItemsForQuery, UpdateQueueItemStatusAndQueueId, getQueuedItemsForQuery, getNotesForDocument, getQueueItemHistory, GetParams } from 'src/app/shared/interfaces/queued-items-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-workflow-correspondence',
  templateUrl: './workflow-correspondence.component.html',
  styleUrls: ['./workflow-correspondence.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowCorrespondenceComponent implements OnInit {
  filterForm: FormGroup;
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];
  totalAmount: string = '3135.65';
  imgPath: Array<string> = ['../../../../../assets/icons/image-viewer.png', '../../../../../assets/icons/image-viewer2.png'];
  @ViewChild('dateOfDeposit') dateOfDeposit:FilterDateComponent;
  items$: Observable<any>;
  params$: Observable<any>;
  tableData;
  params;

  searchOptionBatchNumber: string = 'Is';
  searchOptionProvider: string = 'Is';
  searchOptionLockbox: string = 'Is';
  searchOptionStatus: string = 'Is';
  searchOptionQueue: string = 'Is';
  searchOptionPayer: string = 'Is';
  searchOptionDestinationQueues: string = 'Is';

  constructor(private fb: FormBuilder, private renderer: Renderer2, private store: Store<AppState>) {

  }

  onCompleteDocument() {
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

    const updateStatus: UpdateQueueItemStatusAndQueueId = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "updateQueueItemStatusAndQueueId",
      "params" : {
        "queueItemId" : 1163,
        "status" : "COMPLETED",
      }
    }

    this.store.dispatch(UpdateQueueItemStatusAndQueueIdAction(updateStatus));
    this.store.dispatch(getQueuedItemsForQueryAction(getItems));
    console.log('onCompleteDocument');
  }
  onHoldDocument() {
    const getItems: QueuedItemsForQuery = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "queueItemTypeId" : "REMIT_POST",
        "date" : "",
        "requestTicket" : {
          "id" : 2,
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

    const updateStatus: UpdateQueueItemStatusAndQueueId = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "updateQueueItemStatusAndQueueId",
      "params" : {
        "queueItemId" : 1163,
        "status" : "HOLD"
      }
    }

    this.store.dispatch(UpdateQueueItemStatusAndQueueIdAction(updateStatus));
    this.store.dispatch(getQueuedItemsForQueryAction(getItems));
    console.log('onHoldDocument');
  }
  onDeliteDocument() {
    const getItems: QueuedItemsForQuery = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "queueItemTypeId" : "REMIT_POST",
        "date" : "",
        "requestTicket" : {
          "id" : 4,
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

    const updateStatus: UpdateQueueItemStatusAndQueueId = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "updateQueueItemStatusAndQueueId",
      "params" : {
        "queueItemId" : 1170,
        "status" : "DELETED"
      }
    }

    this.store.dispatch(UpdateQueueItemStatusAndQueueIdAction(updateStatus));
    this.store.dispatch(getQueuedItemsForQueryAction(getItems));
    console.log('onDeliteDocument');
  }
  onUnprocessedDocument() {
    const getItems: QueuedItemsForQuery = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "queueItemTypeId" : "REMIT_POST",
        "date" : "",
        "requestTicket" : {
          "id" : 5,
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

    const updateStatus: UpdateQueueItemStatusAndQueueId = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "updateQueueItemStatusAndQueueId",
      "params" : {
        "queueItemId" : 1170,
        "status" : "UNPROCESSED"
      }
    }

    this.store.dispatch(UpdateQueueItemStatusAndQueueIdAction(updateStatus));
    this.store.dispatch(getQueuedItemsForQueryAction(getItems));
    console.log('onUnprocessedDocument');
  }

  onEditNotes() {
    const getNotes: getNotesForDocument = {
      "service" : "com.rms.mbx.gui.client.encounter.EncounterService",
      "method" : "getNotesForDocument",
      "params" : {
        "fileId" : 6128
      }
    }

    this.store.dispatch(getNotesForDocumentAction(getNotes));
  }

  onSearchTable() {
    const getGistory: getQueueItemHistory = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueueItemHistory",
      "params" : {
        "queueItemId" : 1069
      }
    }

    this.store.dispatch(getQueueItemHistoryAction(getGistory));
  }

  private _createForm() {
    this.filterForm = this.fb.group({
      dateOfDeposit: ['', [Validators.required]],
      batchNumber: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      lockbox: ['', [Validators.required]],
      status: ['', [Validators.required]],
      queue: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      destinationQueues: ['', [Validators.required]],
      thumbnails: ['', [Validators.required]],
    })
  }

  get _dateOfDeposit() {
    return this.filterForm.get('dateOfDeposit')
  }

  get _batchNumber() {
    return this.filterForm.get('batchNumber')
  }
  
  get _provider() {
    return this.filterForm.get('provider')
  }

  get _lockbox() {
    return this.filterForm.get('lockbox')
  }

  get _status() {
    return this.filterForm.get('status')
  }

  get _queue() {
    return this.filterForm.get('queue')
  }

  get _payer() {
    return this.filterForm.get('payer')
  }

  get _destinationQueues() {
    return this.filterForm.get('destinationQueues')
  }

  get _thumbnails() {
    return this.filterForm.get('thumbnails')
  }

  onSelectRow(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`select row indexed as ${index}`);
  } 

  
  onChangeSearchOptionBatchNumber(e) {
    this.searchOptionBatchNumber = e;
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e;
  }

  onChangeSearchOptionLockbox(e) {
    this.searchOptionLockbox = e;
  }

  onChangeSearchOptionStatus(e) {
    this.searchOptionStatus = e;
  }

  onChangeSearchOptionQueue(e) {
    this.searchOptionQueue = e;
  }

  onChangeSearchOptionPayer(e) {
    this.searchOptionPayer = e;
  }

  onChangeSearchOptionDestinationQueues(e) {
    this.searchOptionDestinationQueues = e;
  }
    
  onSearch() {    
    if (this.filterForm.invalid) {
      return
    } else {
      const workflowFilter: Filter = {
        dateOfDeposit: this.filterForm.value.dateOfDeposit,
        batchNumber: `${this.searchOptionBatchNumber} ${this.filterForm.value.batchNumber}`,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
        lockbox: `${this.searchOptionLockbox} ${this.filterForm.value.lockbox}`,
        status: `${this.searchOptionStatus} ${this.filterForm.value.status}`,
        queue: `${this.searchOptionQueue} ${this.filterForm.value.queue}`,
        payer: `${this.searchOptionPayer} ${this.filterForm.value.payer}`,
        destinationQueues: `${this.searchOptionDestinationQueues} ${this.filterForm.value.destinationQueues}`,
        thumbnails: this.filterForm.value.thumbnails
      }
      console.log(workflowFilter);

      const searchRequest: getQueuedItemsForQuery = {
        "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
        "method" : "getQueuedItemsForQuery",
        "params" : {
          "queueItemTypeId" : "REMIT_POST",
          "date" : "",
          "queueId" : 21,
          "requestTicket" : {
            "id" : 4,
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
  
      this.store.dispatch(getQueuedItemsForQueryAction(searchRequest));
    }
  }

  onClear() {
    this.filterForm.controls['batchNumber'].setValue(this.params.batchNumberSelectedOption);
    this.filterForm.controls['provider'].setValue(this.params.providerSelectedOption);
    this.filterForm.controls['lockbox'].setValue(this.params.lockBoxSelectedOption);
    this.filterForm.controls['status'].setValue(this.params.statusSelectedOption);
    this.filterForm.controls['queue'].setValue(this.params.queueSelectedOption);
    this.filterForm.controls['payer'].setValue(this.params.payerSelectedOption);
    this.filterForm.controls['destinationQueues'].setValue(this.params.destinationQueuesSelectedOption);
    this.filterForm.controls['thumbnails'].setValue(this.params.thumbnailsSelectedOption);
    this.dateOfDeposit.reset();

    // if you wat to reset all fields of filters form => this.filterForm.reset();
    console.log('Reset Filters');
  }

  ngOnInit(): void {
    this._createForm();
     // if results not founded then add error => this.filterForm.setErrors({ ...this.filterForm.errors, 'noResultsFound': true });

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
    })

    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i;
    })
  }

  onChangeProcessDate(val) {
    console.log('process date', val.target.value);
  }


  onChangeDateOfDepisit(val) {
    console.log('date of deposit', val.target.value);
  }

  onView() {
    console.log('View Document');
  }

  onSelectChange({val, row}) {
    switch (val) {
      case 'View Lockbox':
          console.log('here you should navigate to Lockbox page for');
          console.log(row);
          break;
      case 'View Remittance':
          console.log('here you should navigate to Remittance page for');
          console.log(row);
          break;
      case 'View Reconciliation':
          console.log('here you should navigate to Reconciliation page for');
          console.log(row);
          break;
      case 'View Matching ERA':
          console.log('here you should navigate to Matching ERA page for');
          console.log(row);
          break;
      case 'View Remit Post':
          console.log('here you should navigate to Remit Post page for');
          console.log(row);
          break;
      case 'View Denial':
          console.log('here you should navigate to Dental page for');
          console.log(row);
          break;
    }
  }

  listData = {
    Groceries: {
      'Almond Meal flour': null,
      'Organic eggs': null,
      'Protein Powder': null,
      Fruits: {
        Apple: null,
        Berries: ['Blueberry', 'Raspberry'],
        Orange: null
      }
    },
    Reminders: [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular'
    ],
    asd: null
  };

  displayedColumnsResult = [
    {
      title: 'dropdown',
      column: 'dropdown',
      width: 10,
    },
    {
      title: 'Status',
      column: 'status',
      width: 100,
    },
    {
      title: 'User',
      column: 'userName',
      width: 100,
    },
    {
      title: 'Queue',
      column: 'queueName',
      width: 100,
    },
    {
      title: 'Batch',
      column: 'batchNumber',
      width: 100,
    },
    {
      title: 'Payer',
      column: 'payerName',
      width: 100,
    },
    {
      title: 'PAN',
      column: 'patientAccountNumber',
      width: 100,
    },
    {
      title: 'Service',
      column: 'remitDate',
      width: 100,
    },
    {
      title: 'Submitted',
      column: 'submittedAmount',
      width: 100,
    },
    {
      title: 'Last',
      column: 'lastName',
      width: 100,
    },
    {
      title: 'First',
      column: 'firstName',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'domainName',
      width: 100,
    },
    // {
    //   title: 'Indexing status',
    //   column: 'indexingStatus',
    //   width: 100,
    // },
    {
      title: 'return',
      column: 'return',
      width: 50,
    },
    {
      title: 'document',
      column: 'document',
      width: 50,
    },
    {
      title: 'view',
      column: 'view',
      width: 50,
    }
  ];
}
