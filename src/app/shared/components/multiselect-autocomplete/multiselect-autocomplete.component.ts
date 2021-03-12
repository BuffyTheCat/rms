import { ElementRef, HostBinding, Component, OnInit, ViewChild, forwardRef, Input, Optional, Self, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl, NgControl } from '@angular/forms';


export class ItemList {
  constructor(public item: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'multiselect-autocomplete',
  templateUrl: 'multiselect-autocomplete.component.html',
  styleUrls: ['multiselect-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: MultiselectAutocomplete }]  
})
export class MultiselectAutocomplete implements OnInit {
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  selectable = true;
  removable = true;
  @Input() itemsArray: Array<string> = ['1', '2', '3'];
  @Input() title: string = 'Selected Codes';
  @Input() inputPlaceholder: string = 'Enter payer name';
  toHighlight: string = '';

  onContainerClick(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild('inputTrigger', { read: MatAutocompleteTrigger }) inputTrigger: MatAutocompleteTrigger;
  itemControl: FormControl;
  stateChanges = new Subject<void>();
  private _placeholder: string;
  static nextId = 0;
  @HostBinding() id = `input-ac-${MultiselectAutocomplete.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }
  @Input() set value(value: any) {
    if ( value ){
      this.selectedItems = value;
    }
    this.stateChanges.next();
  }
  get value() {
    return this.selectedItems;
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private changeCallback: Function;
  private touchedCallback: Function;
  focused = false;
  isAllSelected = false;


  items = [];
  selectedItems: ItemList[] = new Array<ItemList>();
  filteredItems: ItemList[];
  
  // filteredItems: Observable<ItemList[]>;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef
  ) {
    this.itemControl = new FormControl();
    
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  remove(item: ItemList) {
    this.toggleSelection(item);
  }

  reset() {
    this.itemControl.reset();
  }


  writeValue(value: any) {
    
  }

  registerOnChange(fn: Function) {
    this.changeCallback = fn;
  }
  registerOnTouched(fn: Function) {
    this.touchedCallback = fn;
  }

  lastFilter = '';

  ngOnInit() {
    for (let i = 0; i < this.itemsArray.length; i++) { 
      this.items.push(new ItemList(this.itemsArray[i]))
    }
    this.itemControl.valueChanges.pipe(
      startWith<string | ItemList[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    ).subscribe(data => this.filteredItems = data);
    
  }

  clicker() {
    this.inputTrigger.openPanel();
  }

  filter(filter: string): ItemList[] {    
    this.lastFilter = filter;
    this.toHighlight = filter;
    
    if (filter) {
      return this.items.filter(option => {
        return option.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.items.slice();
    }
  }

  optionClicked(event: Event, item: ItemList) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelection(item: ItemList) {
    
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedItems.push(item);
      this.changeCallback(this.selectedItems);
    } else {
      const i = this.selectedItems.findIndex(value => value.item === item.item );
      this.selectedItems.splice(i, 1);
      this.changeCallback(this.selectedItems);
    }

  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }
}

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string, ctrlValue: string): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');
    return (search && ctrlValue) ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }
}
