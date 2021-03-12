import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'rms-filter-with-tabs',
  templateUrl: './filter-with-tabs.component.html',
  styleUrls: ['./filter-with-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterWithTabsComponent implements OnInit {
  @Input() searchTabs: boolean = false; 
  @Input() label: string = 'Destination Queues'; 
  @Input() secondLabel: string = 'Search';
  @Output() onSearch = new EventEmitter();
  @Output() onSearchFirst = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onClearFirst = new EventEmitter();

  opened: boolean = true;
  constructor() { }

  onPressSearch() {
    this.onSearch.emit();
  }

  onPressClear() {
    this.onClear.emit();
  }

  onPressSearchFirst() {
    this.onSearchFirst.emit();
  }

  onPressClearFirst() {
    this.onClearFirst.emit();
  }

  switchFilterWithTabs() {
    this.opened = !this.opened; 
  }


  ngOnInit(): void {
    // this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
    //   console.log('<ENTER> search');
    //   this.onPressSearch();
    //   return false;
    // }));
  }

}
