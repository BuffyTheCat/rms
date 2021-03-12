import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularSplitModule } from 'angular-split';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const ImageViewerRoutes: Routes = [
    {
        path: '',
        component: ImageViewerComponent
    },
];

@NgModule({
    imports: [
        AngularSplitModule.forRoot(),
        SharedModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        FormsModule,
        PerfectScrollbarModule
    ],
    declarations: [
        ImageViewerComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class ImageViewerModule {

}
