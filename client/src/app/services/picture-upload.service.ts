import { Injectable } from '@angular/core';

@Injectable()
export class PictureUploadService {
  showAddImageComponent: boolean = false;
  showPanelComponent: boolean = true;
  lastHiveCreated: string;

  honeyShowAddImageComponent: boolean = false;
  lastHoneyCreated: string;

  constructor() {}


}
