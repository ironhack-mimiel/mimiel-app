import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public sessionService: SessionService, public router: Router) {}
  title = 'MiMiel';

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.sessionService.toggleForm();
      this.router.navigate(['home'])
    });
  }
}
