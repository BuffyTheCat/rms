import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'rms-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  @Input() navLinks: Array<Object>;
  opened: boolean = true;
  
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;

  constructor() { }

  switchSidenav() {
    this.opened = !this.opened; 
  }

  onUpdateScrollBar() {
    this.perfectScroll.directiveRef.update(); 
  }

  ngOnInit(): void {
    
  }

}
