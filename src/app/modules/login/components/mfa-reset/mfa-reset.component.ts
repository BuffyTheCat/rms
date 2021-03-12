import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'rms-mfa-resets',
  templateUrl: './mfa-reset.component.html',
  styleUrls: ['./mfa-reset.component.scss']
})

export class MfaResetComponent implements OnInit {
  logoPath: string = '../../../../../assets/icons/logo.svg';
  mfaResetFormUsername: FormGroup;
  mfaResetFormEmail: FormGroup;
  usernameIsCorrect: boolean = false;
  emailIsCorrect: boolean = false;

  constructor(private fb: FormBuilder) { }

  private _createFormUsername() {
    this.mfaResetFormUsername = this.fb.group({
      username: ['', [Validators.required]],
    })
  }

  private _createFormEmail() {
    this.mfaResetFormEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get _email() {
    return this.mfaResetFormEmail.get('email')
  }

  get _username() {
    return this.mfaResetFormUsername.get('username')
  }

  onUsernameSubmit() {
    if (this.mfaResetFormUsername.invalid) {
      return
    }
    
    const mfaUsername: string = this.mfaResetFormUsername.value.email;

    // on submit dispatch your action this.store.dispatch(action(mfaUsername));
    // if username response is correct then:
    this.usernameIsCorrect = true;

  }

  onEmailSubmit() {
    if (this.mfaResetFormEmail.invalid) {
      return
    }
    
    this.emailIsCorrect = true;
    const mfaEmail: string = this.mfaResetFormUsername.value.username;
    // on submit dispatch your action this.store.dispatch(action(mfaUsername));
  }

  ngOnInit(): void {
    this._createFormUsername();
    this._createFormEmail();
  }
}
