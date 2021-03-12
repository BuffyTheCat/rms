import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { logoutAction } from 'src/app/store/logout/logout.action';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { changeGlobalProviderAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() directory: string;
  @Input() user;
  @Input() userParams: Array<string>;
  @Input() logoPath: string;
  @Input() providers: string[] = ['One', 'Two', 'Three'];
  @Input() selectedOption?: string;  
  isOpen:boolean = false;
  selectProviders: Observable<string[]>;

  constructor(private store: Store<AppState>) { }
  providerFormControl = new FormControl();

  ngOnInit(): void {
    this.providerFormControl.setValue(this.selectedOption ? this.selectedOption : null);
    this.selectProviders = this.providerFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.providers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectChange(val) {
    if (val === 'Logout') {
      this.store.dispatch(logoutAction());
    }
  }

  selectOpen(ev) {
    this.isOpen = !this.isOpen
  }


  autocompleteOpened(ev) {
    this.isOpen = true;
  }

  autocompleteClosed(ev) {
    this.isOpen = false;
  }

  onChangeProvider(val) {
    this.store.dispatch(changeGlobalProviderAction({provider: val}))
  }
}
