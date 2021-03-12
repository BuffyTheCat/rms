import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rms-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit {
  @Input() title:string;
  @Input() val:string;
  @Input() name:string;
  @Input() desc:string;
  @Input() color:string;
  @Input() selectOption;


  constructor() { }

  ngOnInit(): void {
  }

}

