import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { addDocumentNoteAction } from 'src/app/store/main/main.action';
import { addDocumentNote, note } from 'src/app/shared/interfaces/queued-items-interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'rms-document-notes',
  templateUrl: './document-notes.component.html',
  styleUrls: ['./document-notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentNotesComponent implements OnInit {
  notesForm: FormGroup;
  selectedRow: note = {
    "id": null,
    "date": null,
    "text": '',
    "domainId": null,
    "userId": null,
    "userName": ''
  };
  dataSource;
  tableDataResult;
  displayedColumnsArray;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('textarea') textarea: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) { }

  private _createForm() {
    this.notesForm = this.fb.group({
      title: ['', []],
      description: ['', [Validators.maxLength(2048),]],
    })
  }

  get _title() {
    return this.notesForm.get('title')
  }

  get _description() {
    return this.notesForm.get('description')
  }

  onPressSave() {
    const note: addDocumentNote = {
      "service" : "com.rms.mbx.gui.client.encounter.EncounterService",
      "method" : "addDocumentNote",
      "params" : {
        "noteText" : this.notesForm.value.description,
        "archivedFileId" : this.selectedRow.id
      }
    }
    this.store.dispatch(addDocumentNoteAction(note));
    console.log('all chenged data', this.tableDataResult);
    
  }

  ngOnInit(): void {
    this._createForm();
    this.tableDataResult = this.data.map((item) => {
      return {
        ...item,
        date: moment(item.dateOfService).format("MM/DD/YYYY")
      }
    })
    this.displayedColumnsArray = this.displayedColumnsResult.map((item) => item.column);
    this.dataSource = new MatTableDataSource(this.tableDataResult);
  }

  onPressDelete() {
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        question: 'Are you sure you want to delete this note?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.tableDataResult.indexOf(this.selectedRow)
        if (index === -1) {
          return
        }
        this.tableDataResult.splice(index, 1);
        this.table.renderRows();
        this.selectedRow = {
          "id": null,
          "date": null,
          "text": '',
          "domainId": null,
          "userId": null,
          "userName": ''
        }
      } else {
        return
      }
    });
  }
  
  onPressClose() {

  }
  
  onPressAdd() {
    
    let newItem = {
      "id" : this.tableDataResult.length !== 0 ? this.tableDataResult[this.tableDataResult.length - 1].id + 1 : 1,
      "date" : moment().format("MM/DD/YYYY"),
      "text" : "",
      "domainId" : 2,
      "userId" : 27,
      "userName" : "testuser2"
    }
    this.tableDataResult.splice(this.tableDataResult.length, 0, newItem);
    this.table.renderRows();
    this.selectedRow = this.tableDataResult[this.tableDataResult.length - 1];
    this.textarea.nativeElement.focus();
  }

  selectRow(row) {
    this.selectedRow = row;
  }

  displayedColumnsResult = [
    {
      title: 'User',
      column: 'userName',
      width: 100,
    },
    {
      title: 'Date',
      column: 'date',
      width: 100,
    },
    {
      title: 'Text',
      column: 'text',
      width: 500,
    }
  ];
}
