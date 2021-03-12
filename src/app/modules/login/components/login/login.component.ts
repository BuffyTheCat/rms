import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginAction } from '../../../../store/login/login.action';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/interfaces/global-info-interface';
import { selectError } from 'src/app/store/selectors';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'rms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  logoPath: string = '../../../../../assets/icons/logo.svg';
  loginForm: FormGroup;
  attempts: number = 3;
  errors = this.store.select(selectError);
  emailCookie: string = '';

  constructor(private fb: FormBuilder,
     private router: Router,
     private store: Store<AppState>,
     private auth: AuthenticationService,
     private cookieService: CookieService) { }

  private _createForm() {
    this.loginForm = this.fb.group({
      email: [this.emailCookie, [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get _email() {
    return this.loginForm.get('email')
  }

  get _password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.store.dispatch(loginAction(user));
  }

  ngOnInit(): void {
    this.errors.subscribe((error) => {

      if (error === 'EMAIL_NOT_FOUND' || error === 'INVALID_PASSWORD') {
        this.loginForm.setErrors({ ...this.loginForm.errors, 'invalidAttempt': true });
      }
      
      if (error === 'INVALID_EMAIL' || error === 'EMAIL_NOT_FOUND') {
        this.loginForm.setErrors({ ...this.loginForm.errors, 'nameError': true });
      }

      if (error === 'INVALID_PASSWORD') {
        this.loginForm.setErrors({ ...this.loginForm.errors, 'passwordError': true });
      }
    })
    this.emailCookie = this.cookieService.get('email');
    this._createForm()
  }
}
