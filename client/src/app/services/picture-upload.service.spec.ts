import { TestBed, inject } from '@angular/core/testing';

import { PictureUploadService } from './picture-upload.service';

describe('PictureUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PictureUploadService]
    });
  });

  it('should be created', inject([PictureUploadService], (service: PictureUploadService) => {
    expect(service).toBeTruthy();
  }));
});
