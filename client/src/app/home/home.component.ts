import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { HoneyInfoService } from '../services/honey-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "MI MIEL";
  honeys: Array<object>;

  constructor(public sessionService: SessionService, public honeyService: HoneyInfoService) { }

  ngOnInit() {
    this.honeyService.getAll().subscribe(honeys => this.honeys = honeys);
  }


}
