import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-domains-provider',
  templateUrl: './domains-provider.component.html',
  styleUrls: ['./domains-provider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationDomainsProviderComponent implements OnInit {
  provider = 'RMS QA Domain';
  domainsProviderForm: FormGroup;
  params$: Observable<any>;
  params;

  stateOptions: string[] = [ 
    "AK - Alaska", 
    "AL - Alabama", 
    "AR - Arkansas", 
    "AZ - Arizona", 
    "CA - California", 
    "CO - Colorado", 
    "CT - Connecticut", 
    "DC - District of Columbia", 
    "DE - Delaware", 
    "FL - Florida", 
    "GA - Georgia",
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
    "RI - Rhode Island", 
    "SC - South Carolina", 
    "SD - South Dakota", 
    "TN - Tennessee", 
    "TX - Texas", 
    "UT - Utah", 
    "VA - Virginia", 
    "WA - Washington", 
    "WV - West Virginia", 
    "WI - Wisconsin", 
    "WY - Wyoming", 
  ];

  constructor(private fb: FormBuilder, private store: Store<AppState>, private location: Location) { }

  private _createForm() {
    this.domainsProviderForm = this.fb.group({
      businessName: ['', [Validators.maxLength(200), Validators.required]],
      street: ['', [Validators.maxLength(100), Validators.required]],
      nationalProviderID: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(20), Validators.required]],
      additionalStreetInformation: ['', [Validators.maxLength(400), Validators.required]],
      taxID: ['', [Validators.maxLength(80), Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(9), Validators.minLength(5), Validators.required]],
    })
  }
  get _businessName() {
    return this.domainsProviderForm.get('businessName')
  }
  get _street() {
    return this.domainsProviderForm.get('street')
  }
  get _nationalProviderID() {
    return this.domainsProviderForm.get('nationalProviderID')
  }
  get _additionalStreetInformation() {
    return this.domainsProviderForm.get('additionalStreetInformation')
  }
  get _taxID() {
    return this.domainsProviderForm.get('taxID')
  }
  get _state() {
    return this.domainsProviderForm.get('state')
  }
  get _zipCode() {
    return this.domainsProviderForm.get('zipCode')
  }

  ngOnInit(): void {
    this._createForm();

    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i;
    });
  }

  onPressSave() {
    if (this.domainsProviderForm.invalid) {
      return
    } else {
      const domainsInfo = {
        businessName: this.domainsProviderForm.value.businessName,
        street: this.domainsProviderForm.value.street,
        nationalProviderID: this.domainsProviderForm.value.nationalProviderID,
        additionalStreetInformation: this.domainsProviderForm.value.additionalStreetInformation,
        taxID: this.domainsProviderForm.value.taxID,
        state: this.domainsProviderForm.value.state,
        zipCode: this.domainsProviderForm.value.zipCode,
      }
      console.log(domainsInfo);
    }
  }
  
  onPressCancel() {
    this.location.back();
  }
}
