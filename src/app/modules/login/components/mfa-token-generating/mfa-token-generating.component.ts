import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rms-mfa-token-generating',
  templateUrl: './mfa-token-generating.component.html',
  styleUrls: ['./mfa-token-generating.component.scss']
})

export class MfaTokenGeneratingComponent implements OnInit {
  logoPath: string = '../../../../../assets/icons/logo.svg';
  mfaTokenForm: FormGroup;
  exampleToken: string = 'Example token Example token Example token';
  QrPath: string = '../../../../../assets/icons/qr.png';

  constructor(private fb: FormBuilder, private router: Router) { }

  private _createForm() {
    this.mfaTokenForm = this.fb.group({
      token: ['', [Validators.required]],
    })
  }

  get _token() {
    return this.mfaTokenForm.get('token')
  }

  onSubmit() {
    if (this.mfaTokenForm.invalid) {
      return
    }
    const token: string = this.mfaTokenForm.value.token
    // on submit dispatch your action this.store.dispatch(action(user));
  }

  ngOnInit(): void {
    this._createForm()
  }
}
