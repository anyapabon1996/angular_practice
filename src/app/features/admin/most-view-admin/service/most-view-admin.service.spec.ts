import { TestBed } from '@angular/core/testing';

import { MostViewAdminService } from './most-view-admin.service';

describe('MostViewAdminService', () => {
  let service: MostViewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostViewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
