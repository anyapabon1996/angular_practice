import { TestBed } from '@angular/core/testing';

import { IntereptorService } from './intereptor.service';

describe('IntereptorService', () => {
  let service: IntereptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntereptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
