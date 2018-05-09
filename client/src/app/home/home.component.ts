import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { HoneyInfoService } from '../services/honey-info.service';
import { HoneyListComponent } from '../honey-list/honey-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "MI MIEL";
  honeys: Array<object>;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {

  }


}
