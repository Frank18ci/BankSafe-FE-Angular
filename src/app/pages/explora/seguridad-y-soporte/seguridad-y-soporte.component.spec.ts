import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadYSoporteComponent } from './seguridad-y-soporte.component';

describe('SeguridadYSoporteComponent', () => {
  let component: SeguridadYSoporteComponent;
  let fixture: ComponentFixture<SeguridadYSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguridadYSoporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguridadYSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
