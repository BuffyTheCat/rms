import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAllComponent } from '../update-all/update-all.component';
import { SelectDestinationQueueComponent } from '../select-destination-queue/select-destination-queue.component';


@Component({
  selector: 'rms-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentEditorComponent implements OnInit {
  @Input() totalAmount: string;
  @Input() totalItems: string;
  @Input() doc: string;
  @Input() imgPath: Array<string>;
  @Input() linkEncounter: boolean = true;

  @Output() onCompleteDocument = new EventEmitter();
  @Output() onHoldDocument = new EventEmitter();
  @Output() onDeliteDocument = new EventEmitter();
  @Output() onUnprocessedDocument = new EventEmitter();

  isFullSize: boolean = false;
  activeSlide: number = 1;
  sizeValues: Array<string> = ['10', '25', '50', '75', '90', '100', '150', '200', '400', '800'];
  size: string = '100';
  printOptions: string[] = ['Print the current page', 'Print the entire document'];
  isOpen:boolean = false;
  ruler: boolean = false;
  rightRotate: number = 0;
  isRightSideHorisontal: boolean = true;
  rightImageWidth: number = 0;

  
  @Output() onClear = new EventEmitter();
  @ViewChild('imageWrap') imageWrap: ElementRef<any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.rightImageWidth = this.imageWrap.nativeElement.offsetWidth;
      console.log(this.imageWrap.nativeElement.offsetWidth);
      console.log(this.rightImageWidth);
      
    }, 1000);
  }
  

  changeSize(e) {
    this.isFullSize = true;
  }

  onPressComplete() {
    this.onCompleteDocument.emit();
  }

  onPressHold() {
    this.onHoldDocument.emit();  
  }

  onPressDelite() {
    this.onDeliteDocument.emit();  
  }

  onPressUnprocecced() {
    this.onUnprocessedDocument.emit();
  }

  onPressRuler() {
    this.ruler = !this.ruler;
  }

  onPressLinkEncounterNumber() {
    console.log('onPressLinkEncounterNumber');  
  }

  onPressMoveToRemitPost() {
    const dialogRef = this.dialog.open(SelectDestinationQueueComponent);
  }

  onPressFullscreen() {
    this.isFullSize = true;
    this.size = '100';
    console.log('onPressFullscreen');  
  }

  onPressFullscreenExit() {
    this.isFullSize = false;
    this.size = '100';
    console.log('onPressFullscreenExit');  
  }

  
  onPressUpdateAll() {
    const dialogRef = this.dialog.open(UpdateAllComponent);
  }

  onPressRotate() {
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

  onPressPrint(e) {
    console.log('onPressPrint');  
  }

  onPressNotes() {
    console.log('onPressNotes');  
  }

  selectOpen(ev) {
    this.isOpen = !this.isOpen
  }

  onPressZoom() {
    this.isFullSize = true;
    if (this.sizeValues.indexOf(this.size) + 1 !== this.sizeValues.length) {
      let index  = this.sizeValues.indexOf(this.size) + 1;
      this.size = this.sizeValues[index];
    }
  }

  onPressZoomOut() {
    this.isFullSize = true;
    if (this.sizeValues.indexOf(this.size) !== 0) {
      let index  = this.sizeValues.indexOf(this.size) - 1;
      this.size = this.sizeValues[index];
    }
  }

  onPressToStart() {
    console.log('onPressToStart'); 
    this.activeSlide = 1;
  }

  onPressToPrev() {
    console.log('onPressToPrev');  

    if (this.activeSlide - 1 >= 1) {
      this.activeSlide = this.activeSlide - 1;
    }  
  }

  onPressToNext() {
    console.log('onPressToNext');
    
    if (this.activeSlide + 1 <= this.imgPath.length) {
      this.activeSlide = this.activeSlide + 1;
    }  
  }

  onPressToLast() {
    console.log('onPressToLast');  
    this.activeSlide = this.imgPath.length;
  }
}
