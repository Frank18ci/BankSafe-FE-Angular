import { TestBed } from '@angular/core/testing';

import { TipoMonedaTarjetaService } from './tipo-moneda-tarjeta.service';

describe('TipoMonedaTarjetaService', () => {
  let service: TipoMonedaTarjetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMonedaTarjetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
