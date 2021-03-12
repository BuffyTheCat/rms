import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CashArcComponent } from './components/cash-arc/cash-arc.component';
import { CashArcItemComponent } from './components/cash-arc-item/cash-arc-item.component';
import { MatButtonModule } from '@angular/material/button';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const CashArcRoutes: Routes = [
    {
        path: '',
        component: CashArcComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MatButtonModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        CashArcComponent,
        CashArcItemComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class CashArcModule {

}
