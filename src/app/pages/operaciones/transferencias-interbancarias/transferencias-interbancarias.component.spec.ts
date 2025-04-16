import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasInterbancariasComponent } from './transferencias-interbancarias.component';

describe('TransferenciasInterbancariasComponent', () => {
  let component: TransferenciasInterbancariasComponent;
  let fixture: ComponentFixture<TransferenciasInterbancariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciasInterbancariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInterbancariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
