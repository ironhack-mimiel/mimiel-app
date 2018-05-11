import { Component, OnInit } from '@angular/core';
import { HoneyInfoService } from '../../services/honey-info.service';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-honey-detail',
  templateUrl: './honey-detail.component.html',
  styleUrls: ['./honey-detail.component.css']
})
export class HoneyDetailComponent implements OnInit {
  lat: number;
  lng: number
  honey: object;
  constructor(
    public honeyService: HoneyInfoService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.honeyService.getOne(params.id).subscribe(honey => {
        this.honey = honey;
        this.lat = parseFloat(honey.hive.location.coordinates[0].toFixed(4));
        this.lng = parseFloat(honey.hive.location.coordinates[1].toFixed(4));
      });
    });
  }
}
