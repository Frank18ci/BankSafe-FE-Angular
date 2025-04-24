import { TestBed } from '@angular/core/testing';

import { TransacionService } from './transacion.service';

describe('TransacionService', () => {
  let service: TransacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
