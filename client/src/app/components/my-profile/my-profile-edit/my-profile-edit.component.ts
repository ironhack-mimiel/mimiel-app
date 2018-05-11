import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit {
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string = "";
  message: string;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  updateProfile() {
    if(this.password !== ""){
      this.message = '';
      const update = {
        name: this.name,
        surname: this.surname,
        address: this.address,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password
      };
      this.sessionService
        .updateProfile(update)
        .subscribe();
    } else {
      this.message = 'Your need to provide your password';
    }
  }

}
