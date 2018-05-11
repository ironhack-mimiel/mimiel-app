import { Component, OnInit } from '@angular/core';
import { HoneyInfoService } from '../../services/honey-info.service';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IsPatronService } from '../../services/is-patron.service';
import { SessionService } from '../../services/session.service';

interface Honey {
  name: string;
  description: string;
  email: string;
  hive: Hive;
}

interface Hive {
  _id: string;
  name: string;
  description: string;
  rpi: object;
  patrons: Array<any>;
}

@Component({
  selector: 'app-honey-detail',
  templateUrl: './honey-detail.component.html',
  styleUrls: ['./honey-detail.component.css']
})
export class HoneyDetailComponent implements OnInit {
  lat: number;
  lng: number;
  honey: Honey;

  constructor(
    public honeyService: HoneyInfoService,
    public route: ActivatedRoute,
    public router: Router,
    public isPatronService: IsPatronService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.honeyService.getOne(params.id).subscribe(honey => {
        this.honey = honey;
        this.lat = parseFloat(honey.hive.location.coordinates[0].toFixed(4));
        this.lng = parseFloat(honey.hive.location.coordinates[1].toFixed(4));
      });
    });
  }

  goToHive() {
    this.isPatronService.isPatron(this.honey.hive.patrons, this.sessionService.user._id)
      ? this.router.navigate(['/hive', this.honey.hive._id])
      : console.log('CACADEVACA');
  }
}
