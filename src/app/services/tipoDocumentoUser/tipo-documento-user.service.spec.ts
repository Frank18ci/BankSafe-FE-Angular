import { TestBed } from '@angular/core/testing';

import { TipoDocumentoUserService } from './tipo-documento-user.service';

describe('TipoDocumentoUserService', () => {
  let service: TipoDocumentoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
