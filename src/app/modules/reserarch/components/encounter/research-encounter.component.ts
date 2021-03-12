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
  selector: 'rms-research-encounter',
  templateUrl: './research-encounter.component.html',
  styleUrls: ['./research-encounter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResearchEncounterComponent implements OnInit {
  filterForm: FormGroup;
  selectOptionRow: Array<string> = ['View Lockbox', 'View Remittance', 'View Reconciliation', 'View Matching ERA', 'View Remit Post', 'View Denial'];
  total: string = '9848242.79';
  items$: Observable<any>;
  params$: Observable<any>;
  params;
  tableData;
  @ViewChild('dateOfService') dateOfService:FilterDateComponent;

  searchOptionPatientAccount: string = 'Is';
  searchOptionLastName: string = 'Is';
  searchOptionFirstName: string = 'Is';
  searchOptionSubmittedAmount: string = 'Is';
  searchOptionPaidAmount: string = 'Is';
  searchOptionTransactionId: string = 'Is';
  searchOptionPayer: string = 'Is';
  searchOptionProvider: string = 'Is';

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  private _createForm() {
    this.filterForm = this.fb.group({
      patientAccount: ['', [Validators.required]],
      dateOfService: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      submittedAmount: ['', [Validators.required]],
      paidAmount: ['', [Validators.required]],
      transactionId: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      provider: ['', [Validators.required]],
    })
  }

  onChangeSearchOptionPatientAccount(e) {
    this.searchOptionPatientAccount = e
  }

  onChangeSearchOptionLastName(e) {
    this.searchOptionLastName = e
  }

  onChangeSearchOptionFirstName(e) {
    this.searchOptionFirstName = e
  }

  onChangeSearchOptionSubmittedAmount(e) {
    this.searchOptionSubmittedAmount = e
  }

  onChangeSearchOptionPaidAmount(e) {
    this.searchOptionPaidAmount = e
  }

  onChangeSearchOptionTransactionId(e) {
    this.searchOptionTransactionId = e
  }

  onChangeSearchOptionPayer(e) {
    this.searchOptionPayer = e
  }

  onChangeSearchOptionProvider(e) {
    this.searchOptionProvider = e
  }

  get _dateOfService() {
    return this.filterForm.get('dateOfService')
  }

  get _patientAccount() {
    return this.filterForm.get('patientAccount')
  }

  get _lastName() {
    return this.filterForm.get('lastName')
  }

  get _firstName() {
    return this.filterForm.get('firstName')
  }

  get _submittedAmount() {
    return this.filterForm.get('submittedAmount')
  }

  get _paidAmount() {
    return this.filterForm.get('paidAmount')
  }

  get _transactionId() {
    return this.filterForm.get('transactionId')
  }

  get _payer() {
    return this.filterForm.get('payer')
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
        patientAccount: `${this.searchOptionPatientAccount} ${this.filterForm.value.patientAccount}`,
        dateOfService: this.filterForm.value.dateOfService,
        lastName: `${this.searchOptionLastName} ${this.filterForm.value.lastName}`,
        firstName: `${this.searchOptionFirstName} ${this.filterForm.value.firstName}`,
        submittedAmount: `${this.searchOptionSubmittedAmount} ${this.filterForm.value.submittedAmount}`,
        paidAmount: `${this.searchOptionPaidAmount} ${this.filterForm.value.paidAmount}`,
        transactionId: `${this.searchOptionTransactionId} ${this.filterForm.value.transactionId}`,
        payer: `${this.searchOptionPayer} ${this.filterForm.value.payer}`,
        provider: `${this.searchOptionProvider} ${this.filterForm.value.provider}`,
      }
      console.log('feigning of senting request', researchFilter);
    }
  }

  onClear() {
    this.dateOfService.reset();
    this.filterForm.controls['patientAccount'].setValue(this.params.patientAccountSelectedOption);
    this.filterForm.controls['lastName'].setValue(this.params.lastNameSelectedOption);
    this.filterForm.controls['firstName'].setValue(this.params.firstNameSelectedOption);
    this.filterForm.controls['submittedAmount'].setValue(this.params.submittedAmountSelectedOption);
    this.filterForm.controls['paidAmount'].setValue(this.params.paidAmountSelectedOption);
    this.filterForm.controls['transactionId'].setValue(this.params.transactionIdSelectedOption);
    this.filterForm.controls['payer'].setValue(this.params.payerSelectedOption);
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

  onEdit(id) {
    this.store.dispatch(editTransactionAction({id: id, title: 'Encounter Editor'}));
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

  onChangedateOfService(val) {
    console.log('date of service', val.target.value);
  }

  displayedColumns = [
    {
      title: 'Patient Account',
      column: 'patientAccountNumber',
      width: 150,
    },
    {
      title: 'Date Of Service',
      column: 'dateOfService',
      width: 120,
    },
    {
      title: 'Patient Name',
      column: 'patientAccountName',
      width: 120,
    },
    {
      title: 'Payer',
      column: 'payerName',
      width: 100,
    },
    {
      title: 'Provider',
      column: 'providerName',
      width: 100,
    },
    {
      title: 'Member Name',
      column: 'userName',
      width: 120,
    },
    {
      title: 'Submitted Amount',
      column: 'submittedAmount',
      width: 150,
    },
    {
      title: 'Paid Amount',
      column: 'paymentAmount',
      width: 100,
    },
    {
      title: 'Transaction ID',
      column: 'transactionId',
      width: 100,
    },
    {
      title: 'view',
      column: 'view',
      width: 40,
    }
  ];

  displayedColumnsHistory = [
    {
      title: 'dropdown',
      column: 'dropdown',
      width: 50,
    },
    {
      title: 'Transaction',
      column: 'transaction',
      width: 120,
    },
    {
      title: 'Date Received',
      column: 'dateReceived',
      width: 120,
    },
    {
      title: 'Batch',
      column: 'batchNumber',
      width: 100,
    },
    {
      title: 'Date Of Service',
      column: 'dateOfService',
      width: 120,
    },
    {
      title: 'Submitted Amount',
      column: 'submittedAmount',
      width: 150,
    },
    {
      title: 'Remit Amount',
      column: 'remitAmount',
      width: 120,
    },
    {
      title: 'Payment Amount',
      column: 'paymentAmount',
      width: 150,
    },
    {
      title: 'Patient Responsibility',
      column: 'patientResponsibility',
      width: 150,
    },
    {
      title: 'Payer Name',
      column: 'payerName',
      width: 120,
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
    },
    {
      title: 'edit',
      column: 'edit',
      width: 40,
    }
  ];
}
