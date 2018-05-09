import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-fill-details-form',
  templateUrl: './fill-details-form.component.html',
  styleUrls: ['./fill-details-form.component.css']
})
export class FillDetailsFormComponent implements OnInit {
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string = this.sessionService.user.email;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  fillDetails() {
    const update = {
      name: this.name,
      surname: this.surname,
      address: this.address,
      phoneNumber: this.phoneNumber,
      email: this.email
    };
    this.sessionService.fillDetails(update).subscribe();
  }
}
