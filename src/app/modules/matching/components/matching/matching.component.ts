import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { FilterDateComponent } from 'src/app/shared/components/filter-date/filter-date.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Filter } from 'src/app/shared/interfaces/global-info-interface';
import { QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getQueuedItemsForQueryAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatchingComponent implements OnInit {
  matchingForm: FormGroup;
  items$: Observable<any>;
  tableData;
  params$: Observable<any>;
  params;
  isMatch: boolean = false;
  @ViewChild('recieveDate') recieveDate:FilterDateComponent;
  @ViewChild('dateOfDeposite') dateOfDeposite:FilterDateComponent;
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];

  searchOptionPaymentNumber: string = 'Is';
  searchOptionPaymentAmount: string = 'Equals';
  searchOptionPayerName: string = 'Is';
  searchOptionProvider: string = 'Is';
  searchOptionPayerNameEra: string = 'Is';
  searchOptionProviderEra: string = 'Is';
  searchOptionBatch: string = 'Is';
  searchOptionPaymentNumberEra: string = 'Is';
  searchOptionPaymentAmountEra: string = 'Is';
  searchOptionPayerGroup: string = 'Is';
  searchOptionTRN: string = 'Is';
  searchOptionPaymentType: string = 'Is';
  
  constructor(private fb: FormBuilder, private store: Store<AppState>, public dialog: MatDialog) { }

  private _createForm() {
    this.matchingForm = this.fb.group({
      paymentsForm: this.fb.group({
        dateOfDeposite: ['', []],
        payerNameEra: ['', []],
        providerEra: ['', []],
        batch: ['', []],
        paymentNumberEra: ['', []],
        paymentAmountEra: ['', [Validators.required, Validators.pattern("^[0-9]{0,22}(\.[0-9]{1,2})?$")]],
        TRN: ['', []],
        paymentType: ['', []],
        payerGroup: ['', []],
      }),
      eraForm: this.fb.group({
        recieveDate: ['', []],
        paymentNumber: ['', []],
        paymentAmount: ['', [Validators.required, Validators.pattern("^[0-9]{0,22}(\.[0-9]{1,2})?$")]],
        payerName: ['', []],
        provider: ['', [Validators.required]],
      }),
    })
  }

  get _recieveDate() {
    return this.matchingForm.get('eraForm.recieveDate');
  }

  get _paymentNumber() {
    return this.matchingForm.get('eraForm.paymentNumber');
  }

  get _paymentAmount() {
    return this.matchingForm.get('eraForm.paymentAmount');
  }

  get _payerName() {
    return this.matchingForm.get('eraForm.payerName');
  }

  get _provider() {
    return this.matchingForm.get('eraForm.payerName');
  }

  get _payerGroup() {
    return this.matchingForm.get('paymentsForm.payerGroup');
  }

  get _TRN() {
    return this.matchingForm.get('paymentsForm.TRN');
  }

  get _paymentType() {
    return this.matchingForm.get('paymentsForm.paymentType');
  }

  get _dateOfDeposite() {
    return this.matchingForm.get('paymentsForm.dateOfDeposite');
  }

  get _payerNameEra() {
    return this.matchingForm.get('paymentsForm.payerNameEra');
  }

  get _providerEra() {
    return this.matchingForm.get('paymentsForm.providerEra');
  }

  get _batch() {
    return this.matchingForm.get('paymentsForm.batch');
  }

  get _paymentNumberEra() {
    return this.matchingForm.get('paymentsForm.paymentNumberEra');
  }

  get _paymentAmountEra() {
    return this.matchingForm.get('paymentsForm.paymentAmountEra');
  }

  
  onChangeSearchOptionPaymentNumber(e) {
    this.searchOptionPaymentNumber = e;
  }

  onChangeSearchOptionPaymentAmount(e) {
    this.searchOptionPaymentAmount = e;
  }

  onChangeSearchOptionPayerName(e) {
    this.searchOptionPayerName = e;
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e;
  }

  onChangeSearchOptionPayerNameEra(e) {
    this.searchOptionPayerNameEra = e;
  }

  onChangeSearchOptionProviderEra(e) {
    this.searchOptionProviderEra = e;
  }

  onChangeSearchOptionBatch(e) {
    this.searchOptionBatch = e;
  }

  onChangeSearchOptionPaymentNumberEra(e) {
    this.searchOptionPaymentNumberEra = e;
  }

  onChangeSearchOptionPaymentAmountEra(e) {
    this.searchOptionPaymentAmountEra = e;
  }

  onChangeSearchOptionPayerGroup(e) {
    this.searchOptionPayerGroup = e;
  }

  onChangeSearchOptionTRN(e) {
    this.searchOptionTRN = e;
  }

  onChangeSearchOptionPaymentType(e) {
    this.searchOptionPaymentType = e;
  }

  onSelectRow(row) {
    let index = this.tableData.findIndex(item => item === row);
    console.log(`select row indexed as ${index}`);
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

  onIgnoreEra() {
    console.log('onIgnoreEra');
  }

  onReleaseEra() {
    console.log('onReleaseEra');
  }

  onIgnorePayments() {
    console.log('onIgnorePayments');
  }

  onMatch() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        question: this.isMatch ? 'Matching ERA to Payment. Are you sure?' : 'Payment amounts do not match. Would you like to override/force match these items?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('on match event, payment associated');
      } else {
        return
      }
    });
  }

  onSearchEra() {
    if (this.matchingForm.controls.eraForm.invalid) {
      return
    } else {
      const eraFilter: Filter = {
        recieveDate: this.matchingForm.controls.eraForm['controls']['recieveDate'].value,
        paymentNumber: `${this.searchOptionPaymentNumber} ${this.matchingForm.controls.eraForm['controls']['paymentNumber'].value}`,
        paymentAmount: `${this.searchOptionPaymentAmount} ${this.matchingForm.controls.eraForm['controls']['paymentAmount'].value}`,
        payerName: `${this.searchOptionPayerName} ${this.matchingForm.controls.eraForm['controls']['payerName'].value}`,
        provider: `${this.searchOptionProvider} ${this.matchingForm.controls.eraForm['controls']['provider'].value}`,
      }
      console.log(eraFilter);
    }
  }

  onSearchPayments() {
    if (this.matchingForm.controls.paymentsForminvalid) {
      return
    } else {
      const matchingFilter: Filter = {
        dateOfDeposite: this.matchingForm.controls.paymentsForm['controls']['dateOfDeposite'].value,
        batch: `${this.searchOptionBatch} ${this.matchingForm.controls.paymentsForm['controls']['batch'].value}`,
        paymentNumber: `${this.searchOptionPaymentNumberEra} ${this.matchingForm.controls.paymentsForm['controls']['paymentNumberEra'].value}`,
        payerGroup: `${this.searchOptionPayerGroup} ${this.matchingForm.controls.paymentsForm['controls']['payerGroup'].value}`,
        paymentAmount: `${this.searchOptionPaymentAmountEra} ${this.matchingForm.controls.paymentsForm['controls']['paymentAmountEra'].value}`,
        TRN: `${this.searchOptionTRN} ${this.matchingForm.controls.paymentsForm['controls']['TRN'].value}`,
        paymentType: `${this.searchOptionPaymentType} ${this.matchingForm.controls.paymentsForm['controls']['paymentType'].value}`,
        payerName: `${this.searchOptionPayerName} ${this.matchingForm.controls.paymentsForm['controls']['payerNameEra'].value}`,
        provider: `${this.searchOptionProvider} ${this.matchingForm.controls.paymentsForm['controls']['providerEra'].value}`,
      }
      console.log(matchingFilter);
    }
  }

  onClearEra() {
    this.recieveDate.reset();
    console.log('Reset Era');
  }

  onClearPayments() {
    this.dateOfDeposite.reset();
    console.log('Reset Payments');
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
    });
  }

  onFindPayment() {
    console.log('on Find Payment event');
  }
  
  onFindEra() {
    console.log('on Find ERAs event');
  }

  displayedColumns = [
    {
      title: '',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Receive Date',
      column: 'receiveDate',
      width: 130,
    },
    {
      title: 'Payer',
      column: 'payer',
      width: 100,
    },
    {
      title: 'Payment Number',
      column: 'paymentNumber',
      width: 130,
    },
    {
      title: 'Payment Type',
      column: 'paymentType',
      width: 130,
    },
    {
      title: 'Remit Type',
      column: 'remitType',
      width: 100,
    },
    {
      title: 'Payment amount',
      column: 'paymentAmount',
      width: 150,
    },
    {
      title: 'Provider',
      column: 'provider',
      width: 100,
    },
    {
      title: '',
      column: 'return',
      width: 50,
    },
    {
      title: 'view',
      column: 'view',
      width: 50,
    }
  ];


  displayedColumnsPayments = [
    {
      title: '',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Date of Deposit',
      column: 'dateOfDeposit',
      width: 130,
    },
    {
      title: 'Batch',
      column: 'batch',
      width: 100,
    },
    {
      title: 'Payment Amount',
      column: 'paymentAmount',
      width: 130,
    },
    {
      title: 'Payer Group',
      column: 'payerGroup',
      width: 130,
    },
    {
      title: 'Payer',
      column: 'payer',
      width: 100,
    },
    {
      title: 'Payment Type',
      column: 'paymentType',
      width: 150,
    },
    {
      title: 'Payment Number',
      column: 'paymentNumber',
      width: 150,
    },
    {
      title: 'Provider',
      column: 'provider',
      width: 150,
    },
    {
      title: 'Addendum',
      column: 'addendum',
      width: 150,
    },
    {
      title: '',
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
