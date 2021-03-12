import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ResetPasswordAction } from 'src/app/store/reset-password/reset-password.action';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'rms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private store: Store<AppState>, private auth: AuthenticationService) {
    this._createForm()
  }

  get _new() {
    return this.resetPassForm.get('new')
  }

  get _confirm() {
    return this.resetPassForm.get('confirm')
  }

  private _createForm() {
    this.resetPassForm = this.fb.group({
      new: ['', [ 
        Validators.required,
        Validators.pattern('(?!.*([A-Za-z0-9])\\1{2})((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
      ]],
      confirm: ['', [Validators.required]],
    }, {validator: this.checkPasswords })
  }


  checkPasswords(group: FormGroup) {
    let newPass = group.get('new').value;
    let confirmPass = group.get('confirm').value;
    return newPass === confirmPass ? null : { notSame: true }     
  }

  onSubmit() {
    if (this.resetPassForm.invalid) {
      return
    }
    let token = this.auth.token;    
    this.store.dispatch(ResetPasswordAction({idToken: token, password: this.resetPassForm.value.confirm}));
  }

  ngOnInit(): void {
  }
}
