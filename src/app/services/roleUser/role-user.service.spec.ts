import { TestBed } from '@angular/core/testing';

import { RoleUserService } from './role-user.service';

describe('RoleUserService', () => {
  let service: RoleUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
