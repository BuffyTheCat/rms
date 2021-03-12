import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/global-info-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'rms-mfa-login',
  templateUrl: './mfa-login.component.html',
  styleUrls: ['./mfa-login.component.scss']
})

export class MFALoginComponent implements OnInit {
  logoPath: string = '../../../../../assets/icons/logo.svg';
  mfaLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  private _createForm() {
    this.mfaLoginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      token: ['', [Validators.required]],
    })
  }

  get _username() {
    return this.mfaLoginForm.get('username')
  }

  get _password() {
    return this.mfaLoginForm.get('password')
  }

  get _token() {
    return this.mfaLoginForm.get('token')
  }

  onSubmit() {
    if (this.mfaLoginForm.invalid) {
      return
    }
    const user: User = {
      username: this.mfaLoginForm.value.username,
      password: this.mfaLoginForm.value.password,
      token: this.mfaLoginForm.value.token
    }
    // on submit dispatch your action this.store.dispatch(action(user));
  }

  ngOnInit(): void {
    this._createForm()
  }
}
