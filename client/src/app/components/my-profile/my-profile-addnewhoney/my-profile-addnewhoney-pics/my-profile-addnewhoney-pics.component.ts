import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { PictureUploadService } from '../../../../services/picture-upload.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-profile-addnewhoney-pics',
  templateUrl: './my-profile-addnewhoney-pics.component.html',
  styleUrls: ['./my-profile-addnewhoney-pics.component.css'],
})
export class MyProfileAddnewhoneyPicsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: `${environment.BASEURL}/api/honey/newhoneypics/${this.pictureUploadService.lastHoneyCreated}`
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(public pictureUploadService: PictureUploadService) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.pictureUploadService.honeyShowAddImageComponent = !this.pictureUploadService.honeyShowAddImageComponent;
      this.pictureUploadService.showPanelComponent = !this.pictureUploadService.showPanelComponent;
    };
  }
}
