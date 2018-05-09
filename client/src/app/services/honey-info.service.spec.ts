import { TestBed, inject } from '@angular/core/testing';

import { HoneyInfoService } from './honey-info.service';

describe('HoneyInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoneyInfoService]
    });
  });

  it('should be created', inject([HoneyInfoService], (service: HoneyInfoService) => {
    expect(service).toBeTruthy();
  }));
});
