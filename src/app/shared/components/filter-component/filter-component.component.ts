import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, Renderer2, ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppState } from 'src/app/store';

@Component({
  selector: 'rms-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponentComponent implements OnInit {
  @Input() title: string;
  @Input() options: string[] = [];
  @Input() selectOption: Array<string>;  
  @Input() selectedOption?: Observable<string>;  
  @Input() dropdown: boolean = false;  
  @Input() disabled: boolean = false;
  @Input() moneyField: boolean = false;
  @Input() shortDropdown: boolean = false;  
  isOpen:boolean = false;
  @Input() PassedformControl: FormControl;
  @Output() onChangeSelect = new EventEmitter();
  @Output() onChangeSearchOption = new EventEmitter();
  textFieldOperators: string[] = ['Is', 'Starts with', 'Ends with', 'Contains', 'Does not contain'];
  moneyFieldOperators: string[] = ['Equals', 'Less than', 'Greater than', 'Greater than or equals', 'Lesser than or equals', 'Between'];

  @ViewChild('perfectScrollSelect') perfectScrollSelect: PerfectScrollbarComponent;
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;

  constructor(private store: Store<AppState>, private overlayContainer:OverlayContainer, private renderer:Renderer2 ) {
    const disableAnimations:boolean = true;
    const overlayContainerElement:HTMLElement = this.overlayContainer.getContainerElement();
    this.renderer.setProperty( overlayContainerElement, "@.disabled", disableAnimations );
  }

  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    if (this.moneyField) {
      this.textFieldOperators = this.moneyFieldOperators;
    }
    if (this.selectedOption) {
      this.PassedformControl.setValue(`${this.selectedOption}`);
    }
    this.filteredOptions = this.PassedformControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedOption) {
      this.PassedformControl.setValue(this.selectedOption);
    }
  }


  changeSearchOption(e) {
    this.onChangeSearchOption.emit(e);
  }

  onSelect(val) {
    this.onChangeSelect.emit(val);
  }
  
  selectOpen(ev) {
    setTimeout(() => {
      this.perfectScrollSelect.directiveRef.update();
    }, 1000);
    this.isOpen = !this.isOpen
  }


  autocompleteOpened(ev) {
    this.isOpen = true;
  }

  autocompleteClosed(ev) {
    this.isOpen = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
