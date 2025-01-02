import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPedidosCompletoComponent } from './historico-pedidos-completo.component';

describe('HistoricoPedidosCompletoComponent', () => {
  let component: HistoricoPedidosCompletoComponent;
  let fixture: ComponentFixture<HistoricoPedidosCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPedidosCompletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPedidosCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
