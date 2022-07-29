import { TestBed } from '@angular/core/testing';

import { HomeyService } from './homey.service';

describe('HomeyService', () => {
  let service: HomeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
