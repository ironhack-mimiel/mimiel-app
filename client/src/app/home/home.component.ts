import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showForm: boolean = true;
  title = "MI MIEL";
  constructor(public sessionService: SessionService) { }

  ngOnInit() {
  }

  toggleForm() {
    this.showForm = !this.showForm
  }

}
