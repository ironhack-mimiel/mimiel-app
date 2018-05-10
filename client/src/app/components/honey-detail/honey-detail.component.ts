import { Component, OnInit } from '@angular/core';
import { HoneyInfoService } from '../../services/honey-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-honey-detail',
  templateUrl: './honey-detail.component.html',
  styleUrls: ['./honey-detail.component.css']
})
export class HoneyDetailComponent implements OnInit {
  honey: Object = {};
  constructor(
    public honeyService: HoneyInfoService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    route.params.subscribe(params => {
      honeyService.getOne(params.id).subscribe(honey => {
        this.honey = honey;
        console.log(this.honey);
      });
    });
  }

  ngOnInit() {}
}
