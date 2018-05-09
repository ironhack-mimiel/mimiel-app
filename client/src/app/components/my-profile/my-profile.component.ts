import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string = this.sessionService.user.email

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
  }

  fillDetails() {
    const update = {
      name: this.name,
      surname: this.surname,
      address: this.address,
      phoneNumber: this.phoneNumber,
      email: this.email
    }
    this.sessionService.fillDetails(update).subscribe()
  }
}
