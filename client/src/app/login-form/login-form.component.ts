import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  login() {
    console.log(this.email, this.password);
    this.sessionService.login(this.email, this.password).subscribe();
  }
}
