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
  payMethod: string;
  password: string = "";
  message: string;
  id: string = this.sessionService.user._id;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  updateProfile() {
    if(this.password !== ""){
      this.message = '';
      const update = {
        id: this.id,
        name: this.name,
        surname: this.surname,
        address: this.address,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password,
        paymentMethod: this.payMethod
      };
      this.sessionService
        .updateProfile(update)
        .subscribe(user => {
          console.log(this.sessionService.user.isApicultor);
          this.sessionService.handleUser(user)
        });
    } else {
      this.message = 'Your need to provide your password';
    }
  }

}
