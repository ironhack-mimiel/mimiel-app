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
  constructor(
    public hiveService: HiveInfoService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    route.params.subscribe(params => {
      hiveService.getOne(params.id).subscribe(hive => {
        this.hive = hive;
      });
    });
   }
  ngOnInit() {
  }

}
