import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { getParamsAction, getQueuedItemsForQueryAction } from 'src/app/store/main/main.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { GetParams, QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { MatTable } from '@angular/material/table';
import { TableComponent } from 'src/app/shared/components/table/table.component';


@Component({
  selector: 'rms-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReconciliationComponent implements OnInit {
  filterForm: FormGroup;
  selectOption: Array<string> = ['setting', 'setting 2', 'setting 3']
  total: string = '9848242.79'
  items$: Observable<any>;
  params$: Observable<any>;
  canDownload: boolean = false;
  tableData;
  params;
  @ViewChild('processDate') processDate:FilterDateComponent;
  @ViewChild('dateOfDeposit') dateOfDeposit:FilterDateComponent;
  @ViewChild('table') table: TableComponent;

  
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];

  searchOptionLockbox: string = 'Is';
  searchOptionPayerName: string = 'Is';
  searchOptionBatchNumber: string = 'Is';
  searchOptionFileName: string = 'Is';
  searchOptionProvider: string = 'Is';

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  private _createForm() {
    this.filterForm = this.fb.group({
      lockbox: ['', []],
      payer: ['', []],
      payerGroup: ['', []],
      batchNumber: ['', []],
      fileName: ['', []],
      documentType: ['', []],
      provider: ['', [Validators.required]],
      grouping: ['', []],
      processDate: ['', []],
      dateOfDeposit: ['', [Validators.required]],
    })
  }

  get _lockbox() {
    return this.filterForm.get('lockbox')
  }

  get _payer() {
    return this.filterForm.get('payer')
  }

  get _payerGroup() {
    return this.filterForm.get('payerGroup')
  }

  get _batchNumber() {
    return this.filterForm.get('batchNumber')
  }

  get _fileName() {
    return this.filterForm.get('fileName')
  }

  get _documentType() {
    return this.filterForm.get('documentType')
  }

  get _provider() {
    return this.filterForm.get('provider')
  }

  get _grouping() {
    return this.filterForm.get('grouping')
  }

  get _processDate() {
    return this.filterForm.get('processDate')
  }

  get _dateOfDeposit() {
    return this.filterForm.get('dateOfDeposit')
  }

  onChangeSearchOptionLockbox(e) {
    this.searchOptionLockbox = e;
  }

  onChangeSearchOptionPayerName(e) {
    this.searchOptionPayerName = e;
  }

  onChangeSearchOptionBatchNumber(e) {
    this.searchOptionBatchNumber = e;
  }

  onChangeSearchOptionFileName(e) {
    this.searchOptionFileName = e;
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e;
  }

  onDownload(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`download document indexed as ${index}`);
  }

  onExport(val) {
    if (val === 'Export all CSV') {
      console.log('Export all CSV');
    } else if (val === 'Export current CSV') {
      console.log('Export current CSV');
    }
  }

  onChangeGrouping(val) {
    if ( val !== 'File name') {
      this.canDownload = false;
    } else {
      this.canDownload = true;
    }
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

  onSelectRow(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`select row indexed as ${index}`);
  } 
    
  onSearch() {    
    if (this.filterForm.invalid) {
      return
    } else {
      const reconciliationFilter: Filter = {
        processDate: this.filterForm.value.processDate,
        dateOfDeposit: this.filterForm.value.dateOfDeposit,
        lockbox: `${this.searchOptionLockbox} ${this.filterForm.value.lockbox}`,
        payer: `${this.searchOptionPayerName} ${this.filterForm.value.payer}`,
        payerGroup: this.filterForm.value.payerGroup,
        batchNumber: `${this.searchOptionBatchNumber} ${this.filterForm.value.batchNumber}`,
        fileName: `${this.searchOptionFileName} ${this.filterForm.value.fileName}`,
        documentType: this.filterForm.value.documentType,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
        grouping: this.filterForm.value.grouping
      }
      console.log(reconciliationFilter);
    }
  }

  onClear() {
    this.filterForm.controls['lockbox'].setValue(this.params.lockBoxSelectedOptions);
    this.filterForm.controls['payer'].setValue(this.params.payerNameSelectedOptions);
    this.filterForm.controls['payerGroup'].setValue(this.params.payerGroupSelectedOptions);
    this.filterForm.controls['batchNumber'].setValue(this.params.batchNumberSelectedOptions);
    this.filterForm.controls['fileName'].setValue(this.params.fileNameSelectedOptions);
    this.filterForm.controls['documentType'].setValue(this.params.documentTypeSelectedOptions);
    this.filterForm.controls['provider'].setValue(this.params.providerSelectedOption);
    this.filterForm.controls['grouping'].setValue(this.params.groupingSelectedOptions);
    this.processDate.reset();
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

  displayedColumns = [
    {
      title: 'Group',
      column: 'group',
      width: 100,
    },
    {
      title: 'Payment amount',
      column: 'paymentAmount',
      width: 150,
    },
    {
      title: 'File amount',
      column: 'submittedAmount',
      width: 100,
    },
    {
      title: '835 Posting',
      column: 'posting',
      width: 100,
    },
    {
      title: 'Remit Post',
      column: 'remitPost',
      width: 100,
    },
    {
      title: '835 Production',
      column: 'production',
      width: 150,
    },
    {
      title: '835 Test',
      column: 'test',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'provider',
      width: 100,
    },
    {
      title: '',
      column: 'download',
      width: 50,
    }
  ];

  displayedColumnsWithoutDownload = [
    {
      title: 'Group',
      column: 'group',
      width: 100,
    },
    {
      title: 'Payment amount',
      column: 'paymentAmount',
      width: 150,
    },
    {
      title: 'File amount',
      column: 'submittedAmount',
      width: 100,
    },
    {
      title: '835 Posting',
      column: 'posting',
      width: 100,
    },
    {
      title: 'Remit Post',
      column: 'remitPost',
      width: 100,
    },
    {
      title: '835 Production',
      column: 'production',
      width: 150,
    },
    {
      title: '835 Test',
      column: 'test',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'provider',
      width: 100,
    }
  ];


  displayedColumnsLockbox = [
    {
      title: '',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Date Of Deposit',
      column: 'dateOfDeposit',
      width: 130,
    },
    {
      title: 'Processed date',
      column: 'processedDate',
      width: 130,
    },
    {
      title: 'Lockbox',
      column: 'lockbox',
      width: 100,
    },
    {
      title: 'Batch',
      column: 'batch',
      width: 100,
    },
    {
      title: 'Payer',
      column: 'payer',
      width: 100,
    },
    {
      title: 'Group',
      column: 'group',
      width: 100,
    },
    {
      title: 'Check number',
      column: 'checkNumber',
      width: 130,
    },
    {
      title: 'Payment amount',
      column: 'paymentAmount',
      width: 150,
    },
    {
      title: 'File amount',
      column: 'fileAmount',
      width: 100,
    },
    {
      title: 'Message',
      column: 'message',
      width: 100,
    },
    {
      title: 'Segregation group',
      column: 'segregationGroup',
      width: 150,
    }
  ];
}
