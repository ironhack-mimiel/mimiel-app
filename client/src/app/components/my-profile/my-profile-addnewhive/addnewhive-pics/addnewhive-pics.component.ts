import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

const URL = '/api/hive/newhivepics';

@Component({
  selector: 'app-addnewhive-pics',
  templateUrl: './addnewhive-pics.component.html',
  styleUrls: ['./addnewhive-pics.component.css'],
  providers: [FileUploadModule]
})
export class AddnewhivePicsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() {}

  ngOnInit() {}
}
