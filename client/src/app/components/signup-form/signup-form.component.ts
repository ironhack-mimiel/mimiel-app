import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  isApicultor: boolean;
  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  signup() {
    const user = {
      password: this.password,
      email: this.email,
      isApicultor: this.isApicultor
    };
    this.sessionService.signup(user)
      .subscribe();
  }

  showEmail (a) {
    console.log(a)
  }
}
