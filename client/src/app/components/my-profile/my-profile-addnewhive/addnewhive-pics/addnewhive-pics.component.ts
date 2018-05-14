import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { PictureUploadService } from '../../../../services/picture-upload.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-addnewhive-pics',
  templateUrl: './addnewhive-pics.component.html',
  styleUrls: ['./addnewhive-pics.component.css'],
  providers: [FileUploadModule]
})
export class AddnewhivePicsComponent implements OnInit {



  public uploader: FileUploader = new FileUploader({
    url: `${environment.BASEURL}/api/hive/newhivepics/${this.pictureUploadService.lastHiveCreated}` });
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
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
}
