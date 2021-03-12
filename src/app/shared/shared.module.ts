import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
import { TableComponent, CustomTitleCasePipe, CheckDatePipe } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { DocumentNotesComponent } from './components/document-notes/document-notes.component';
import { ColumnsEditorComponent } from './components/columns-editor/columns-editor.component';
import { FilterComponentComponent } from './components/filter-component/filter-component.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterWithTabsComponent } from './components/filter-with-tabs/filter-with-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NestedListComponent } from './components/nested-list/nested-list.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { HistoryTrackingComponent } from './components/history-tracking/history-tracking.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { MatTreeModule } from '@angular/material/tree';
import { NestedListTableComponent } from './components/nested-list-table/nested-list-table.component';
import { SelectColorComponent } from './components/select-color/select-color.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { DropzoneModalComponent } from './components/dropzone-modal/dropzone-modal.component';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { ItemHistoryComponent } from './components/item-history/item-history.component';
import { MatChipsModule } from '@angular/material/chips';
import { OverlayModule } from '@angular/cdk/overlay';
import { MultiselectAutocomplete, HighlightPipe } from './components/multiselect-autocomplete/multiselect-autocomplete.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,    
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
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
    MatAutocompleteModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    DragDropModule,
    RouterModule,
    PerfectScrollbarModule,
    MatTreeModule,
    ColorPickerModule,
    NgxDropzoneModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    OverlayModule,
  ],
  declarations: [
    CustomSelectComponent,
    TableComponent,
    FilterComponent,
    FilterComponentComponent,
    FilterDateComponent,
    DocumentNotesComponent,
    EditModalComponent,
    ColumnsEditorComponent,
    FilterWithTabsComponent,
    NestedListComponent,
    HistoryTrackingComponent,
    CustomTitleCasePipe,
    CheckDatePipe,
    ConfirmComponent,
    NestedListTableComponent,
    SelectColorComponent,
    DropzoneComponent,
    DropzoneModalComponent,
    RemoveModalComponent,
    ItemHistoryComponent,
    MultiselectAutocomplete,
    HighlightPipe,
  ],
  exports: [
    CustomSelectComponent,
    TableComponent,
    FilterComponent,
    FilterComponentComponent,
    FilterDateComponent,
    DocumentNotesComponent,
    EditModalComponent,
    ColumnsEditorComponent,
    FilterWithTabsComponent,
    NestedListComponent,
    HistoryTrackingComponent,
    CustomTitleCasePipe,
    CheckDatePipe,
    ConfirmComponent,
    NestedListTableComponent,
    SelectColorComponent,
    DropzoneComponent,
    DropzoneModalComponent,
    RemoveModalComponent,
    ItemHistoryComponent,
    MultiselectAutocomplete,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: []
})
export class SharedModule { }
