import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'rms-columns-editor',
  templateUrl: './columns-editor.component.html',
  styleUrls: ['./columns-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumnsEditorComponent implements OnInit {
  selection = new SelectionModel(true, []);
  selectionRight = new SelectionModel(true, []);
  firstTableDisplayedColumns: Object[] = [];
  secondTableDisplayedColumns: Object[] = [];
  columnsOfEditor: Array<string> = ['select', 'column'];
  @ViewChild('tableSelected') tableSelected: MatTable<any>;
  @ViewChild('tableAvailible') tableAvailible: MatTable<any>;
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;
  @ViewChild('perfectScrollRight') perfectScrollRight: PerfectScrollbarComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.firstTableDisplayedColumns = this.data.firstTableDisplayedColumns;
    this.secondTableDisplayedColumns = this.data.secondTableDisplayedColumns;

    setTimeout(() => {
      this.perfectScroll.directiveRef.update();
      this.perfectScrollRight.directiveRef.update();
    }, 500);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.firstTableDisplayedColumns.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.firstTableDisplayedColumns.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isAllSelectedRight() {
    const numSelected = this.selectionRight.selected.length;
    const numRows = this.secondTableDisplayedColumns.length;
    return numSelected === numRows;
  }

  masterToggleRight() {
    this.isAllSelectedRight() ?
        this.selectionRight.clear() :
        this.secondTableDisplayedColumns.forEach(row => this.selectionRight.select(row));
  }

  checkboxLabelRight(row): string {
    if (!row) {
      return `${this.isAllSelectedRight() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionRight.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onPressToSelected() {
    let items = this.selection.selected;

    const filter = (a, b) => a.filter(item => !b.includes(item));
    this.secondTableDisplayedColumns = [
      ...items,
      ...this.secondTableDisplayedColumns,
    ]
    this.firstTableDisplayedColumns = filter(this.firstTableDisplayedColumns, items);
    this.selection.clear();
  }

  onPressToAvailible() {
    let items = this.selectionRight.selected;
    const filter = (a, b) => a.filter(item => !b.includes(item));
    this.firstTableDisplayedColumns = [
      ...items,
      ...this.firstTableDisplayedColumns,
    ]
    this.secondTableDisplayedColumns = filter(this.secondTableDisplayedColumns, items);
    this.selectionRight.clear();
  }

  onPressRestore() {
    this.firstTableDisplayedColumns = this.data.firstTableDefaultColumns.slice();
    this.secondTableDisplayedColumns = this.data.secondTableDefaultColumns.slice();
  }
  
  onPressRestoreWidth() {
    console.log('onPressRestoreWidth');
  }

  drop(event: CdkDragDrop<any>) {
    console.log(1);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
                      event.previousIndex,
                      event.currentIndex);
      this.tableSelected.renderRows(); 
      this.tableAvailible.renderRows();
    } else {
      this.selectionRight.clear();
      this.selection.clear();
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.tableSelected.renderRows(); 
      this.tableAvailible.renderRows();
    }
  }

}
