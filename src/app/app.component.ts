import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { UserInfo } from './shared/interfaces/global-info-interface';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { GetParams } from './shared/interfaces/queued-items-interface';
import { getParamsAction, getThemeAction } from './store/main/main.action';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  findDirectory(navs, linkName) {
    const link =  navs.reduce((acc, nextLink) => {
          const isInMainLink = nextLink.url === linkName;
          if (isInMainLink && nextLink.sublinks.length === 0) {
              return nextLink;
          }
          const finalSublink = nextLink.sublinks.find(sublink => sublink.url === linkName);
          if (finalSublink) {
              return finalSublink;
          }
          return acc;
      }, {});

      return link.directory;
  }

  constructor(public router: Router, private store: Store<AppState>, location: Location) {

    router.events.subscribe(val => {
      console.log();

      if (location.path() === '/administration/users') {
        this.directory = 'Users';
      } else if (location.path() === '/administration/lockboxes' || location.path() === '/administration/lockboxes/create') {
        this.directory = 'Lockboxes';
      } else if (location.path() === '/cash-arc') {
        this.directory = 'CashARC';
      } else if (location.path() === '/administration/users/create') {
        this.directory = 'User Information';
      } else if (location.path() === '/reports/report-scheduler/create') {
        this.directory = 'Create scheduler';
      } else if (location.path() === '/administration/domains') {
        setTimeout(() => {
          this.directory = this.params.providerSelectedOption ? this.params.providerSelectedOption : 'Domains'
        }, 400);
      } else if (location.path() != "") {
        let path = location.path().replace('/', '');
        this.directory = this.findDirectory(this.navLinks, path)
      } else {
        this.directory = "Home";
      }
    });
  }

  directory: string;
  logoPath: string = '../../../assets/icons/logo.svg'
  user: UserInfo;
  route: string;
  userParams = ['Logout']
  params$: Observable<any>;
  theme$: Observable<any>;
  darkMode$: Observable<any>;
  darkMode: boolean = false;
  params;
  theme = {
    "primary": "#455A64",
    "firstSecondaryColor": "#8ABD0F",
    "secondSecondaryColor": "#C4F056",
    "thirdSecondaryColor": "#455A64",
    "fourthSecondaryColor": "#EB5757",
    "fifthSecondaryColor": "#FAFAFA",
    "seventhSecondaryColor": "#FFFFFF",
    "sixthSecondaryColor": "#E5E6E7",
  }
  
  navLinks = [
    {
      name: 'Home',
      url: 'home',
      iconName: 'home',
      sublinks: [],
      directory: 'Home'
    },
    {
      name: 'Research',
      url: 'research/research-lockbox',
      iconName: 'search',
      sublinks: [
        {
          name: 'Encounter',
          url: 'research/research-encounter',
          directory: 'Research Encounter'
        },
        {
          name: 'Lockbox',
          url: 'research/research-lockbox',
          directory: 'Research Lockbox'
        },
        {
          name: 'Payment',
          url: 'research/research-report-payment',
          directory: 'Research Payments'
        },
        {
          name: 'Remittance',
          url: 'research/research-remittance',
          directory: 'Research Remittance'
        },
        {
          name: 'Batch print',
          url: 'research/research-bath-print',
          directory: 'Research Batch Print'
        }
      ],
    },
    {
      name: 'Reconciliation',
      url: 'reconciliation',
      iconName: 'assessment',
      sublinks: [],
      directory: 'Reconciliation'
    },
    {
      name: 'Matching',
      url: 'matching',
      iconName: 'work',
      sublinks: [],
      directory: 'Matching'
    },
    {
      name: 'Reports',
      url: 'reports',
      iconName: 'pie_chart',
      sublinks: [
        {
          name: 'Reports',
          url: 'reports',
          directory: 'Report Results'
        },
        {
          name: 'Report Scheduler',
          url: 'reports/report-scheduler',
          directory: 'Report Scheduler'
        }
      ]
    },
    {
      name: 'Insights',
      url: 'insights',
      iconName: 'star',
      sublinks: [],
      directory: 'Insights'
    },
    {
      name: 'Workflow',
      url: 'workflow/remit-post',
      iconName: 'dashboard',
      sublinks: [
        {
          name: 'Remit Post',
          url: 'workflow/remit-post',
          directory: 'Remit Post'
        },
        {
          name: 'Correspondence',
          url: 'workflow/correspondence',
          directory: 'Correspondence'
        },
        {
          name: 'Denial Management',
          url: 'workflow/denial-management',
          directory: 'Workflow Denial'
        },
      ]
    },
    {
      name: 'Doc Management',
      url: 'doc-management',
      iconName: 'insert_drive_file',
      sublinks: [],
      directory: 'Doc Management'
    },
    {
      name: 'Analytics',
      url: 'analytics/partner-analytics',
      iconName: 'bubble_chart',
      sublinks: [
        {
          name: 'Partner Analytics',
          url: 'analytics/partner-analytics',
          directory: 'Partner Analytics'
        },
        {
          name: 'Reimbursement Analytics',
          url: 'analytics/reimbursement-analytics',
          directory: 'Reimbursement Analytics'
        },
        {
          name: 'Denial Analytics',
          url: 'analytics/denial-analytics',
          directory: 'Denial Analytics'
        }
      ]
    },
    {
      name: 'Administration',
      url: 'administration',
      iconName: 'business',
      sublinks: [],
      directory: 'Administration'
    },
  ]

  setTheme() {
    if (this.darkMode) {
      document.documentElement.style.setProperty('--color-primary', '#E9EDEF');
      document.documentElement.style.setProperty('--color-secondary', '#90a4ae');
      document.documentElement.style.setProperty('--color-textmain', '#E9EDEF');
      document.documentElement.style.setProperty('--color-textsecondary', '#90A4AE');
      document.documentElement.style.setProperty('--color-textlight', '#90A4AE');
      document.documentElement.style.setProperty('--color-maincolor', '#2D3035');
      document.documentElement.style.setProperty('--color-secondarycolor', '#1F2123');
      document.documentElement.style.setProperty('--color-lightcolor', '#424449');
      document.documentElement.style.setProperty('--color-lightcolordropdown', '#424449');
      document.documentElement.style.setProperty('--color-buttoncolor', '#EFEFEF');
      document.documentElement.style.setProperty('--color-buttoncolortext', '#455A64');
      document.documentElement.style.setProperty('--color-buttoncolortextsimple', '#E9EDEF');
      document.documentElement.style.setProperty('--color-tablerow', '#2D3035');
      document.documentElement.style.setProperty('--color-tablerowsecondary', '#313438');
      document.documentElement.style.setProperty('--color-tablerowhead', '#313438');
      document.documentElement.style.setProperty('--color-rowhover', '#424449');
      document.documentElement.style.setProperty('--color-sidenavactive', '#424449');
      document.documentElement.style.setProperty('--color-modalhead', '#424449');
      document.documentElement.style.setProperty('--color-modalbody', '#2D3035');
      document.documentElement.style.setProperty('--color-input', '#424449');
      document.documentElement.style.setProperty('--color-dropdowncolor', '#424449');
      document.documentElement.style.setProperty('--color-bordercolor', '#2D3035');
      document.documentElement.style.setProperty('--color-menuaitem', '#90A4AE');
      document.documentElement.style.setProperty('--color-iconcolor', '#90A4AE');
      document.documentElement.style.setProperty('--color-datecolor', '#424449');
      document.documentElement.style.setProperty('--color-datetext', '#90A4AE');
      document.documentElement.style.setProperty('--color-checkbox', '#90A4AE');
      document.documentElement.style.setProperty('--color-viewer', '#2D3035');
      document.documentElement.style.setProperty('--color-gutter', '#90A4AE');
      document.documentElement.style.setProperty('--color-borderlight', '#1F2123');
      document.documentElement.style.setProperty('--color-tab', '#2D3035');
      document.documentElement.style.setProperty('--color-tab-text', '#90A4AE');
    } else {
      document.documentElement.style.setProperty('--color-primary', '#354750');
      document.documentElement.style.setProperty('--color-secondary', this.theme.firstSecondaryColor);
      document.documentElement.style.setProperty('--color-textmain', this.theme.primary);
      document.documentElement.style.setProperty('--color-textsecondary', '#70858F');
      document.documentElement.style.setProperty('--color-textlight', '#90A4AE');
      document.documentElement.style.setProperty('--color-maincolor', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-secondarycolor', '#F3F5F5');
      document.documentElement.style.setProperty('--color-lightcolor', '#F2F4F4');
      document.documentElement.style.setProperty('--color-lightcolordropdown', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-buttoncolor', this.theme.firstSecondaryColor);
      document.documentElement.style.setProperty('--color-buttoncolortext', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-buttoncolortextsimple', this.theme.firstSecondaryColor);
      document.documentElement.style.setProperty('--color-tablerow', '#FAFBFB');
      document.documentElement.style.setProperty('--color-tablerowsecondary', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-tablerowhead', '#f6f7f8');
      document.documentElement.style.setProperty('--color-rowhover', this.theme.secondSecondaryColor);
      document.documentElement.style.setProperty('--color-sidenavactive', this.theme.secondSecondaryColor);
      document.documentElement.style.setProperty('--color-modalhead', '#E9EDEF');
      document.documentElement.style.setProperty('--color-modalbody', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-input', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-dropdowncolor', this.theme.seventhSecondaryColor);
      document.documentElement.style.setProperty('--color-bordercolor', '#E9EDEF');
      document.documentElement.style.setProperty('--color-menuaitem', '#6d960c');
      document.documentElement.style.setProperty('--color-iconcolor', '#70858F');
      document.documentElement.style.setProperty('--color-datecolor', '#F2F4F4');
      document.documentElement.style.setProperty('--color-datetext', this.theme.primary);
      document.documentElement.style.setProperty('--color-checkbox', '#90A4AE');
      document.documentElement.style.setProperty('--color-viewer', '#F5F7F8');
      document.documentElement.style.setProperty('--color-gutter', '#70858F');
      document.documentElement.style.setProperty('--color-borderlight', this.theme.sixthSecondaryColor);
      document.documentElement.style.setProperty('--color-tab', this.theme.fifthSecondaryColor);
      document.documentElement.style.setProperty('--color-error', this.theme.fourthSecondaryColor);
      document.documentElement.style.setProperty('--color-tab-text', this.theme.thirdSecondaryColor);
    }
  }

  ngOnInit(): void {
    this.setTheme();

    this.store.subscribe((store) => {
      this.user = store.login.user;
    })

    const getParams: GetParams = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "userId" : "123123132",
      }
    }
    this.store.dispatch(getThemeAction({userId: 12}));
    this.store.dispatch(getParamsAction(getParams));
    this.theme$ = this.store.select(s => s.queue.theme);
    this.params$ = this.store.select(s => s.queue.params);
    this.darkMode$ = this.store.select(s => s.queue.darkMode);

    this.theme$.pipe(filter(v => !!v)).subscribe(i => {
      this.theme = i;
      this.setTheme();
    });

    this.params$.subscribe(i => {
      this.params = i;
    });

    this.darkMode$.subscribe(i => {
      this.darkMode = i;
      this.setTheme();
    });
  }
}


