import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPedidosComponent } from './historico-pedidos.component';

describe('HistoricoPedidosComponent', () => {
  let component: HistoricoPedidosComponent;
  let fixture: ComponentFixture<HistoricoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
