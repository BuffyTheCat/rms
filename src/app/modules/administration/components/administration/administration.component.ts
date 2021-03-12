import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetParams } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { getParamsAction, getUserInfoAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationComponent implements OnInit {

  selectProviderForm: FormGroup;
  providerOptions
  params$: Observable<any>;
  params: Array<string> = [];
  
  constructor(private fb: FormBuilder, private router: Router, private store: Store<AppState>) { }

  private _createForm() {
    this.selectProviderForm = this.fb.group({
      usersProvider: ['', [Validators.required, this.forbiddenNamesValidator(this.params)]],
      profilesProvider: ['', [Validators.required, this.forbiddenNamesValidator(this.params)]],
      lockboxesProvider: ['', [Validators.required, this.forbiddenNamesValidator(this.params)]],
      ADD_DOMAIN: null,
      ADMIN_VIEW: null,
      ASSIGN_CHILD_DOMAIN_ACCESS: null,
      ASSIGN_DASHBOARDS: null,
      ASSIGN_PROFILES: null,
      ASSIGN_QUEUES: null,
      ASSIGN_REPORTS: null,
    })
  }

  get _usersProvider() {
    return this.selectProviderForm.get('usersProvider')
  }

  get _profilesProvider() {
    return this.selectProviderForm.get('profilesProvider')
  }

  get _lockboxesProvider() {
    return this.selectProviderForm.get('lockboxesProvider')
  }

  ngOnInit(): void {
    this.params$ = this.store.select(s => s.queue.params);
    this.params$.subscribe(i => {
      this.params = i.provider;
      this._createForm();
    });
  }

  onClickViewUsers() {
    const data = {
      provider: this.selectProviderForm.value.usersProvider,
      ADD_DOMAIN: !!this.selectProviderForm.value.ADD_DOMAIN,
      ADMIN_VIEW: !!this.selectProviderForm.value.ADMIN_VIEW,
      ASSIGN_CHILD_DOMAIN_ACCESS: !!this.selectProviderForm.value.ASSIGN_CHILD_DOMAIN_ACCESS,
      ASSIGN_DASHBOARDS: !!this.selectProviderForm.value.ASSIGN_DASHBOARDS,
      ASSIGN_PROFILES: !!this.selectProviderForm.value.ASSIGN_PROFILES,
      ASSIGN_QUEUES: !!this.selectProviderForm.value.ASSIGN_QUEUES,
      ASSIGN_REPORTS: !!this.selectProviderForm.value.ASSIGN_REPORTS,
    }    
    this.router.navigate(['/administration/users'], {state: data});
  }

  onClickViewProfiles() {
    const data = {
      provider: this.selectProviderForm.value.profilesProvider,
      ADD_DOMAIN: !!this.selectProviderForm.value.ADD_DOMAIN,
      ADMIN_VIEW: !!this.selectProviderForm.value.ADMIN_VIEW,
      ASSIGN_CHILD_DOMAIN_ACCESS: !!this.selectProviderForm.value.ASSIGN_CHILD_DOMAIN_ACCESS,
      ASSIGN_DASHBOARDS: !!this.selectProviderForm.value.ASSIGN_DASHBOARDS,
      ASSIGN_PROFILES: !!this.selectProviderForm.value.ASSIGN_PROFILES,
      ASSIGN_QUEUES: !!this.selectProviderForm.value.ASSIGN_QUEUES,
      ASSIGN_REPORTS: !!this.selectProviderForm.value.ASSIGN_REPORTS,
    } 
    this.router.navigate(['/administration/profiles'], {state: data});
  }

  onClickViewLockboxes() {
    const data = {
      provider: this.selectProviderForm.value.lockboxesProvider,
      ADD_DOMAIN: !!this.selectProviderForm.value.ADD_DOMAIN,
      ADMIN_VIEW: !!this.selectProviderForm.value.ADMIN_VIEW,
      ASSIGN_CHILD_DOMAIN_ACCESS: !!this.selectProviderForm.value.ASSIGN_CHILD_DOMAIN_ACCESS,
      ASSIGN_DASHBOARDS: !!this.selectProviderForm.value.ASSIGN_DASHBOARDS,
      ASSIGN_PROFILES: !!this.selectProviderForm.value.ASSIGN_PROFILES,
      ASSIGN_QUEUES: !!this.selectProviderForm.value.ASSIGN_QUEUES,
      ASSIGN_REPORTS: !!this.selectProviderForm.value.ASSIGN_REPORTS,
    } 
    this.router.navigate(['/administration/lockboxes'], {state: data});
  }


  forbiddenNamesValidator(Services: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const index = Services.findIndex(Service => {
        return new RegExp("^" + Service + "$").test(control.value);
      });
      return index < 0 ? { forbiddenNames: { value: control.value } } : null;
    };
  }

}


