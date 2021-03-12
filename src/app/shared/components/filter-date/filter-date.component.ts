import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
      dateInput: 'MM/DD/YYYY'
  },
  display: {
      dateInput: 'MM/DD/YY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'MM/DD/YY',
      monthYearA11yLabel: 'MMM YY',
  }
};

@Component({
  selector: 'rms-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterDateComponent implements OnInit {
  @Input() title: string;
  selectOption: Array<string> = ['Reset', 'Between', 'Equals'];
  form: FormGroup;
  @Input() rangeMode: boolean = true;
  @Output() onDateChange = new EventEmitter();
  @Input() PassedformControl: FormControl;
  selected;

  constructor() {
  }

  ngOnInit(): void {
    this.selected = this.rangeMode ? this.selectOption[1] : this.selectOption[2];
    if (this.rangeMode) {
      this.PassedformControl.reset();
      this.PassedformControl.setValue({begin: new Date(), end: new Date()});
    } else {
      this.PassedformControl.reset();
      this.PassedformControl.setValue(new Date());
    }
  }

  onDate(val) {
    this.onDateChange.emit(val);
  }
  reset() {
    if (this.rangeMode) {
      this.PassedformControl.reset();
      this.PassedformControl.setValue(
        {begin: new Date(), end: new Date()}
      );
    } else {
      this.PassedformControl.reset();
      this.PassedformControl.setValue(
        new Date()
      );
    }
  }

  onChange(val) {
    if (val === 'Between') {
      this.rangeMode = true;
      this.PassedformControl.reset();
      this.PassedformControl.setValue(
        {begin: new Date(), end: new Date()}
      );
    }

    if (val === 'Equals') {
      this.rangeMode = false;
      this.PassedformControl.reset();
      this.PassedformControl.setValue(
        new Date()
      );
    }

    if (val === 'Reset') {
      if (this.rangeMode) {
        this.PassedformControl.setValue(
          {begin: new Date(), end: new Date()}
        );
      } else {
        this.PassedformControl.setValue(
          new Date()
        );
      }
    }
  }

}
