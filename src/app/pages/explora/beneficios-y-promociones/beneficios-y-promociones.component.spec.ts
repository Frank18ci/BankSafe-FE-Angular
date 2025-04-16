import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiosYPromocionesComponent } from './beneficios-y-promociones.component';

describe('BeneficiosYPromocionesComponent', () => {
  let component: BeneficiosYPromocionesComponent;
  let fixture: ComponentFixture<BeneficiosYPromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiosYPromocionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiosYPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
