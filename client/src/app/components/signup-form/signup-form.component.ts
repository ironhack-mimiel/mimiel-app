import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  signup() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    };
    console.log(user);
    this.sessionService.signup(user).subscribe();
  }
}
