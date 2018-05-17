import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { HiveInfoService } from '../../../services/hive-info.service';
import { Router } from '@angular/router';

interface Hive {
  _id: string;
  name: string;
  description: string;
  rpi: object;
  patrons: Array<any>;
}
@Component({
  selector: 'app-my-profile-hives',
  templateUrl: './my-profile-hives.component.html',
  styleUrls: ['./my-profile-hives.component.css']
})
export class MyProfileHivesComponent implements OnInit {
  hives: Array<Hive>;

  constructor(
    public sessionService: SessionService,
    public hiveService: HiveInfoService,
    public router: Router
  ) {}

  ngOnInit() {
    this.hiveService.getAll(this.sessionService.user._id).subscribe(hives => {
      this.hives = hives;
    });
  }
}
