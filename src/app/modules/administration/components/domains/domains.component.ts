import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Observable } from 'rxjs';
import { NestedListComponent } from 'src/app/shared/components/nested-list/nested-list.component';
import { GetParams, userInfo } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { changeAssignedDomainsAction, changeAssignedQueueAction, getUserInfoAction, moveAssignedDashboardItemAction, moveAssignedProfilesItemAction, moveAssignedReportsItemAction, moveAssignedRolesItemAction, moveToAssignedDashboardAction, moveToAssignedDashboardListAction, moveToAssignedProfilesAction, moveToAssignedProfilesListAction, moveToAssignedReportsAction, moveToAssignedReportsListAction, moveToAssignedRolesAction, moveToAssignedRolesListAction, moveToUnassignedDashboardAction, moveToUnassignedDashboardListItemAction, moveToUnassignedProfilesAction, moveToUnassignedProfilesListItemAction, moveToUnassignedReportsAction, moveToUnassignedReportsListItemAction, moveToUnassignedRolesAction, moveToUnassignedRolesListItemAction, moveUnassignedDashboardItemAction, moveUnassignedProfilesItemAction, moveUnassignedReportsItemAction, moveUnassignedRolesItemAction } from 'src/app/store/main/main.action';
import { StyleGuideComponent } from '../style-guide/style-guide.component';

@Component({
  selector: 'rms-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationDomainsComponent implements OnInit {
  provider = 'RMS QA Domain';
  @ViewChild('tabGroup') tabGroup;
  @ViewChild('styleGuide') styleGuide:StyleGuideComponent;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.tab.textLabel === 'branding') {
      setTimeout(() => {
        this.styleGuide.setSelectedRows();
      }, 500);
    }
  }
}
