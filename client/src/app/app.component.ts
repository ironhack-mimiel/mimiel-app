import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { MyProfileMenuComponent } from './components/my-profile-menu/my-profile-menu.component';


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
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {}


}
