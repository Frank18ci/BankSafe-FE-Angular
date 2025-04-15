import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPrestamoComponent } from './solicitar-prestamo.component';

describe('SolicitarPrestamoComponent', () => {
  let component: SolicitarPrestamoComponent;
  let fixture: ComponentFixture<SolicitarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
