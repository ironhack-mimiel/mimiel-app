import { Component, OnInit } from '@angular/core';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.css']
})
export class HiveDetailComponent implements OnInit {
  hive: object;
  dailyAverage: number;

  title: string = 'My first AGM project';
  lat: number;
  lng: number;


  averageTemp(hive) {
    let tempObject = hive.rpi.temperature[0];
    tempObject = delete tempObject.date;
    tempObject = Object.values(tempObject).map(n => parseFloat(n));
    let tempSum = tempObject.reduce(function(a, b) { return a + b; });
    let avg = tempSum / tempObject.length;
    this.dailyAverage = avg;
  }
  constructor(
    public hiveService: HiveInfoService,
    public route: ActivatedRoute,
    public router: Router
  ) {
   
   }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hiveService.getOne(params.id).subscribe(hive => {
        this.hive = hive;
        this.lat = hive.location.coordinates[0];
        this.lng = hive.location.coordinates[1];
        this.averageTemp(this.hive)
      });
    });
  }

}
