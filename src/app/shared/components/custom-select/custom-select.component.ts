import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rms-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomSelectComponent implements OnInit {
  @Input() selectOptions: Array<string>;
  @Input() isHuge;
  @Input() selectedOption;
  @Output() onSelectChange = new EventEmitter();
  constructor() { }
  
  ngOnInit(): void {
  }

  onSelect(val) {
    this.onSelectChange.emit(val);
  }

}
