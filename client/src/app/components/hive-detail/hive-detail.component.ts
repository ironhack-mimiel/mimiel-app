import { Component, OnInit } from '@angular/core';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hive } from '../../interfaces/hive';

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
  temperatureData: object;

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
    public router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hiveService.getOne(params.id).subscribe(hive => {
        this.hive = hive;
        this.temperatureData = hive.rpi.temperature;
        this.lat = hive.location.coordinates[0];
        this.lng = hive.location.coordinates[1];
        this.averageTemperature(this.hive);
      });
    });
  }
}
