import { TestBed, inject } from '@angular/core/testing';

import { HiveInfoService } from './hive-info.service';

describe('HiveInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HiveInfoService]
    });
  });

  it('should be created', inject([HiveInfoService], (service: HiveInfoService) => {
    expect(service).toBeTruthy();
  }));
});
