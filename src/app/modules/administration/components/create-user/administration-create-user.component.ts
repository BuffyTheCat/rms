import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Observable } from 'rxjs';
import { NestedListComponent } from 'src/app/shared/components/nested-list/nested-list.component';
import { GetParams, userInfo } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { changeAssignedDomainsAction, changeAssignedQueueAction, getUserInfoAction, moveAssignedDashboardItemAction, moveAssignedProfilesItemAction, moveAssignedReportsItemAction, moveAssignedRolesItemAction, moveToAssignedDashboardAction, moveToAssignedDashboardListAction, moveToAssignedProfilesAction, moveToAssignedProfilesListAction, moveToAssignedReportsAction, moveToAssignedReportsListAction, moveToAssignedRolesAction, moveToAssignedRolesListAction, moveToUnassignedDashboardAction, moveToUnassignedDashboardListItemAction, moveToUnassignedProfilesAction, moveToUnassignedProfilesListItemAction, moveToUnassignedReportsAction, moveToUnassignedReportsListItemAction, moveToUnassignedRolesAction, moveToUnassignedRolesListItemAction, moveUnassignedDashboardItemAction, moveUnassignedProfilesItemAction, moveUnassignedReportsItemAction, moveUnassignedRolesItemAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-administration-create-user',
  templateUrl: './administration-create-user.component.html',
  styleUrls: ['./administration-create-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationCreateUserComponent implements OnInit {
  userInfoForm: FormGroup;
  dashboardsForm: FormGroup;
  reportsForm: FormGroup;
  domainsForm: FormGroup;
  queuesForm: FormGroup;
  login: boolean = true;
  external: boolean = false;
  userInfo$: Observable<any>;
  userInfo: userInfo;
  category: string = 'admin'
  categoryReports: string = 'Daily Acitivity';
  categoryDomains: string = 'RMS QA Domain';
  categoryQueue: string = 'Queue 1';

  items$: Observable<any>;
  itemData;
  passedData: number = null;
  
  passExpires: string = 'June 21st, 2018'
  provider = 'RMS QA Domain';

  selection = new SelectionModel(true, []);
  selectionRight = new SelectionModel(true, []);
  selectionRoles = new SelectionModel(true, []);
  selectionRolesRight = new SelectionModel(true, []);
  selectionDashboard = new SelectionModel(true, []);
  selectionDashboardRight = new SelectionModel(true, []);
  selectionReports = new SelectionModel(true, []);
  selectionReportsRight = new SelectionModel(true, []);
  
  @ViewChild('tableUnassigned') tableUnassigned: MatTable<any>;
  @ViewChild('tableAssigned') tableAssigned: MatTable<any>;
  @ViewChild('tableRolesUnassigned') tableRolesUnassigned: MatTable<any>;
  @ViewChild('tableRolesAssigned') tableRolesAssigned: MatTable<any>;
  @ViewChild('tableDashboardUnassigned') tableDashboardUnassigned: MatTable<any>;
  @ViewChild('tableDashboardAssigned') tableDashboardAssigned: MatTable<any>;
  @ViewChild('tableReportsUnassigned') tableReportsUnassigned: MatTable<any>;
  @ViewChild('tableReportsAssigned') tableReportsAssigned: MatTable<any>;

  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;
  @ViewChild('perfectScrollRight') perfectScrollRight: PerfectScrollbarComponent;
  @ViewChild('perfectScrollRoles') perfectScrollRoles: PerfectScrollbarComponent;
  @ViewChild('perfectScrollRolesRight') perfectScrollRolesRight: PerfectScrollbarComponent;
  @ViewChild('perfectScrollDashboard') perfectScrollDashboard: PerfectScrollbarComponent;
  @ViewChild('perfectScrollDashboardRight') perfectScrollDashboardRight: PerfectScrollbarComponent;
  @ViewChild('perfectScrollReports') perfectScrollReports: PerfectScrollbarComponent;
  @ViewChild('perfectScrollReportsRight') perfectScrollReportsRight: PerfectScrollbarComponent;
  
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  private _createForm() {
    this.userInfoForm = this.fb.group({
      firstName: [this.passedData && this.itemData.firstName ? this.itemData.firstName : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[A-Za-z]+$")
      ]],
      username: [this.passedData && this.itemData.userName ? this.itemData.userName : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[A-Za-z0-9]+$")
      ]],
      middleName: [this.passedData && this.itemData.middleName ? this.itemData.middleName : '', [
        Validators.maxLength(200),
      ]],
      email: [this.passedData && this.itemData.email ? this.itemData.email : '', [
        Validators.required, 
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$")
      ]],
      lastName: [this.passedData && this.itemData.lastName ? this.itemData.lastName : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[A-Za-z]+$")
      ]],
      organization: [this.passedData && this.itemData.organization ? this.itemData.organization : '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
        Validators.pattern("^[A-Za-z0-9]+$")
      ]],
    })
  }
  
  ngOnInit(): void {
    const getUserInfo: GetParams = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "userId" : "123123132",
      }
    }
    this.store.dispatch(getUserInfoAction(getUserInfo));

    this.userInfo$ = this.store.select(s => s.queue.userInfo);
    this.userInfo$.subscribe(i => {
      this.userInfo = i;
    });

    if (history.state.itemId) {
      this.passedData = history.state.itemId;
      console.log('passed data:', this.passedData);

      this.items$ = this.store.select(s => s.queue.items);
      this.items$.subscribe(i => {
        this.itemData = i.find(x => x.queueItemId === this.passedData)
      });
      this._createForm();
      setTimeout(() => {
        this.perfectScroll.directiveRef.update();
        this.perfectScrollRight.directiveRef.update();
        this.perfectScrollRoles.directiveRef.update();
        this.perfectScrollRolesRight.directiveRef.update();
        this.perfectScrollDashboard.directiveRef.update();
        this.perfectScrollDashboardRight.directiveRef.update();
        this.perfectScrollReports.directiveRef.update();
        this.perfectScrollReportsRight.directiveRef.update();
      }, 2000);
     
    } else {
      this._createForm();
      setTimeout(() => {
        this.perfectScroll.directiveRef.update();
        this.perfectScrollRight.directiveRef.update();
        this.perfectScrollRoles.directiveRef.update();
        this.perfectScrollRolesRight.directiveRef.update();
        this.perfectScrollDashboard.directiveRef.update();
        this.perfectScrollDashboardRight.directiveRef.update();
        this.perfectScrollReports.directiveRef.update();
        this.perfectScrollReportsRight.directiveRef.update();
      }, 2000);
    }

  }

  get _firstName() {
    return this.userInfoForm.get('firstName')
  }

  get _username() {
    return this.userInfoForm.get('username')
  }

  get _middleName() {
    return this.userInfoForm.get('middleName')
  }

  get _email() {
    return this.userInfoForm.get('email')
  }

  get _lastName() {
    return this.userInfoForm.get('lastName')
  }

  get _organization() {
    return this.userInfoForm.get('organization')
  }

  onPressProfilesSave() {
    const profiles = {
      assigned: this.userInfo.profilesAssigned,
      unassigned: this.userInfo.profilesUnassigned,
    }
    console.log(profiles);
  }

  onPressRolesSave() {
    const roles = {
      assigned: this.userInfo.rolesAssigned[this.category],
      unassigned: this.userInfo.rolesUnassigned[this.category],
      category: this.category,
    }
    console.log(roles);
  }

  onPressDashboardSave() {
    const dashboard = {
      assigned: this.userInfo.dashboardAssigned,
      unassigned: this.userInfo.dashboardUnassigned,
    }
    console.log(dashboard);
  }

  onPressReportsSave() {
    const reports = {
      assigned: this.userInfo.rolesAssigned[this.categoryReports],
      unassigned: this.userInfo.rolesUnassigned[this.categoryReports],
      category: this.categoryReports,
    }
    console.log(reports);
  }

  onPressDomainsSave() {
    console.log(this.userInfo.domains, 'domains');
  }

  onPressQueueSave() {
    console.log(this.userInfo.domains, 'domains');
  }

  onPressSave() {
    if (this.userInfoForm.invalid) {
      return
    } else {
      const userInfo = {
        firstName: this.userInfoForm.value.firstName,
        username: this.userInfoForm.value.username,
        middleName: this.userInfoForm.value.middleName,
        email: this.userInfoForm.value.email,
        lastName: this.userInfoForm.value.lastName,
        organization: this.userInfoForm.value.organization,
        login: this.login,
        external: this.external,
      }
      console.log(userInfo);
    }
  }

  //checkboxes

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userInfo.profilesAssigned.length;
    return numSelected === numRows;
  }

  isAllSelectedRight() {
    const numSelected = this.selectionRight.selected.length;
    const numRows = this.userInfo.profilesUnassigned.length;
    return numSelected === numRows;
  }

  isAllSelectedRoles() {
    const numSelected = this.selectionRoles.selected.length;
    const numRows = this.userInfo.rolesAssigned[this.category].length;
    return numSelected === numRows;
  }

  isAllSelectedRolesRight() {
    const numSelected = this.selectionRolesRight.selected.length;
    const numRows = this.userInfo.rolesUnassigned[this.category].length;
    return numSelected === numRows;
  }

  isAllSelectedDashboard() {
    const numSelected = this.selectionDashboard.selected.length;
    const numRows = this.userInfo.dashboardAssigned.length;
    return numSelected === numRows;
  }

  isAllSelectedDashboardRight() {
    const numSelected = this.selectionDashboardRight.selected.length;
    const numRows = this.userInfo.dashboardUnassigned.length;
    return numSelected === numRows;
  }

  isAllSelectedReports() {
    const numSelected = this.selectionReports.selected.length;
    const numRows = this.userInfo.reportsAssigned[this.categoryReports].length;
    return numSelected === numRows;
  }

  isAllSelectedReportsRight() {
    const numSelected = this.selectionReportsRight.selected.length;
    const numRows = this.userInfo.reportsUnassigned[this.categoryReports].length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.userInfo.profilesAssigned.forEach(row => this.selection.select(row));
  }

  masterToggleRight() {
    this.isAllSelectedRight() ?
        this.selectionRight.clear() :
        this.userInfo.profilesUnassigned.forEach(row => this.selectionRight.select(row));
  }

  masterToggleRoles() {
    this.isAllSelectedRoles() ?
        this.selectionRoles.clear() :
        this.userInfo.rolesAssigned[this.category].forEach(row => this.selectionRoles.select(row));
  }

  masterToggleRolesRight() {
    this.isAllSelectedRolesRight() ?
        this.selectionRolesRight.clear() :
        this.userInfo.rolesUnassigned[this.category].forEach(row => this.selectionRolesRight.select(row));
  }

  masterToggleDashboard() {
    this.isAllSelectedDashboard() ?
        this.selectionDashboard.clear() :
        this.userInfo.dashboardAssigned.forEach(row => this.selectionDashboard.select(row));
  }

  masterToggleDashboardRight() {
    this.isAllSelectedDashboardRight() ?
        this.selectionDashboardRight.clear() :
        this.userInfo.dashboardUnassigned.forEach(row => this.selectionDashboardRight.select(row));
  }

  masterToggleReports() {
    this.isAllSelectedReports() ?
        this.selectionReports.clear() :
        this.userInfo.reportsAssigned[this.categoryReports].forEach(row => this.selectionReports.select(row));
  }

  masterToggleReportsRight() {
    this.isAllSelectedReportsRight() ?
        this.selectionReportsRight.clear() :
        this.userInfo.reportsUnassigned[this.categoryReports].forEach(row => this.selectionReportsRight.select(row));
  }

  //checkboxes end

  onPressToAssigned() {
    let items = this.selectionRight.selected;   
    this.store.dispatch(moveToAssignedProfilesListAction({items: items}));
    this.selection.clear();
    this.selectionRight.clear();
  }

  onPressToUnassigned() {
    let items = this.selection.selected;
    this.store.dispatch(moveToUnassignedProfilesListItemAction({items: items}));
    this.selection.clear();
    this.selectionRight.clear();
  }

  onPressToAssignedRoles() {
    let items = this.selectionRolesRight.selected;   
    this.store.dispatch(moveToAssignedRolesListAction({items: items, category: this.category}));
    this.selectionRoles.clear();
    this.selectionRolesRight.clear();
  }

  onPressToUnassignedRoles() {
    let items = this.selectionRoles.selected;
    this.store.dispatch(moveToUnassignedRolesListItemAction({items: items, category: this.category}));
    this.selectionRoles.clear();
    this.selectionRolesRight.clear();
  }

  onPressToAssignedDashboard() {
    let items = this.selectionDashboardRight.selected;   
    this.store.dispatch(moveToAssignedDashboardListAction({items: items}));
    this.selectionDashboard.clear();
    this.selectionDashboardRight.clear();
  }

  onPressToUnassignedDashboard() {
    let items = this.selectionDashboard.selected;
    this.store.dispatch(moveToUnassignedDashboardListItemAction({items: items}));
    this.selectionDashboard.clear();
    this.selectionDashboardRight.clear();
  }

  onPressToAssignedReports() {
    let items = this.selectionReportsRight.selected;   
    this.store.dispatch(moveToAssignedReportsListAction({items: items, category: this.categoryReports}));
    this.selectionReports.clear();
    this.selectionReportsRight.clear();
  }

  onPressToUnassignedReports() {
    let items = this.selectionReports.selected;
    this.store.dispatch(moveToUnassignedReportsListItemAction({items: items, category: this.categoryReports}));
    this.selectionReports.clear();
    this.selectionReportsRight.clear();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === this.perfectScrollRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveUnassignedProfilesItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      } else {
        this.store.dispatch(moveAssignedProfilesItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      }
    } else {
      if (event.previousContainer.id === this.perfectScrollRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveToAssignedProfilesAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      } else {
        this.store.dispatch(moveToUnassignedProfilesAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      }
    }

    this.selection.clear();
    this.selectionRight.clear();
  }

  dropRole(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === this.perfectScrollRolesRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveUnassignedRolesItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.category}));
      } else {
        this.store.dispatch(moveAssignedRolesItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.category}));
      }
    } else {
      if (event.previousContainer.id === this.perfectScrollRolesRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveToAssignedRolesAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.category}));
      } else {
        this.store.dispatch(moveToUnassignedRolesAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.category}));
      }
    }
    this.selectionRoles.clear();
    this.selectionRolesRight.clear();
  }

  dropDashboard(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === this.perfectScrollDashboardRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveUnassignedDashboardItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      } else {
        this.store.dispatch(moveAssignedDashboardItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      }
    } else {
      if (event.previousContainer.id === this.perfectScrollDashboardRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveToAssignedDashboardAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      } else {
        this.store.dispatch(moveToUnassignedDashboardAction({prevIndex: event.previousIndex, currIndex: event.currentIndex}));
      }
    }
    this.selectionDashboard.clear();
    this.selectionDashboardRight.clear();
  }

  dropReports(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id === this.perfectScrollReportsRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveUnassignedReportsItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.categoryReports}));
      } else {
        this.store.dispatch(moveAssignedReportsItemAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.categoryReports}));
      }
    } else {
      if (event.previousContainer.id === this.perfectScrollReportsRight.directiveRef.elementRef.nativeElement.parentElement.id) {
        this.store.dispatch(moveToAssignedReportsAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.categoryReports}));
      } else {
        this.store.dispatch(moveToUnassignedReportsAction({prevIndex: event.previousIndex, currIndex: event.currentIndex, category: this.categoryReports}));
      }
    }
    this.selectionReportsRight.clear();
    this.selectionReports.clear();
  }

  selectCategory(e) {
    this.category = e.value;
    this.perfectScrollRoles.directiveRef.update();
    this.perfectScrollRolesRight.directiveRef.update();
  }

  selectCategoryReports(e) {
    this.categoryReports = e.value;
    this.perfectScrollReports.directiveRef.update();
    this.perfectScrollReportsRight.directiveRef.update();
  }

  selectCategoryDomains(e) {
    this.categoryDomains = e.value;
  }

  selectCategoryQueue(e) {
    this.categoryQueue = e.value;
  }

  toUnassigned(event) {
    this.store.dispatch(changeAssignedDomainsAction({items: event, category: this.categoryDomains}));
  }

  toAssigned(event) {
    this.store.dispatch(changeAssignedDomainsAction({items: event, category: this.categoryDomains}));
  }

  onDragDomains(event) {
    this.store.dispatch(changeAssignedDomainsAction({items: event, category: this.categoryDomains}));
  }

  onDragQueue(event) {
    this.store.dispatch(changeAssignedQueueAction({items: event, category: this.categoryQueue}));
  }

  toUnassignedQueue(event) {
    this.store.dispatch(changeAssignedQueueAction({items: event, category: this.categoryQueue}));
  }

  toAssignedQueue(event) {
    this.store.dispatch(changeAssignedQueueAction({items: event, category: this.categoryQueue}));
  }
}
