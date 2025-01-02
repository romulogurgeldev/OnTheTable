import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagamentoComponent } from './tipo-pagamento.component';

describe('TipoPagamentoComponent', () => {
  let component: TipoPagamentoComponent;
  let fixture: ComponentFixture<TipoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
