import { Component, OnInit } from '@angular/core';
import { HoneyInfoService } from '../../services/honey-info.service';
import { HiveInfoService } from '../../services/hive-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IsPatronService } from '../../services/is-patron.service';
import { SessionService } from '../../services/session.service';
import { MessagingService } from '../../services/messaging.service';
import { SendMessageComponent } from '../send-message/send-message.component';
import { Honey } from '../../interfaces/honey';

@Component({
  selector: 'app-honey-detail',
  templateUrl: './honey-detail.component.html',
  styleUrls: ['./honey-detail.component.css']
})
export class HoneyDetailComponent implements OnInit {
  lat: number;
  lng: number;
  honey: Honey;
  showForm: boolean = false;
  beekeeper: Object;

  constructor(
    public honeyService: HoneyInfoService,
    public hiveService: HiveInfoService,
    public route: ActivatedRoute,
    public router: Router,
    public isPatronService: IsPatronService,
    public sessionService: SessionService,
    public messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.honeyService.getOne(params.id).subscribe(honey => {
        this.honey = honey;
        this.lat = parseFloat(honey.hive.location.coordinates[0].toFixed(4));
        this.lng = parseFloat(honey.hive.location.coordinates[1].toFixed(4));
        this.hiveService.getOne(honey.hive._id).subscribe(hive =>  {
          this.beekeeper = hive.beekeeper})
      });
    });
  }

  goToHive() {
    this.isPatronService.isPatron(
      this.honey.hive.patrons,
      this.sessionService.user._id
    )
      ? this.router.navigate(['/hive', this.honey.hive._id])
      : console.log('Acceso denegado');
  }

  toggleContactForm(event?) {
    this.showForm = !this.showForm;
  }
}
