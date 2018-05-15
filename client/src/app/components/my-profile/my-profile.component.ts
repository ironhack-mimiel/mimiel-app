import { Injectable, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { PictureUploadService } from '../../services/picture-upload.service';
import { HiveInfoService } from '../../services/hive-info.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  rightComponent: string = '';
  showAddImageComponent: boolean = false;

  constructor(
    public sessionService: SessionService,
    public pictureUploadService: PictureUploadService,
    public hiveService: HiveInfoService
  ) {}

  ngOnInit() {}

  toggleRightComponent(event?){
    this.rightComponent = event;
  }
}
