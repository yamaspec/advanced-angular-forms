import { TestBed } from '@angular/core/testing';

import { SharedApiAccessService } from './shared-api-access.service';

describe('SharedServiceService', () => {
  let service: SharedApiAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedApiAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
