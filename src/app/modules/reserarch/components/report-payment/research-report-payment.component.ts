import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { Observable } from 'rxjs';
import { QueuedItemsForQuery, getNotesForDocument, GetParams } from 'src/app/shared/interfaces/queued-items-interface';
import { getQueuedItemsForQueryAction, getNotesForDocumentAction, editTransactionAction, getParamsAction } from 'src/app/store/main/main.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-research-report-payment',
  templateUrl: './research-report-payment.component.html',
  styleUrls: ['./research-report-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResearchReportPaymentComponent implements OnInit {
  filterForm: FormGroup;
  selectOption: Array<string> = ['setting', 'setting 2', 'setting 3'];
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];
  total: string = '9848242.79';
  items$: Observable<any>;
  params$: Observable<any>;
  tableData;
  params;
  @ViewChild('dateOfDeposit') dateOfDeposit:FilterDateComponent;

  searchOptionBatch: string = 'Is';
  searchOptionPaymentNumber: string = 'Is';
  searchOptionPayerGroup: string = 'Is';
  searchOptionPaymentAmount: string = 'Equals';
  searchOptionTRN: string = 'Is';
  searchOptionPaymentType: string = 'Is';
  searchOptionProvider: string = 'Is';
  searchOptionPayer: string = 'Is';

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  private _createForm() {
    this.filterForm = this.fb.group({
      dateOfDeposit: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      paymentNumber: ['', [Validators.required]],
      payerGroup: ['', [Validators.required]],
      paymentAmount: ['', [Validators.required, Validators.pattern("^[0-9]{0,22}(\.[0-9]{1,2})?$")]],
      TRN: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      payer: ['', [Validators.required]],
    })
  }

  onChangeSearchOptionBatch(e) {
    this.searchOptionBatch = e
  }

  onChangeSearchOptionPaymentNumber(e) {
    this.searchOptionPaymentNumber = e
  }

  onChangeSearchOptionPayerGroup(e) {
    this.searchOptionPayerGroup = e
  }

  onChangeSearchOptionPaymentAmount(e) {
    this.searchOptionPaymentAmount = e
  }

  onChangeSearchOptionTRN(e) {
    this.searchOptionTRN = e
  }

  onChangeSearchOptionPaymentType(e) {
    this.searchOptionPaymentType = e
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e
  }

  onChangeSearchOptionPayer(e) {
    this.searchOptionPayer = e
  }

  get _dateOfDeposit() {
    return this.filterForm.get('dateOfDeposit')
  }

  get _batch() {
    return this.filterForm.get('batch')
  }

  get _paymentNumber() {
    return this.filterForm.get('paymentNumber')
  }

  get _payerGroup() {
    return this.filterForm.get('payerGroup')
  }

  get _paymentAmount() {
    return this.filterForm.get('paymentAmount')
  }

  get _TRN() {
    return this.filterForm.get('TRN')
  }

  get _paymentType() {
    return this.filterForm.get('paymentType')
  }

  get _provider() {
    return this.filterForm.get('provider')
  }

  get _payer() {
    return this.filterForm.get('payer')
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
        batch: `${this.searchOptionBatch} ${this.filterForm.value.batch}`,
        paymentNumber: `${this.searchOptionPaymentNumber} ${this.filterForm.value.paymentNumber}`,
        payerGroup: `${this.searchOptionPayerGroup} ${this.filterForm.value.payerGroup}`,
        paymentAmount: `${this.searchOptionPaymentAmount} ${this.filterForm.value.paymentAmount}`,
        TRN: `${this.searchOptionTRN} ${this.filterForm.value.TRN}`,
        paymentType: `${this.searchOptionPaymentType} ${this.filterForm.value.paymentType}`,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
        payer: `${this.searchOptionPayer} ${this.filterForm.value.payer}`,
      }
      console.log('feigning of senting request', researchFilter);
    }
  }

  onClear() {
    this.dateOfDeposit.reset();
    this.filterForm.controls['patientAccount'].setValue(this.params.batchSelectedOption);
    this.filterForm.controls['lastName'].setValue(this.params.paymentNumberSelectedOption);
    this.filterForm.controls['firstName'].setValue(this.params.payerGroupSelectedOption);
    this.filterForm.controls['submittedAmount'].setValue(this.params.paymentAmountSelectedOption);
    this.filterForm.controls['paidAmount'].setValue(this.params.TRNSelectedOption);
    this.filterForm.controls['transactionId'].setValue(this.params.paymentTypeSelectedOption);
    this.filterForm.controls['payer'].setValue(this.params.providerSelectedOption);
    this.filterForm.controls['provider'].setValue(this.params.payerSelectedOption);

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

  onEdit(id) {
    this.store.dispatch(editTransactionAction(id));
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
    });

    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i;
    })
  }

  onSave() {
    console.log('Download');
  }
  
  onView() {
    console.log('Diew Document');
  }

  onChangedateOfDeposit(val) {
    console.log('date of deposit', val.target.value);
  }

  displayedColumns = [
    {
      title: '',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Date Of Deposit',
      column: 'dateOfDeposit',
      width: 120,
    },
    {
      title: 'Batch',
      column: 'batchNumber',
      width: 120,
    },
    {
      title: 'Payment Amount',
      column: 'paymentAmount',
      width: 100,
    },
    {
      title: 'Payer Group',
      column: 'payerGroup',
      width: 100,
    },
    {
      title: 'Payer',
      column: 'payerName',
      width: 120,
    },
    {
      title: 'Payment Type',
      column: 'paymentType',
      width: 100,
    },
    {
      title: 'Payment Number',
      column: 'paymentNumber',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'providerName',
      width: 100,
    },
    {
      title: 'Addendum',
      column: 'addendum',
      width: 100,
    },
    {
      title: 'document',
      column: 'document',
      width: 50,
    },
    {
      title: 'view',
      column: 'view',
      width: 40,
    }
  ];
}
