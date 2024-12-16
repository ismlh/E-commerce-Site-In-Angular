import { TestBed } from '@angular/core/testing';

import { UserMsgsService } from './user-msgs.service';

describe('UserMsgsService', () => {
  let service: UserMsgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMsgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
