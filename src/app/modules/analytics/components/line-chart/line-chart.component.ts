import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'rms-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() title: string;

  public lineChartData: ChartDataSets[] = [
    { data: [null, 1400000, 400000, 1900000, null], borderWidth: 4, radius: 9, hoverRadius: 9 },
  ];

  public lineChartLabels: Label[] = ['','2019-11', '2019-12', '2020-01', ''];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
            beginAtZero: true,
            stepSize: 200000,
        },
      }] 
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 4,
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { 
      backgroundColor: 'transparent',
      borderColor: '#2F80ED',
      pointBackgroundColor: '#2F80ED',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  public lineChartLegend = false;

  public lineChartType = 'line';

  constructor() { }

  ngOnInit(): void {

  }
}
