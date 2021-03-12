import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rms-cash-arc-item',
  templateUrl: './cash-arc-item.component.html',
  styleUrls: ['./cash-arc-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashArcItemComponent implements OnInit {
  @Input() title: string = 'some title';
  @Input() outstandingItems: number = 0;
  @Input() amount: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
}
