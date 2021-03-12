import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { DocManagementComponent } from './components/doc-management/doc-management.component';


export const DocManagementRoutes: Routes = [
    {
        path: '',
        component: DocManagementComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        DocManagementComponent,
    ],
    providers: [],
})

export class DocManagementModule {

}
