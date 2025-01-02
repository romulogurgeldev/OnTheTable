import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMesasVendasComponent } from './historico-mesas-vendas.component';

describe('HistoricoMesasVendasComponent', () => {
  let component: HistoricoMesasVendasComponent;
  let fixture: ComponentFixture<HistoricoMesasVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMesasVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoMesasVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
