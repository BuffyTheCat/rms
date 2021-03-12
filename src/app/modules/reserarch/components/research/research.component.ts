import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { Observable } from 'rxjs';
import { QueuedItemsForQuery, getNotesForDocument, GetParams } from 'src/app/shared/interfaces/queued-items-interface';
import { getQueuedItemsForQueryAction, getNotesForDocumentAction, getParamsAction } from 'src/app/store/main/main.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResearchComponent implements OnInit {
  filterForm: FormGroup;
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];

  total: string = '9848242.79';
  items$: Observable<any>;
  params$: Observable<any>;
  tableData;
  params;
  @ViewChild('dateOfDeposit') dateOfDeposit:FilterDateComponent;

  searchOptionLockbox: string = 'Is';
  searchOptionProvider: string = 'Is';

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  private _createForm() {
    this.filterForm = this.fb.group({
      dateOfDeposit: ['', [Validators.required]],
      lockbox: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      provider: ['', [Validators.required]],
    })
  }

  onChangeSearchOptionLockbox(e) {
    this.searchOptionLockbox = e
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e
  }

  get _dateOfDeposit() {
    return this.filterForm.get('dateOfDeposit')
  }

  get _lockbox() {
    return this.filterForm.get('lockbox')
  }

  get _batch() {
    return this.filterForm.get('batch')
  }

  get _provider() {
    return this.filterForm.get('provider')
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

  onSearch() {    
    if (this.filterForm.invalid) {
      return
    } else {
      const researchFilter: Filter = {
        dateOfDeposit: this.filterForm.value.dateOfDeposit,
        lockbox: `${this.searchOptionLockbox} ${this.filterForm.value.lockbox}`,
        batch: this.filterForm.value.batch,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
      }
      console.log('feigning of senting request', researchFilter);
    }
  }

  onClear() {
    this.dateOfDeposit.reset();
    this.filterForm.controls['lockbox'].setValue(this.params.lockBoxSelectedOption);
    this.filterForm.controls['batch'].setValue(this.params.batchSelectedOption);
    this.filterForm.controls['provider'].setValue(this.params.providerSelectedOption);

    // if you wat to reset all fields of filters form => this.filterForm.reset();
    console.log('Reset Filters');
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

  ngOnInit(): void {
    this._createForm();
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

  onSave() {
    console.log('Download');
  }
  
  onView() {
    console.log('View Document');
  }

  onChangeDateOfDepisit(val) {
    console.log('date of deposit', val.target.value);
  }

  displayedColumns = [
    {
      title: 'Date Of Deposit',
      column: 'dateOfDeposit',
      width: 150,
    },
    {
      title: 'Lockbox',
      column: 'lockboxNumber',
      width: 100,
    },
    {
      title: 'Batch',
      column: 'batchNumber',
      width: 100,
    },
    {
      title: 'ERA',
      column: 'ERA',
      width: 100,
    },
    {
      title: 'EOB',
      column: 'EOB',
      width: 100,
    },
    {
      title: 'EOBL',
      column: 'EOBL',
      width: 100,
    },
    {
      title: 'Pat Pay',
      column: 'patPay',
      width: 100,
    },
    {
      title: 'Other',
      column: 'other',
      width: 100,
    },
    {
      title: 'Un-Posted',
      column: 'unPosted',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'payerName',
      width: 150 ,
    }
  ];

  displayedColumnsLockbox = [
    {
      title: 'dropdown',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'External ID',
      column: 'externalID',
      width: 100,
    },
    {
      title: 'Payment Number',
      column: 'paymentNumber',
      width: 100,
    },
    {
      title: 'Date Of Deposit',
      column: 'dateOfDeposit',
      width: 100,
    },
    {
      title: 'Lockbox',
      column: 'lockboxNumber',
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
      title: 'Document Type',
      column: 'documentType',
      width: 100,
    },
    {
      title: 'Un-Posted',
      column: 'unPosted',
      width: 100,
    },
    {
      title: 'document',
      column: 'document',
      width: 40,
    },
    {
      title: 'view',
      column: 'view',
      width: 40,
    }
  ];
}


