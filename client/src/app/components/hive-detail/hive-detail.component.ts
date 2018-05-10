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
    route.params.subscribe(params => {
      hiveService.getOne(params.id).subscribe(hive => {
        this.hive = hive;
        this.averageTemp(this.hive)
      });
    });
   }
  ngOnInit() {
  }

}
