import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { SessionService } from '../../../services/session.service';
import { HoneyInfoService } from '../../../services/honey-info.service';
import { HiveInfoService } from '../../../services/hive-info.service';
import { PictureUploadService } from '../../../services/picture-upload.service';

@Component({
  selector: 'app-my-profile-addnewhoney',
  templateUrl: './my-profile-addnewhoney.component.html',
  styleUrls: ['./my-profile-addnewhoney.component.css']
})
export class MyProfileAddnewhoneyComponent implements OnInit {
  beekeeper: any = this.sessionService.user;
  honeyName: string;
  honeyType: string;
  honeyHive: string;
  pictureUrl: string = '';

  hives: Array<any>;

  constructor(
    public http: Http,
    public sessionService: SessionService,
    public honeyService: HoneyInfoService,
    public hiveService: HiveInfoService,
    public pictureUploadService: PictureUploadService
  ) {}

  @Output() onHoneyShowImageUploadComponent = new EventEmitter<string>();

  ngOnInit() {
    console.log(this.beekeeper._id);
    this.hiveService
      .getAllBeekeeperHives(this.beekeeper._id)
      .subscribe(hives => (this.hives = hives));
  }

  newHoney() {
    const data = {
      beekeeper: this.beekeeper,
      name: this.honeyName,
      type: this.honeyType,
      hive: this.honeyHive,
      picturesURL: ''
    };

    this.honeyService.newHoney(data).subscribe();
    this.onHoneyShowImageUploadComponent.emit('');
    this.pictureUploadService.honeyShowAddImageComponent = !this.pictureUploadService
      .honeyShowAddImageComponent;
    this.pictureUploadService.showPanelComponent = !this.pictureUploadService
      .showPanelComponent;
    this.pictureUploadService.lastHoneyCreated = this.honeyName;
  }
}
