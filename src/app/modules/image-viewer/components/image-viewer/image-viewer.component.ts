import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { UpdateAllComponent } from 'src/app/modules/workflow/components/update-all/update-all.component';
import { SelectDestinationQueueComponent } from 'src/app/modules/workflow/components/select-destination-queue/select-destination-queue.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { getNotesForDocumentAction } from 'src/app/store/main/main.action';
import { getNotesForDocument } from 'src/app/shared/interfaces/queued-items-interface';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SplitComponent } from 'angular-split';

@Component({
  selector: 'rms-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit {
  imageViewerForm: FormGroup;
  isLeftSideHorisontal: boolean = true;
  isRightSideHorisontal: boolean = true;
  viewerPages: number = 3;
  isFullSizeLeft: boolean = false;
  isFullSize: boolean = false;
  startX: number;
  pressed: boolean = false;
  startWidth: number;
  different: number = 9;
  differentRight: number = 9;
  documentEditorWidth: string;
  documentEditorRightWidth: string;
  information: string = 'Account: 30065432154; Patient Name: MONTANA; RYAN';
  resizableMousemove: () => void;
  resizableMouseup: () => void;
  
  imgagesLeft: Array<string> = ['../../../../../assets/icons/image-viewer.png', '../../../../../assets/icons/image-viewer2.png'];
  imgagesRight: Array<string> = ['../../../../../assets/icons/image-viewer.png', '../../../../../assets/icons/image-viewer2.png'];
  sizeValues: Array<string> = ['10', '25', '50', '75', '90', '100', '150', '200', '400', '800'];
  activeImageLeft: number = 1;
  activeImageRight: number = 1;
  sizeLeft: string = '100';
  sizeRight: string = '100';
  leftRotate: number = 0;
  rightRotate: number = 0;
  leftImageWidth: number = 0;
  rightImageWidth: number = 0;

  quantityOptions: string[] = ['image 1', 'image 2'];
  quantitySelectedOption: string = 'image 1';
  options: string[] = ['One', 'Two', 'Three'];
  optionsLeft: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  filteredOptionsLeft: Observable<string[]>;
  myControl = new FormControl();

  printOptions: string[] = ['Print the current page', 'Print the entire document'];
  isOpen:boolean = false;
  
  myControlLeft = new FormControl();
  @ViewChild('imageLeft') imageLeft: ElementRef<any>;
  @ViewChild('imageRight') imageRight: ElementRef<any>;
  @ViewChild("splitEl") splitEl: SplitComponent;

  constructor(public dialog: MatDialog, private renderer: Renderer2, private fb: FormBuilder, private titleService: Title, private store: Store<AppState>, private ngZone: NgZone) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterLeft(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsLeft.filter(optionLeft => optionLeft.toLowerCase().includes(filterValue));
  }
  

  private _createForm() {
    this.imageViewerForm = this.fb.group({
      imagesRight: ['', []],
      imagesLeft: ['', []]
    })
  }

  ngOnInit(): void {
    this._createForm();
    this.titleService.setTitle(this.information);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsLeft = this.myControlLeft.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterLeft(value))
    );

    setTimeout(() => {
      this.leftImageWidth = this.imageLeft.nativeElement.offsetWidth;
      this.rightImageWidth = this.imageRight.nativeElement.offsetWidth;
    }, 500);
  }

  selectOpen(ev) {
    this.isOpen = !this.isOpen
  }

  onPressPrint(val) {
    console.log(val);
  }

  onChangeSelectedImage(e) {
    this.activeImageLeft = parseInt(e.replace(/[^0-9]/g,''));
  }

  onChangeRightSelectedImage(e) {
    this.activeImageRight = parseInt(e.replace(/[^0-9]/g,''));
  }

  changeLeftImage() {
    if (this.activeImageLeft > this.imgagesLeft.length) {
      this.activeImageLeft = this.imgagesLeft.length;
      console.log(this.activeImageLeft );
    }
  }

  ngAfterViewInit() {
    this.splitEl.dragProgress$.subscribe(x => {
      this.ngZone.run(() => {
        this.leftImageWidth = this.imageLeft.nativeElement.offsetWidth;
        this.rightImageWidth = this.imageRight.nativeElement.offsetWidth;
      });
    });
  }

  changeSizeLeft(e) {
    this.isFullSizeLeft = true;
  }

  changeSizeRight(e) {
    this.isFullSize = true;
  }

  onPressFullscreenLeft() {
    this.isFullSizeLeft = true;
    this.sizeLeft = '100';
    console.log('onPressFullscreenLeft');  
  }

  onPressFullscreen() {
    this.isFullSize = true;
    this.sizeRight = '100';
    console.log('onPressFullscreen');  
  }

  onPressFullscreenExit() {
    this.isFullSize = false;
    this.sizeRight = '100';
    console.log('onPressFullscreenExit');  
  }

  onPressFullscreenExitLeft() {
    this.isFullSizeLeft = false;
    this.sizeLeft = '100';
    console.log('onPressFullscreenExitLeft');  
  }

  onPressRotate() {
    this.leftRotate += 90;

    if ((this.leftRotate / 90) % 2 === 0) {
      this.isLeftSideHorisontal = true;
    } else {
      this.isLeftSideHorisontal = false;
    }
  }

  onPressRotateRight() {
    this.rightRotate += 90;

    if ((this.rightRotate / 90) % 2 === 0) {
      this.isRightSideHorisontal = true;
    } else {
      this.isRightSideHorisontal = false;
    }
  }

  onPressExport() {
    console.log('onPressExport');  
  }

  onPressNotes() {
    console.log('onPressNotes');
    const getNotes: getNotesForDocument = {
      "service" : "com.rms.mbx.gui.client.encounter.EncounterService",
      "method" : "getNotesForDocument",
      "params" : {
        "fileId" : 6128
      }
    }

    this.store.dispatch(getNotesForDocumentAction(getNotes));
  }

  onPressZoom() {
    if (this.sizeValues.indexOf(this.sizeLeft) + 1 !== this.sizeValues.length) {
      let index  = this.sizeValues.indexOf(this.sizeLeft) + 1;
      this.sizeLeft = this.sizeValues[index];
    }
  }

  onPressZoomRight() {
    if (this.sizeValues.indexOf(this.sizeRight) + 1 !== this.sizeValues.length) {
      let index  = this.sizeValues.indexOf(this.sizeRight) + 1;
      this.sizeRight = this.sizeValues[index];
    }
  }

  onPressZoomOut() {
    if (this.sizeValues.indexOf(this.sizeLeft) !== 0) {
      let index  = this.sizeValues.indexOf(this.sizeLeft) - 1;
      this.sizeLeft = this.sizeValues[index];
    }
  }

  onPressZoomOutRight() {
    if (this.sizeValues.indexOf(this.sizeRight) !== 0) {
      let index  = this.sizeValues.indexOf(this.sizeRight) - 1;
      this.sizeRight = this.sizeValues[index];
    }
  }

  onPressToStart() {
    console.log('onPressToStart');  
    this.activeImageLeft = 1;
  }

  onPressToStartRight() {
    console.log('onPressToStartRight');  
    this.activeImageRight = 1;
  }

  onPressToPrev() {
    console.log('onPressToPrev');
    if (this.activeImageLeft - 1 >= 1) {
      this.activeImageLeft = this.activeImageLeft - 1;
    } 
  }

  onPressToPrevRight() {
    console.log('onPressToPrevRight');
    if (this.activeImageRight - 1 >= 1) {
      this.activeImageRight = this.activeImageRight - 1;
    } 
  }

  onPressToNext() {
    console.log('onPressToNext');  

    if (this.activeImageLeft + 1 <= this.imgagesLeft.length) {
      this.activeImageLeft = this.activeImageLeft + 1;
    }  
  }

  onPressToNextRight() {
    console.log('onPressToNextRight');  

    if (this.activeImageRight + 1 <= this.imgagesRight.length) {
      this.activeImageRight = this.activeImageRight + 1;
    }  
  }

  onPressToLast() {
    console.log('onPressToLast');
    this.activeImageLeft = this.imgagesLeft.length;
  }

  onPressToLastRight() {
    console.log('onPressToLastRight');
    this.activeImageRight = this.imgagesRight.length;
  }
}
