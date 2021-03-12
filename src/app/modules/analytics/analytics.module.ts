import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SimpleChartComponent } from './components/simple-chart/simple-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReimbursmenAnalyticsComponent } from './components/reimbursmen-analytics/reimbursmen-analytics.component';
import { DenialAnalyticsComponent } from './components/denial-analytics/denial-analytics.component';

export const AnalyticsRoutes: Routes = [
    {
        path: 'partner-analytics',
        component: AnalyticsComponent
    },
    {
        path: 'reimbursement-analytics',
        component: ReimbursmenAnalyticsComponent
    },
    {
        path: 'denial-analytics',
        component: DenialAnalyticsComponent
    },
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        MatSelectModule,
        MatExpansionModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        SatDatepickerModule, 
        SatNativeDateModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatRadioModule,
        FormsModule,
        ChartsModule,
    ],
    declarations: [
        AnalyticsComponent,
        LineChartComponent,
        SimpleChartComponent
    ],
    providers: [],
})

export class AnalyticsModule {

}
