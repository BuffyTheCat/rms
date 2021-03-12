import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


const greaterThanBatch: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('batchStart').value;
  const end = fg.get('batchEnd').value;
  return start !== null && end !== null && parseInt(start) < parseInt(end)
    ? null
    : { range: true };
};

const greaterThanLockbox: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('lockboxStart').value;
  const end = fg.get('lockboxEnd').value;
  return start !== null && end !== null && parseInt(start) < parseInt(end)
    ? null
    : { range: true };
};

@Component({
  selector: 'rms-queue-modal',
  templateUrl: './queue-modal.component.html',
  styleUrls: ['./queue-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueueModalComponent implements OnInit {
  typeArray: Array<string> = ['Correspondance', 'Denial', 'Remit Post'];
  typeOfDArray: Array<string> = ["ACH", "Virtual Credit Card", "EOB", "Denial", "Paypal", "Paypal CC", "EOB No Pay", "Other"]; 
  fundedTArray: Array<string> = ["All", "Funded", "Unfunded"];
  providerArray: Array<string> = ['provider 1', 'provider 2', 'provider 3'];
  queueArray: Array<string> = ['queue 1', 'queue 2', 'queue 3'];
  payersArray: Array<string> = ['payer first', 'payer second', 'payer third'];
  payerGroupArray: Array<string> = ['payer Group Array first', 'payer Group Array second', 'payer Group Array third'];
  denialCodeArray: Array<string> = ['denial Code first', 'denial Code second', 'denial Code third'];
  step: string = 'Type';
  type: FormGroup;
  payers: FormGroup;
  payerGroup: FormGroup;
  batch: FormGroup;
  lockbox: FormGroup;
  typeOfD: FormGroup;
  denialCode: FormGroup;
  fundedT: FormGroup;
  refundA: FormGroup;
  destination: FormGroup;
  isEditing: boolean = false;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<QueueModalComponent>, private _formBuilder: FormBuilder) {
    if (data) {
      this.isEditing = true;
      console.log('data is passed for: id', data.id);
    } else {
      this.isEditing = false;
      console.log('no data');
    }
  }

 

  ngOnInit(): void {
    
    this.type = this._formBuilder.group({
      type : ['', Validators.required]
    });

    this.payers = this._formBuilder.group({
      payers  : ['', Validators.required]
    });

    this.payerGroup = this._formBuilder.group({
      payerGroup  : ['', Validators.required]
    });

    this.batch = this._formBuilder.group({
      batchStart : ['', [Validators.pattern("^[0-9]+$"), Validators.required]],
      batchEnd : ['', [Validators.pattern("^[0-9]+$"), Validators.required]]
    }, { validator: greaterThanBatch });

    this.lockbox = this._formBuilder.group({
      lockboxStart : ['', [Validators.pattern("^[0-9]+$"), Validators.required]],
      lockboxEnd : ['', [Validators.pattern("^[0-9]+$"), Validators.required]]
    }, { validator: greaterThanLockbox });

    this.typeOfD = this._formBuilder.group({
      typeOfD : ['', Validators.required]
    });

    this.denialCode = this._formBuilder.group({
      denialCode : ['', Validators.required]
    });

    this.fundedT = this._formBuilder.group({
      fundedT : ['', Validators.required]
    });

    this.refundA = this._formBuilder.group({
      refundAStart : ['', Validators.required],
      refundAEnd : ['', Validators.required]
    });

    this.destination = this._formBuilder.group({
      provider : ['', Validators.required],
      queue : ['', Validators.required]
    });
  }

  selectionChange(e) {
    this.step = e.selectedStep.label
  }
 
  onFinish() {
    const queueMapping = {
      type: this.type.value.type,
      payers: this.payers.value.payers,
      payerGroup: this.payerGroup.value.payerGroup,
      batchStart: this.batch.value.batchStart,
      batchEnd: this.batch.value.batchEnd,
      lockboxStart: this.lockbox.value.lockboxStart,
      lockboxEnd: this.lockbox.value.lockboxEnd,
      typeOfD: this.typeOfD.value.typeOfD,
      denialCode: this.denialCode.value.denialCode,
      fundedT: this.fundedT.value.fundedT,
      refundAStart: this.refundA.value.refundAStart,
      refundAEnd: this.refundA.value.refundAEnd,
      provider: this.destination.value.provider,
      queue: this.destination.value.queue,
    }
    console.log(queueMapping);
    this.dialogRef.close();
  }

  onSave() {
    const queueMapping = {
      type: this.type.value.type,
      payers: this.payers.value.payers,
      payerGroup: this.payerGroup.value.payerGroup,
      batchStart: this.batch.value.batchStart,
      batchEnd: this.batch.value.batchEnd,
      lockboxStart: this.lockbox.value.lockboxStart,
      lockboxEnd: this.lockbox.value.lockboxEnd,
      typeOfD: this.typeOfD.value.typeOfD,
      denialCode: this.denialCode.value.denialCode,
      fundedT: this.fundedT.value.fundedT,
      refundAStart: this.refundA.value.refundAStart,
      refundAEnd: this.refundA.value.refundAEnd,
      provider: this.destination.value.provider,
      queue: this.destination.value.queue,
    }
    console.log(queueMapping);
    this.dialogRef.close();
  }
}
