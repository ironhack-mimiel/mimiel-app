import { Component, OnInit } from '@angular/core';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Hive } from '../../interfaces/hive';
import * as moment from 'moment';

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.css']
})
export class HiveDetailComponent implements OnInit {
  hive: Hive;
  average: number;
  lat: number;
  lng: number;
  temperatureData: any;
  error: any;

  showStream: boolean = false;

  sensorAData: Array<number> = [];
  dateData: Array<any> = [];
  dataAverage: Array<any> = [];

  averageTemperature(hive) {
    let tempArray: Array<any> = [];
    for (let record in hive.rpi.temperature) {
      tempArray.push(parseFloat(hive.rpi.temperature[record].temperature1));
    }
    let divider = tempArray.length;
    let sum: number = tempArray.reduce((total, num) => total + num);
    this.average = sum / divider;
  }

  constructor(
    public hiveService: HiveInfoService,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  toggleStream () {
    this.sho
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hiveService.getOne(params.id).subscribe(hive => {
        this.hive = hive;
        this.temperatureData = hive.rpi.temperature;
        this.lat = hive.location.coordinates[0];
        this.lng = hive.location.coordinates[1];
        this.averageTemperature(this.hive);
        this.temperatureData.forEach(register => {
          this.sensorAData.push(register.temperature1);
          this.dateData.push(
            moment(register.date).format('MMMM Do YYYY, h:mm:ss a')
          );
          this.dataAverage.push(this.average);
        });
      });
    });
  }

  //Chart
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
  public lineChartColors:Array<any> = [
    { // yellow
      backgroundColor: 'rgba(255,209,26,0.3)',
      borderColor: 'rgba(255,209,26,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(115,65,16,0)',
      borderColor: 'rgba(115,65,16,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
