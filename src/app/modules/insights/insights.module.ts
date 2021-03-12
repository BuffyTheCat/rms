import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { InsightsComponent } from './components/insights/insights.component';


export const InsightsRoutes: Routes = [
    {
        path: '',
        component: InsightsComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        InsightsComponent,
    ],
    providers: [],
})

export class InsightsModule {

}
