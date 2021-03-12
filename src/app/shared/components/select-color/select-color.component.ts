import { Component, OnInit, Inject, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rms-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectColorComponent implements OnInit {
  @Input() color: string = '#e920e9';
  @Output() onChangeColor = new EventEmitter();
  constructor() { }

  changeColor(e) {
    this.onChangeColor.emit(e);
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  ngOnInit(): void {
  }
}
