import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'rms-domains-dashboard',
  templateUrl: './domains-dashboard.component.html',
  styleUrls: ['./domains-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationDomainsDashboardComponent implements OnInit {
  activeProvider = 'RMS QA Domain';
  domainsDashboardForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private location: Location) { }

  private _createForm() {
    this.domainsDashboardForm = this.fb.group({
      remitPostWarning: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
      remitPostDanger: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
      denialWarning: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
      denialDanger: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
      taxIDWarning: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
      taxIDDanger: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100000), Validators.required]],
    })
  }

  get _remitPostWarning() {
    return this.domainsDashboardForm.get('remitPostWarning')
  }

  get _remitPostDanger() {
    return this.domainsDashboardForm.get('remitPostDanger')
  }

  get _denialWarning() {
    return this.domainsDashboardForm.get('denialWarning')
  }

  get _denialDanger() {
    return this.domainsDashboardForm.get('denialDanger')
  }

  get _taxIDWarning() {
    return this.domainsDashboardForm.get('taxIDWarning')
  }

  get _taxIDDanger() {
    return this.domainsDashboardForm.get('taxIDDanger')
  }

  ngOnInit(): void {
    this._createForm();
  }

  onPressSave() {
    if (this.domainsDashboardForm.invalid) {
      console.log('invalid');
      return
    } else {
      const domainsDashboard = {
        remitPostWarning: this.domainsDashboardForm.value.remitPostWarning,
        remitPostDanger: this.domainsDashboardForm.value.remitPostDanger,
        denialWarning: this.domainsDashboardForm.value.denialWarning,
        denialDanger: this.domainsDashboardForm.value.denialDanger,
        taxIDWarning: this.domainsDashboardForm.value.taxIDWarning,
        taxIDDanger: this.domainsDashboardForm.value.taxIDDanger,
      }
      console.log(domainsDashboard);
    }

  }

  onPressReset() {
    this.domainsDashboardForm.reset();
  }
}
