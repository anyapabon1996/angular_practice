import { TestBed } from '@angular/core/testing';

import { MostViewService } from './most-view.service';

describe('MostViewService', () => {
  let service: MostViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
