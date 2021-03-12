import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReportSchedulerComponent } from './components/report-scheduler/report-scheduler.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { NewReportComponent } from './components/new-report/new-report.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const ReportsRoutes: Routes = [
    {
        path: '',
        component: ReportsComponent
    },
    {
        path: 'report-scheduler',
        component: ReportSchedulerComponent
    },
    {
        path: 'report-scheduler/create',
        component: NewReportComponent
    },
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        MatSelectModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatRadioModule,
        PerfectScrollbarModule,
        AppRoutingModule,
        MatAutocompleteModule,
    ],
    declarations: [
        ReportsComponent,
        ReportSchedulerComponent,
        NewReportComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class ReportsModule {

}
