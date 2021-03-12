import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-domains-info',
  templateUrl: './domains-info.component.html',
  styleUrls: ['./domains-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationDomainsInfoComponent implements OnInit {
  provider = 'RMS QA Domain';
  domainsInfoForm: FormGroup;
  params$: Observable<any>;
  params;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private location: Location) { }

  private _createForm() {
    this.domainsInfoForm = this.fb.group({
      name: ['', [Validators.maxLength(200), Validators.required]],
      domainURL: ['', [Validators.required]],
      userLockoutTime: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(120), Validators.required]],
      loginMethod: ['', [Validators.required]],
      userPasswordLife: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(365), Validators.required]],
      sessionTimeout: ['', [Validators.pattern("^[0-9]+$"),Validators.min(5), Validators.max(60), Validators.required]],
      passwordHistorySize: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(100), Validators.required]],
      useProviderInfofromEDI: ['', [Validators.required]],
      maxFailedLogins: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(5), Validators.required]],
      dormantAccountTime: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(365), Validators.required]],
      homeScreenMessage: ['', null],
    })
  }

  get _name() {
    return this.domainsInfoForm.get('name')
  }

  get _domainURL() {
    return this.domainsInfoForm.get('domainURL')
  }

  get _userLockoutTime() {
    return this.domainsInfoForm.get('userLockoutTime')
  }

  get _loginMethod() {
    return this.domainsInfoForm.get('loginMethod')
  }

  get _userPasswordLife() {
    return this.domainsInfoForm.get('userPasswordLife')
  }

  get _sessionTimeout() {
    return this.domainsInfoForm.get('sessionTimeout')
  }

  get _passwordHistorySize() {
    return this.domainsInfoForm.get('passwordHistorySize')
  }

  get _useProviderInfofromEDI() {
    return this.domainsInfoForm.get('useProviderInfofromEDI')
  }

  get _maxFailedLogins() {
    return this.domainsInfoForm.get('maxFailedLogins')
  }

  get _dormantAccountTime() {
    return this.domainsInfoForm.get('dormantAccountTime')
  }

  get _homeScreenMessage() {
    return this.domainsInfoForm.get('homeScreenMessage')
  }

  ngOnInit(): void {
    this._createForm();

    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i;
    });
  }

  onPressSave() {
    if (this.domainsInfoForm.invalid) {
      return
    } else {
      const domainsInfo = {
        name: this.domainsInfoForm.value.name,
        domainURL: this.domainsInfoForm.value.domainURL,
        userLockoutTime: this.domainsInfoForm.value.userLockoutTime,
        loginMethod: this.domainsInfoForm.value.loginMethod,
        userPasswordLife: this.domainsInfoForm.value.userPasswordLife,
        sessionTimeout: this.domainsInfoForm.value.sessionTimeout,
        passwordHistorySize: this.domainsInfoForm.value.passwordHistorySize,
        useProviderInfofromEDI: this.domainsInfoForm.value.useProviderInfofromEDI,
        maxFailedLogins: this.domainsInfoForm.value.maxFailedLogins,
        dormantAccountTime: this.domainsInfoForm.value.dormantAccountTime,
        homeScreenMessage: this.domainsInfoForm.value.homeScreenMessage,
      }
      console.log(domainsInfo);
    }
  }
  
  onPressCancel() {
    this.location.back();
  }
}
