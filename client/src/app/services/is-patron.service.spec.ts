import { TestBed, inject } from '@angular/core/testing';

import { IsPatronService } from './is-patron.service';

describe('IsPatronService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsPatronService]
    });
  });

  it('should be created', inject([IsPatronService], (service: IsPatronService) => {
    expect(service).toBeTruthy();
  }));
});
