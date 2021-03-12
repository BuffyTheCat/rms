import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from './shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule }   from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { APP_EFFECTS, appReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AngularSplitModule } from 'angular-split';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { MY_FORMATS } from './shared/components/filter-date/filter-date.component';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from 'saturn-datepicker';
import { QueueService } from './services/queueService.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatChipsModule } from '@angular/material/chips';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    EffectsModule.forRoot(APP_EFFECTS),
    StoreModule.forRoot(appReducers),
    AngularSplitModule.forRoot(),
    CommonModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatListModule,
    MatTooltipModule,
    PerfectScrollbarModule
  ],
  providers: [
    AuthenticationService,
    CookieService,
    QueueService,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
