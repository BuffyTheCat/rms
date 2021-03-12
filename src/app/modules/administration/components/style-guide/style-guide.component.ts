import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DropzoneComponent } from 'src/app/shared/components/dropzone/dropzone.component';
import { SelectColorComponent } from 'src/app/shared/components/select-color/select-color.component';
import { QueuedItemsForQuery } from 'src/app/shared/interfaces/queued-items-interface';
import { AppState } from 'src/app/store';
import { setDarkModeAction, setThemeAction } from 'src/app/store/main/main.action';

@Component({
  selector: 'rms-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideComponent implements OnInit {
  params$: Observable<any>;
  theme$: Observable<any>;
  darkMode$: Observable<any>;
  darkMode: boolean;

  @ViewChild('primaryColor') primaryColor:SelectColorComponent;

  @ViewChild('firstSecondaryColor') firstSecondaryColor:SelectColorComponent;
  @ViewChild('secondSecondaryColor') secondSecondaryColor:SelectColorComponent;
  @ViewChild('thirdSecondaryColor') thirdSecondaryColor:SelectColorComponent;
  @ViewChild('fourthSecondaryColor') fourthSecondaryColor:SelectColorComponent;
  @ViewChild('fifthSecondaryColor') fifthSecondaryColor:SelectColorComponent;
  @ViewChild('seventhSecondaryColor') seventhSecondaryColor:SelectColorComponent;
  @ViewChild('sixthSecondaryColor') sixthSecondaryColor:SelectColorComponent;
  @ViewChild('loginLogo') loginLogo:DropzoneComponent;
  @ViewChild('defaultLogo') defaultLogo:DropzoneComponent;
  @ViewChild('applicationLogo') applicationLogo:DropzoneComponent;
  @ViewChild('secondaryLogo') secondaryLogo:DropzoneComponent;

  constructor( private store: Store<AppState>) { }

  onChangeMode(e) {
    this.store.dispatch(setDarkModeAction({isDarkMode: e.checked}));
  }

  onChangePrimary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-textmain', e);
    preview.style.setProperty('--color-datetext', e);
  }

  onChangefirstSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-secondary', e);
    preview.style.setProperty('--color-buttoncolor', e);
    preview.style.setProperty('--color-buttoncolortextsimple', e);
  }
  onChangesecondSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-rowhover', e);
    preview.style.setProperty('--color-sidenavactive', e);
  }
  onChangethirdSecondary(e) {

  }
  onChangefourthSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-error', e);
  }
  onChangefifthSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-tab', e);
  }
  onChangeseventhSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-maincolor', e);
    preview.style.setProperty('--color-lightcolordropdown', e);
    preview.style.setProperty('--color-buttoncolortext', e);
    preview.style.setProperty('--color-tablerowsecondary', e);
    preview.style.setProperty('--color-modalbody', e);
    preview.style.setProperty('--color-input', e);
    preview.style.setProperty('--color-dropdowncolor', e);
  }
  onChangesixthSecondary(e) {
    let preview = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("html")[0];
    preview.style.setProperty('--color-borderlight', e);
  }

  setSelectedRows() {
    document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByClassName("table")[0].getElementsByClassName('cdk-row')[1].classList.add('selected');
    document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByClassName("table")[1].getElementsByClassName('cdk-row')[1].classList.add('selected');
  }

  ngOnInit(): void {
    if (document.getElementsByTagName("iframe")[0]) {
      this.setSelectedRows();
    }
    
    const getItems: QueuedItemsForQuery = {
      "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
      "method" : "getQueuedItemsForQuery",
      "params" : {
        "queueItemTypeId" : "REMIT_POST",
        "date" : "",
        "requestTicket" : {
          "id" : 3,
          "pageNumber" : 0
        },
        "pageNumber" : 0,
        "lockboxNumber" : "",
        "indexStatus" : "",
        "pageSize" : 25,
        "provider" : "",
        "payerName" : "",
        "showOtherUsersItems" : false,
        "status" : "ALL",
        "batchNumber" : ""
      }
    }

    this.params$ = this.store.select(s => s.queue.params);
    this.theme$ = this.store.select(s => s.queue.theme);
    this.darkMode$ = this.store.select(s => s.queue.darkMode);
    this.darkMode$.subscribe(i => {
      this.darkMode = i;
      if (document.getElementsByTagName("iframe")[0]) {
        document.getElementsByTagName("iframe")[0].contentWindow.location.reload(true)
      }
    });
  }

  onSave() {    
    let theme = {
      primary: this.primaryColor.getColor(),
      firstSecondaryColor: this.firstSecondaryColor.getColor(),
      secondSecondaryColor: this.secondSecondaryColor.getColor(),
      thirdSecondaryColor: this.thirdSecondaryColor.getColor(),
      fourthSecondaryColor: this.fourthSecondaryColor.getColor(),
      fifthSecondaryColor: this.fifthSecondaryColor.getColor(),
      seventhSecondaryColor: this.seventhSecondaryColor.getColor(),
      sixthSecondaryColor: this.sixthSecondaryColor.getColor(),
      // loginLogo: this.loginLogo.getFile() ? this.loginLogo.getFile() : null,
      // defaultLogo: this.defaultLogo.getFile() ? this.defaultLogo.getFile() : null,
      // applicationLogo: this.applicationLogo.getFile() ? this.applicationLogo.getFile() : null,
      // secondaryLogo: this.secondaryLogo.getFile() ? this.secondaryLogo.getFile() : null,
    }

    this.store.dispatch(setThemeAction({theme: theme}));
    console.log('On save theme', theme);
  }
  onCancel() {
    console.log('onCancel');
  }
}
