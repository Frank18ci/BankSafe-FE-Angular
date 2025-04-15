import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarMonedaComponent } from './cambiar-moneda.component';

describe('CambiarMonedaComponent', () => {
  let component: CambiarMonedaComponent;
  let fixture: ComponentFixture<CambiarMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarMonedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
