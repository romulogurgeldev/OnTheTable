import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMesasVendasCompletoComponent } from './historico-mesas-vendas-completo.component';

describe('HistoricoMesasVendasCompletoComponent', () => {
  let component: HistoricoMesasVendasCompletoComponent;
  let fixture: ComponentFixture<HistoricoMesasVendasCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMesasVendasCompletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoMesasVendasCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
