import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HoneyInfoService } from '../../services/honey-info.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  honeys: Array<any>;

  constructor(public honeyService: HoneyInfoService, public router: Router) { }

  ngOnInit() {
    this.honeyService.getAll().subscribe(honeys => this.honeys = honeys);
  }

  navigateTo(): void {
    window.scrollTo({ left: 0, top: 1000, behavior: 'smooth' });
  }

}
