import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HoneyInfoService } from '../../services/honey-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-beekeeper',
  templateUrl: './home-beekeeper.component.html',
  styleUrls: ['./home-beekeeper.component.scss']
})
export class HomeBeekeeperComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  navigateTo(): void {
    window.scrollTo({ left: 0, top: 1000, behavior: 'smooth' });
  }
}
