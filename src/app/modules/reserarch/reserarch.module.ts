import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ResearchComponent } from './components/research/research.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResearchRemittanceComponent } from './components/remittance/research-remittance.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ResearchEncounterComponent } from './components/encounter/research-encounter.component';
import { ResearchReportPaymentComponent } from './components/report-payment/research-report-payment.component';
import { ResearchBathPrintComponent } from './components/bath-print/research-bath-print.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const ReserarchRoutes: Routes = [
    {
        path: 'research-lockbox',
        component: ResearchComponent
    },
    {
        path: 'research-remittance',
        component: ResearchRemittanceComponent
    },
    {
        path: 'research-encounter',
        component: ResearchEncounterComponent
    },
    {
        path: 'research-report-payment',
        component: ResearchReportPaymentComponent
    },
    {
        path: 'research-bath-print',
        component: ResearchBathPrintComponent
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
        ResearchComponent,
        ResearchRemittanceComponent,
        ResearchEncounterComponent,
        ResearchReportPaymentComponent,
        ResearchBathPrintComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class ResearchModule {

}
