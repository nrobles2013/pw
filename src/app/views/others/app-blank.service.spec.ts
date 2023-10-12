import { TestBed } from '@angular/core/testing';

import { AppBlankService } from './app-blank.service';

describe('AppBlankService', () => {
  let service: AppBlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBlankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
