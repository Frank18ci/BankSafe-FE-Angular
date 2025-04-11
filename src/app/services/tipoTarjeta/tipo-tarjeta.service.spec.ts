import { TestBed } from '@angular/core/testing';

import { TipoTarjetaService } from './tipo-tarjeta.service';

describe('TipoTarjetaService', () => {
  let service: TipoTarjetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTarjetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
