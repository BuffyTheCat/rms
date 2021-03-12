import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef, Renderer2, HostListener, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ColumnsEditorComponent } from '../columns-editor/columns-editor.component';
import { MatSort } from '@angular/material/sort';
import { QueuedItemsResponce } from '../../interfaces/queued-items-interface';
import {Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Pipe({name: 'customTitleCase'})
export class CustomTitleCasePipe implements PipeTransform {
    public transform(input:string): string{
      if (!input) {
        return '';
      } else {
            return input.toString().replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }
    
}

@Pipe({name: 'checkDatePipe'})
export class CheckDatePipe implements PipeTransform {
    public transform(input:string): string{
      if (!input) {
        return '';
      } else {
            let value = moment(input.toUpperCase(), 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
            if (value) {
              return moment(input.toUpperCase()).format("MM/DD/YYYY").toString();
            } else {
              return input
            }
        }
    }
    
}

@Component({
  selector: 'rms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @Input() title: string;
  @Input() download: boolean = false;
  @Input() columnEditor: boolean = true;
  @Input() pagination: boolean = true;
  @Input() provider: string = null;
  @Input() tableData: QueuedItemsResponce[];
  @Input() displayedColumns;
  @Input() documentLink: string = 'http://www.africau.edu/images/default/sample.pdf';
  @Input() selectOptionRow: Array<string>;  
  @Input() tableScroll?: string;
  @Output() onSetting = new EventEmitter();
  @Output() onView = new EventEmitter();
  @Output() onDownload = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onComplete = new EventEmitter();
  @Output() onSelectRow = new EventEmitter();
  @Output() onExport = new EventEmitter();
  @Output() onSelectChange = new EventEmitter();
  @Output() onEditNotes = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onSearchTable = new EventEmitter();

  exportOptions: string[] = ['Export all CSV', 'Export current CSV'];
  isOpen:boolean = false;
  isInited:boolean = false;
  actionCount: string = '1';
  selectedRow: object;
  dataSource: MatTableDataSource<QueuedItemsResponce>;
  displayedColumnsArray: string[];
  DefaultColumnsWidth;

  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;
  firstTableDisplayedColumns: Object[] = [];
  secondTableDisplayedColumns: Object[] = [];
  firstTableDefaultColumns: Object[] = [];
  secondTableDefaultColumns: Object[] = [];
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, {read: ElementRef}) private matTableRef: ElementRef;
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;
  directiveRef: any;
  constructor(public dialog: MatDialog, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  
  ngOnChanges(changes: SimpleChanges) {
    this.init();
  }

  updateWidth() {
    if (this.isInited) {
      setTimeout(() => {
        this.setDisplayedColumns();
        this.setTableResize(this.matTableRef.nativeElement.clientWidth);
      }, 200);
    }
  }

  init() {
    this.displayedColumnsArray = this.displayedColumns.map((item) => item.column);
    this.dataSource = new MatTableDataSource(this.tableData);

    if (this.isInited) {
      setTimeout(() => {
        this.setDisplayedColumns();
        this.setTableResize(this.matTableRef.nativeElement.clientWidth);
      }, 200);
    }
  }
  

  ngAfterViewInit() {   
    this.isInited = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.secondTableDisplayedColumns = this.displayedColumns.filter((el) => { return el.column !== 'document' && el.column !== 'return' && el.column !== 'view' && el.column !== 'download' && el.column !== 'dropdown' && el.column !== 'edit' && el.column !== 'printedLink' && el.column !== 'completedLink' });
    this.secondTableDefaultColumns = this.displayedColumns.filter((el) => { return el.column !== 'document' && el.column !== 'return' && el.column !== 'view' && el.column !== 'download' && el.column !== 'dropdown' && el.column !== 'edit' && el.column !== 'printedLink' && el.column !== 'completedLink' });
    this.DefaultColumnsWidth = this.displayedColumns.map(i => ({...i}));
    if (this.pagination) {
      this.paginator.page.subscribe(x => this.updateWidth());
    }
    
    // this._hotkeysService.add(new Hotkey('down', (event: KeyboardEvent): boolean => {
    //   let index = this.tableData.indexOf(this.selectedRow);
    //   if (index !== -1 && index !== this.tableData.length - 1) {
    //     console.log('<Page Down> Table results keyed to down arrow keys.');
    //     this.selectedRow = this.tableData[index + 1];
    //     this.onSelectRow.emit(this.selectedRow);
        
        
    //     if (index % (this.paginator.pageSize -1) == 0 && index !== 0) {
    //       this.paginator.nextPage()
    //     }
    //   }
    //   return false;
    // }));

    // this._hotkeysService.add(new Hotkey('up', (event: KeyboardEvent): boolean => {
    //   let index = this.tableData.indexOf(this.selectedRow);
    //   if (index !== -1 && index !== 0) {
    //     console.log('<Page Up> Table results keyed to up arrow keys.');
    //     this.selectedRow = this.tableData[index - 1];
    //     this.onSelectRow.emit(this.selectedRow);

    //     if (index % this.paginator.pageSize == 0) {
    //       this.paginator.previousPage()
    //     }
    //   }
    //   return false;
    // }));

    this.setDisplayedColumns();
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  onSelectChanged(val, row) {
    this.onSelectChange.emit({val, row});
  }

  mouseEnter(event: any, index: number) {
    let realIndex = this.displayedColumnsArray.indexOf(this.displayedColumns[index].column);
    if (!this.pressed) {
      const rows = this.matTableRef.nativeElement.children[1].children;
      const headers = this.matTableRef.nativeElement.children[0].children;
  
      for (let i = 0; i < rows.length; i++) {
        rows[i].children[realIndex].classList.add('hovered');
      }
  
      for (let i = 0; i < headers.length; i++) {
        headers[i].children[realIndex].classList.add('hovered');
      }
    }
  }

  mouseLeave(event: any, index: number){
    let realIndex = this.displayedColumnsArray.indexOf(this.displayedColumns[index].column);
    
    if (!this.pressed) {
      const rows = this.matTableRef.nativeElement.children[1].children;
      const headers = this.matTableRef.nativeElement.children[0].children;
  
      for (let i = 0; i < rows.length; i++) {
        rows[i].children[realIndex].classList.remove('hovered');
      }
      for (let i = 0; i < headers.length; i++) {
        headers[i].children[realIndex].classList.remove('hovered');
      }
    }
  }

  openColumnsEditor() {
    const dialogRef = this.dialog.open(ColumnsEditorComponent, {
      data: {
        firstTableDisplayedColumns: this.firstTableDisplayedColumns,
        secondTableDisplayedColumns: this.secondTableDisplayedColumns,
        firstTableDefaultColumns: this.firstTableDefaultColumns,
        secondTableDefaultColumns: this.secondTableDefaultColumns
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }

      let controls = this.displayedColumns.filter((el) => { return el.column === 'document' || el.column === 'return' || el.column === 'view' || el.column === 'download' || el.column === 'dropdown' || el.column === 'edit' || el.column === 'printedLink' || el.column === 'completedLink' });
      if (Boolean(controls.find((control) => {return control.column === "dropdown"}))) {
        controls.splice(1, 0, ...result.second)
      } else {
        controls.splice(0, 0, ...result.second)
      }
      this.displayedColumnsArray = controls.map((item) => item.column);  
      this.firstTableDisplayedColumns = result.first;
      this.secondTableDisplayedColumns = result.second;
            
      if (result.reset) {
        this.displayedColumns = this.DefaultColumnsWidth.map(i => ({...i}));
        
        this.displayedColumns.forEach((item, index) => {
          this.setColumnWidth(this.displayedColumns[index]);
        });
      }

    });
  }

  selectRow(row) {
    this.selectedRow = row;
    this.onSelectRow.emit(row);
  }

  selectOpen(ev) {
    this.isOpen = !this.isOpen
  }

  onPressExport(val) {
    this.onExport.emit(val);
  }

  openEditNotes() {
    this.onEditNotes.emit();
  }

  openEdit(row) {
    this.onEdit.emit(row.queueItemId);
  }

  onPressSearch() {
    this.onSearchTable.emit();
  }

  onPressSettings() {
    this.onSetting.emit();
  }

  onPressDownload(row) {    
    this.onDownload.emit(row);
  }

  onPressRemove(row) {    
    this.onRemove.emit(row);
  }

  onPressCompleted(row) {    
    this.onComplete.emit(row);
  }

  onPressPrinted(row) {    
    console.log('Dispatch your action and set to printed for:', row);
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.parentElement.parentElement.parentElement.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    if (event.target.classList.contains('resize-gap_right')) {
      this.isResizingRight = true;
    } else if (event.target.classList.contains('resize-gap_left')) {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[0].children[index];
    return cell.getBoundingClientRect();
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.displayedColumns.forEach(( column) => {
      totWidth += column.width;
    });
    // const scale = (tableWidth - 5) / totWidth;
    this.displayedColumns.forEach(( column) => {
      this.setColumnWidth(column);
    });
  }

  setDisplayedColumns() {
    this.displayedColumns.forEach(( column, index) => {
      column.index = index;
      this.displayedColumnsArray[index] = column.column;
    });
  }


  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      if (this.pressed && event.buttons ) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        const minWidth = this.matTableRef.nativeElement.children[0].children[0].children[index].children[0].clientWidth;
        
        if ( (this.currentResizeIndex === index && width > minWidth + 16) ) {
          if (index === 0 && this.isResizingRight && this.matTableRef.nativeElement.children[0].children[0].children[0].children[0].clientWidth + 40 < this.matTableRef.nativeElement.children[0].children[0].children[0].clientWidth) {
            this.setColumnWidthChanges(index, width);
          } else if (index === 1 && this.matTableRef.nativeElement.children[0].children[0].children[0].classList.contains('table__dropdown')) {
            this.setColumnWidthChanges(index, width);
          } else if (index === 1 && !this.matTableRef.nativeElement.children[0].children[0].children[0].classList.contains('table__dropdown')) {
            const prevMinWidth = this.matTableRef.nativeElement.children[0].children[0].children[index - 1].children[0].clientWidth + 40;
            const prevWidth = this.matTableRef.nativeElement.children[0].children[0].children[index - 1].clientWidth;

            if (!this.isResizingRight && prevMinWidth < prevWidth) {
              this.setColumnWidthChanges(index, width);
            } else if (this.isResizingRight) {
              this.setColumnWidthChanges(index, width);
            }
          } else if (index > 1 && index + 1 === this.displayedColumnsArray.length && !this.isResizingRight) {
            this.setColumnWidthChanges(index, width);
          } else if (index > 1 && index + 1 !== this.displayedColumnsArray.length) {
            const prevMinWidth = this.matTableRef.nativeElement.children[0].children[0].children[index - 1].children[0].clientWidth + 18;
            const prevWidth = this.matTableRef.nativeElement.children[0].children[0].children[index - 1].clientWidth;

            if (!this.isResizingRight && prevMinWidth < prevWidth) {
              this.setColumnWidthChanges(index, width);
            } else if (this.isResizingRight) {
              this.setColumnWidthChanges(index, width);
            }
          }
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  setColumnWidthChanges(index: number, width: number) {    
    const orgWidth = this.displayedColumns[index].width;
    const dx = width - orgWidth;
    if ( dx !== 0 ) {
      const j = ( this.isResizingRight ) ? index + 1 : index - 1;
      const newWidth = this.displayedColumns[j].width - dx;
      const minWidth = this.matTableRef.nativeElement.children[0].children[0].children[j].children[0].clientWidth;
      
      if ( newWidth > minWidth + 16) {
          this.displayedColumns[index].width = width;
          this.setColumnWidth(this.displayedColumns[index]);
          this.displayedColumns[j].width = newWidth;
          this.setColumnWidth(this.displayedColumns[j]);
      } else if ( newWidth < minWidth + 16) {
        this.displayedColumns[index].width = width;
        this.setColumnWidth(this.displayedColumns[index]);
      }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from( this.matTableRef.nativeElement.getElementsByClassName('mat-column-' + column.column));
    columnEls.forEach(( el: HTMLDivElement ) => {
      el.style.width = column.width + 'px';
    });
    this.perfectScroll.directiveRef.update();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  changePageSize() {
    this.updateWidth()
    this.perfectScroll.directiveRef.update();
  }

}