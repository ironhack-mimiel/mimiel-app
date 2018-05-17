import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-delete',
  templateUrl: './my-profile-delete.component.html',
  styleUrls: ['./my-profile-delete.component.css']
})
export class MyProfileDeleteComponent implements OnInit {

  deleteReason: string;
  option: string;
  id: string = this.sessionService.user._id;

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }

  deleteAccount(){
    this.sessionService.deleteAccount(this.id).subscribe();
    this.router.navigate(['/home']);
  }

}
