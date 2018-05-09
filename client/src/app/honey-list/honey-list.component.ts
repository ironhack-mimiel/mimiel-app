import { Component, OnInit } from '@angular/core';
import { HoneyInfoService } from '../services/honey-info.service';

@Component({
  selector: 'app-honey-list',
  templateUrl: './honey-list.component.html',
  styleUrls: ['./honey-list.component.css']
})
export class HoneyListComponent implements OnInit {
  honeys: Array<object>;
  
  constructor(public honeyService: HoneyInfoService) { }

  ngOnInit() {
    this.honeyService.getAll().subscribe(honeys => this.honeys = honeys);
  }

}
