import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

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
<<<<<<< HEAD
    this.sessionService.login(this.email, this.password)
      .subscribe(user => console.log(user));
=======
    this.sessionService.login(this.email, this.password).subscribe();
>>>>>>> bc126140ece3be8baae522140fd56d4b629e846f
  }
}
