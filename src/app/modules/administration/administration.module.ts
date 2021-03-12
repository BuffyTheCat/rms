import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './components/administration/administration.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdministrationUsersComponent } from './components/users/administration-users.component';
import { AdministrationLockboxesComponent } from './components/lockboxes/administration-lockboxes.component';
import { AdministrationCreateLockboxesComponent } from './components/create-lockboxes/administration-create-lockboxes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AdministrationCreateUserComponent } from './components/create-user/administration-create-user.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AdministrationProfilesComponent } from './components/profiles/administration-profiles.component';
import { AdministrationCreateProfilesComponent } from './components/create-profiles/administration-create-profiles.component';
import { StyleGuideComponent } from './components/style-guide/style-guide.component';
import { AdministrationDomainsComponent } from './components/domains/domains.component';
import { AdministrationDomainsInfoComponent } from './components/domains-info/domains-info.component';
import { AdministrationDomainsProviderComponent } from './components/domains-provider/domains-provider.component';
import { AdministrationDomainsDashboardComponent } from './components/domains-dashboard/domains-dashboard.component';
import { AdministrationDomainsQueuesComponent } from './components/domains-queues/domains-queues.component';
import { QueueManagementModalComponent } from './components/queue-management/queue-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdministrationDomainsQueueMappingComponent } from './components/domains-queue-mapping/domains-queue-mapping.component';
import { QueueModalComponent } from './components/queue-modal/queue-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

export const AdministrationRoutes: Routes = [
    {
        path: '',
        component: AdministrationComponent
    },
    {
        path: 'users',
        component: AdministrationUsersComponent
    },
    {
        path: 'lockboxes',
        component: AdministrationLockboxesComponent
    },
    {
        path: 'lockboxes/create',
        component: AdministrationCreateLockboxesComponent
    },
    {
        path: 'users/create',
        component: AdministrationCreateUserComponent
    },
    {
        path: 'profiles',
        component: AdministrationProfilesComponent
    },
    {
        path: 'profiles/create',
        component: AdministrationCreateProfilesComponent
    },
    {
        path: 'domains',
        component: AdministrationDomainsComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MatIconModule,
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        PerfectScrollbarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        MatRadioModule,
        MatInputModule,
        DragDropModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatStepperModule,
        CdkStepperModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        OverlayModule,
    ],
    declarations: [
        AdministrationComponent,
        AdministrationUsersComponent,
        AdministrationLockboxesComponent,
        AdministrationCreateLockboxesComponent,
        AdministrationCreateUserComponent,
        AdministrationProfilesComponent,
        AdministrationCreateProfilesComponent,
        StyleGuideComponent,
        AdministrationDomainsComponent,
        AdministrationDomainsInfoComponent,
        AdministrationDomainsProviderComponent,
        AdministrationDomainsDashboardComponent,
        AdministrationDomainsQueuesComponent,
        QueueManagementModalComponent,
        AdministrationDomainsQueueMappingComponent,
        QueueModalComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})

export class AdministrationModule {

}
