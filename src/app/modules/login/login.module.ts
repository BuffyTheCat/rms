import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MFALoginComponent } from './components/mfa-login/mfa-login.component';
import { MfaResetComponent } from './components/mfa-reset/mfa-reset.component';
import { MfaTokenGeneratingComponent } from './components/mfa-token-generating/mfa-token-generating.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


export const LoginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'mfa-login',
        component: MFALoginComponent
    },
    {
        path: 'mfa-reset',
        component: MfaResetComponent,
    },
    {
        path: 'mfa-generating-token',
        component: MfaTokenGeneratingComponent,
    },
    {
        path: 'questions',
        component: QuestionsComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    declarations: [
        LoginComponent,
        MFALoginComponent,
        MfaResetComponent,
        MfaTokenGeneratingComponent,
        QuestionsComponent,
        ResetPasswordComponent
    ],
    providers: [],
})

export class LoginModule {

}
