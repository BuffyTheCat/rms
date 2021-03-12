import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { QueuedItemsForQuery, getNotesForDocument, GetParams } from 'src/app/shared/interfaces/queued-items-interface';
import { getQueuedItemsForQueryAction, getNotesForDocumentAction, getParamsAction } from 'src/app/store/main/main.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-research-remittance',
  templateUrl: './research-remittance.component.html',
  styleUrls: ['./research-remittance.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResearchRemittanceComponent implements OnInit {
  filterForm: FormGroup;
  selectOption: Array<string> = ['setting', 'setting 2', 'setting 3'];
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];
  total: string = '9848242.79';
  items$: Observable<any>;
  params$: Observable<any>;
  tableData;
  params;
  @ViewChild('receiveDate') receiveDate:FilterDateComponent;

  searchOptionPaymentNumber: string = 'Is';
  searchOptionPaymentAmount: string = 'Is';
  searchOptionPaymentType: string = 'Equals';
  searchOptionProvider: string = 'Is';
  searchOptionPayer: string = 'Is';

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  private _createForm() {
    this.filterForm = this.fb.group({
      receiveDate: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      paymentNumber: ['', [Validators.required]],
      paymentAmount: ['', [Validators.required, Validators.pattern("^[0-9]{0,22}(\.[0-9]{1,2})?$")]],
      provider: ['', [Validators.required]],
      paymentType: ['', null],
    })
  }

  get _receiveDate() {
    return this.filterForm.get('receiveDate')
  }

  get _payer() {
    return this.filterForm.get('payer')
  }

  get _paymentNumber() {
    return this.filterForm.get('paymentNumber')
  }

  get _paymentAmount() {
    return this.filterForm.get('paymentAmount')
  }

  get _provider() {
    return this.filterForm.get('provider')
  }

  get _paymentType() {
    return this.filterForm.get('provider')
  }

  onChangeSearchOptionPaymentNumber(e) {
    this.searchOptionPaymentNumber = e;
  }

  onChangeSearchOptionPaymentAmount(e) {
    this.searchOptionPaymentAmount = e;
  }

  onChangeSearchOptionPaymentType(e) {
    this.searchOptionPaymentType = e;
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e;
  }

  onChangeSearchOptionPayer(e) {
    this.searchOptionPayer = e;
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
        receiveDate: this.filterForm.value.receiveDate,
        payer: `${this.searchOptionPaymentNumber} ${this.filterForm.value.payer}`,
        paymentNumber: `${this.searchOptionPaymentAmount} ${this.filterForm.value.paymentNumber}`,
        paymentAmount: `${this.searchOptionPaymentType} ${this.filterForm.value.paymentAmount}`,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
        paymentType: `${this.searchOptionPayer} ${this.filterForm.value.paymentType}`,
      }
      console.log(researchFilter);
    }
  }

  onClear() {
    this.receiveDate.reset();
    this.filterForm.controls['payer'].setValue(this.params.payerSelectedOption);
    this.filterForm.controls['paymentNumber'].setValue(this.params.paymentNumberSelectedOption);
    this.filterForm.controls['paymentAmount'].setValue(this.params.paymentAmountSelectedOption);
    this.filterForm.controls['provider'].setValue(this.params.providerSelectedOption);
    this.filterForm.controls['paymentType'].setValue(this.params.paymentTypeSelectedOption);

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
      title: 'dropdown',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Receive Date',
      column: 'receiveDate',
      width: 100,
    },
    {
      title: 'Payer',
      column: 'payerName',
      width: 140 ,
    },
    {
      title: 'Payment Number',
      column: 'paymentNumber',
      width: 130,
    },
    {
      title: 'Payment Type',
      column: 'paymentType',
      width: 100,
    },
    {
      title: 'Remit Type',
      column: 'remitType',
      width: 100,
    },
    {
      title: 'Payment Amount',
      column: 'paymentAmount',
      width: 130,
    },
    {
      title: 'Provider',
      column: 'provider',
      width: 100,
    },
    {
      title: 'view',
      column: 'view',
      width: 40,
    }
  ];

  displayedColumnsLockbox = [
    {
      title: 'Row',
      column: 'row',
      width: 80,
    },
    {
      title: 'System Type',
      column: 'systemType',
      width: 80,
    },
    {
      title: 'Patient Account Number',
      column: 'patientAccountNumber',
      width: 160,
    },
    {
      title: 'Patient Last Name',
      column: 'lastName',
      width: 160,
    },
    {
      title: 'Patient First Name',
      column: 'firstName',
      width: 160,
    },
    {
      title: 'Date Of Service',
      column: 'dateOfService',
      width: 120,
    },
    {
      title: 'Billed Amount',
      column: 'billedAmount',
      width: 100,
    },
    {
      title: 'Paid Amount',
      column: 'paidAmount',
      width: 100,
    },
    {
      title: 'Patient Responsibility',
      column: 'patientResponsibility',
      width: 150,
    },
    {
      title: 'Adjustment Reason Code',
      column: 'adjustmentReasonCode',
      width: 160,
    },
    {
      title: 'Reference Identifier',
      column: 'referenceIdentifier',
      width: 130,
    },

    {
      title: 'Adjustment Amount',
      column: 'adjustmentAmount',
      width: 150,
    },
  ];
}


