import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const ReconciliationRoutes: Routes = [
    {
        path: '',
        component: ReconciliationComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        ReactiveFormsModule,
        PerfectScrollbarModule
    ],
    declarations: [
        ReconciliationComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class ReconciliationModule {

}
