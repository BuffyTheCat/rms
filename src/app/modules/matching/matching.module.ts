import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatchingComponent } from './components/matching/matching.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const MatchingRoutes: Routes = [
    {
        path: '',
        component: MatchingComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        MatButtonModule
    ],
    declarations: [
        MatchingComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class MatchingModule {

}
