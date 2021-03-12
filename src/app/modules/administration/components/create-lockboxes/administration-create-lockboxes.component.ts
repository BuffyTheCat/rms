import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-administration-create-lockboxes',
  templateUrl: './administration-create-lockboxes.component.html',
  styleUrls: ['./administration-create-lockboxes.component.scss']
})
export class AdministrationCreateLockboxesComponent implements OnInit {
  createLockboxForm: FormGroup;
  items$: Observable<any>;
  itemData;
  passedData: number = null;
  nameOptions: string[] = ['01', '02', '03'];
  streetOptions: string[] = ['01', '02', '03'];
  bankIdentifierOptions: string[] = ['01', '02', '03'];
  additionalStreetInformationOptions: string[] = ['01', '02', '03'];
  transitRoutingNumberOptions: string[] = ['01', '02', '03'];
  cityOptions: string[] = ['01', '02', '03'];
  lockboxNumberOptions: string[] = ['01', '02', '03'];
  stateOptions: string[] = [ 
    "AK - Alaska", 
    "AL - Alabama", 
    "AR - Arkansas", 
    "AS - American Samoa", 
    "AZ - Arizona", 
    "CA - California", 
    "CO - Colorado", 
    "CT - Connecticut", 
    "DC - District of Columbia", 
    "DE - Delaware", 
    "FL - Florida", 
    "GA - Georgia", 
    "GU - Guam", 
    "HI - Hawaii", 
    "IA - Iowa", 
    "ID - Idaho", 
    "IL - Illinois", 
    "IN - Indiana", 
    "KS - Kansas", 
    "KY - Kentucky", 
    "LA - Louisiana", 
    "MA - Massachusetts", 
    "MD - Maryland", 
    "ME - Maine", 
    "MI - Michigan", 
    "MN - Minnesota", 
    "MO - Missouri", 
    "MS - Mississippi", 
    "MT - Montana", 
    "NC - North Carolina", 
    "ND - North Dakota", 
    "NE - Nebraska", 
    "NH - New Hampshire", 
    "NJ - New Jersey", 
    "NM - New Mexico", 
    "NV - Nevada", 
    "NY - New York", 
    "OH - Ohio", 
    "OK - Oklahoma", 
    "OR - Oregon", 
    "PA - Pennsylvania", 
    "PR - Puerto Rico", 
    "RI - Rhode Island", 
    "SC - South Carolina", 
    "SD - South Dakota", 
    "TN - Tennessee", 
    "TX - Texas", 
    "UT - Utah", 
    "VA - Virginia", 
    "VI - Virgin Islands", 
  ];
  zipCodeOptions: string[] = ['01', '02', '03'];

  constructor(private fb: FormBuilder, private location: Location, private store: Store<AppState>) { }
  
  private _createForm() {
    this.createLockboxForm = this.fb.group({
      name: [this.passedData && this.itemData.firstName ? this.itemData.firstName : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-Z0-9_]+$")
      ]],
      street: [this.passedData && this.itemData.street ? this.itemData.street : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-Z0-9_]+$")
      ]],
      bankIdentifier: [this.passedData && this.itemData.bankIdentifier ? this.itemData.bankIdentifier : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-Z0-9_]+$")
      ]],
      additionalStreetInformation: [this.passedData && this.itemData.additionalStreetInformation ? this.itemData.additionalStreetInformation : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-Z0-9_]+$")
      ]],
      transitRoutingNumber: [this.passedData && this.itemData.transitRoutingNumber ? this.itemData.transitRoutingNumber : '', [
        Validators.required, 
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(1),
        Validators.maxLength(200),
      ]],
      city: [this.passedData && this.itemData.city ? this.itemData.city : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-Z_]+$")
      ]],
      lockboxNumber: [this.passedData && this.itemData.lockboxNumber ? this.itemData.lockboxNumber : '', [
        Validators.required, 
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(1),
        Validators.maxLength(200)
      ]],
      state: ['', [
        Validators.required
      ]],
      zipCode: [this.passedData && this.itemData.zip ? this.itemData.zip : '', [
        Validators.required, 
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(1),
        Validators.maxLength(200),
      ]],
    })
  }

  ngOnInit(): void {
    if (history.state.itemId) {
      this.passedData = history.state.itemId;
      console.log('passed data:', this.passedData);

      this.items$ = this.store.select(s => s.queue.items);
      this.items$.subscribe(i => {
        this.itemData = i.find(x => x.queueItemId === this.passedData)
      });
      this._createForm();
     
    } else {
      this._createForm();
    }

  }

  get _name() {
    return this.createLockboxForm.get('name')
  }

  get _street() {
    return this.createLockboxForm.get('street')
  }

  get _bankIdentifier() {
    return this.createLockboxForm.get('bankIdentifier')
  }

  get _additionalStreetInformation() {
    return this.createLockboxForm.get('additionalStreetInformation')
  }

  get _transitRoutingNumber() {
    return this.createLockboxForm.get('transitRoutingNumber')
  }

  get _city() {
    return this.createLockboxForm.get('city')
  }

  get _lockboxNumber() {
    return this.createLockboxForm.get('lockboxNumber')
  }

  get _state() {
    return this.createLockboxForm.get('state')
  }

  get _zipCode() {
    return this.createLockboxForm.get('zipCode')
  }

  onPressSave() {
    if (this.createLockboxForm.invalid) {
      return
    } else {
      const createLockbox = {
        name: this.createLockboxForm.value.name,
        street: this.createLockboxForm.value.street,
        bankIdentifier: this.createLockboxForm.value.bankIdentifier,
        additionalStreetInformation: this.createLockboxForm.value.additionalStreetInformation,
        transitRoutingNumber: this.createLockboxForm.value.transitRoutingNumber,
        city: this.createLockboxForm.value.city,
        lockboxNumber: this.createLockboxForm.value.lockboxNumber,
        state: this.createLockboxForm.value.state,
        zipCode: this.createLockboxForm.value.zipCode
      }
      console.log(createLockbox);
    }
  }

  onPressCancel() {
    this.location.back();
  }
}
