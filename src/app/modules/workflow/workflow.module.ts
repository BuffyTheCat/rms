import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UpdateAllComponent } from './components/update-all/update-all.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectDestinationQueueComponent } from './components/select-destination-queue/select-destination-queue.component';
import { WorkflowCorrespondenceComponent } from './components/correspondence/workflow-correspondence.component';
import { WorkflowDenialManagementComponent } from './components/denial-management/denial-management.component';
import { AngularSplitModule } from 'angular-split';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const WorkflowRoutes: Routes = [
    {
        path: 'remit-post',
        component: WorkflowComponent
    },
    {
        path: 'correspondence',
        component: WorkflowCorrespondenceComponent
    },
    {
        path: 'denial-management',
        component: WorkflowDenialManagementComponent
    },
];

@NgModule({
    imports: [
        AngularSplitModule.forRoot(),
        SharedModule,
        BrowserModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        PerfectScrollbarModule,
        FormsModule,
        DragDropModule
    ],
    declarations: [
        WorkflowComponent,
        DocumentEditorComponent,
        UpdateAllComponent,
        SelectDestinationQueueComponent,
        WorkflowCorrespondenceComponent,
        WorkflowDenialManagementComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class WorkflowModule {

}
