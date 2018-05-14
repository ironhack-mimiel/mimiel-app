import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css']
})
export class ChartTestComponent implements OnInit {
  constructor() {}

  sensorAData: Array<number> = [];
  dateData: Array<any> = [];
  dataAverage: Array<any> = [];

  @Input() temperatureData;
  @Input() averageTemperature;

  ngOnInit() {
    this.temperatureData.forEach(register => {
      this.sensorAData.push(register.temperature1);
      this.dateData.push(moment(register.date).format('MMMM Do YYYY, h:mm:ss a'));
      this.dataAverage.push(this.averageTemperature);
    });
  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: this.sensorAData, label: 'Sensor A' },
    { data: this.dataAverage, label: 'Media' }
  ];
  public lineChartLabels: Array<any> = this.dateData;
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Temperatura'
          },
          ticks: {
            min: 20,
            max: 30,
            stepSize: 2
          }
        }
      ]
    }
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
