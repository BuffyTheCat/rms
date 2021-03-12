import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'rms-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
  @Output() onSearch = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Input() title: string = 'Filters';
  @Input() search: string = 'Search';
  @Input() clear: string = 'Clear';
  @Input() disabled: boolean = false;

  opened: boolean = true;
  constructor() { }

  switchFilter() {
    this.opened = !this.opened; 
  }

  onPressSearch() {
    this.onSearch.emit();
  }

  onPressClear() {
    this.onClear.emit();
  }


  ngOnInit(): void {
    // this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
    //   console.log('<ENTER> search');
    //   this.onPressSearch();
    //   return false;
    // }));
  }

}
