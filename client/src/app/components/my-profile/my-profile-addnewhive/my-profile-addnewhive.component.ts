import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { SessionService } from '../../../services/session.service';
import { HoneyInfoService } from '../../../services/honey-info.service';
import { HiveInfoService } from '../../../services/hive-info.service';
import { PictureUploadService } from '../../../services/picture-upload.service';




@Component({
  selector: 'app-my-profile-addnewhive',
  templateUrl: './my-profile-addnewhive.component.html',
  styleUrls: ['./my-profile-addnewhive.component.css']
})
export class MyProfileAddnewhiveComponent implements OnInit {
  beekeeper: any = this.sessionService.user._id;
  hiveName: string;
  hiveDescription: string;
  hiveLocation: string;
  honeyKind: string;

  honeys: Array<any>;

  constructor(
    public http: Http,
    public sessionService: SessionService,
    public honeyService: HoneyInfoService,
    public hiveService: HiveInfoService,
    public pictureUploadService: PictureUploadService
  ) {}

  @Output() onShowImageUploadComponent = new EventEmitter<string>();

  ngOnInit() {
    this.honeyService.getAll().subscribe(honeys => (this.honeys = honeys));
  }

  newHive() {
    const data = {
      beekeeper: this.beekeeper,
      name: this.hiveName,
      description: this.hiveDescription,
      location: this.hiveLocation,
      honey: this.honeyKind,
      picturesURL: ""
    };

    this.hiveService.newHive(data).subscribe();
    this.onShowImageUploadComponent.emit("");
    this.pictureUploadService.showAddImageComponent = !this.pictureUploadService.showAddImageComponent;
    this.pictureUploadService.showPanelComponent = !this.pictureUploadService.showPanelComponent;
    this.pictureUploadService.lastHiveCreated = this.hiveName;
  }

  getAddressFromChild(event) {
    this.hiveLocation = event;
  }
}
