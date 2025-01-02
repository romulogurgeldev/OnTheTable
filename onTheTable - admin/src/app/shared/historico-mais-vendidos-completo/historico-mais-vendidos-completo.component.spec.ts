import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMaisVendidosCompletoComponent } from './historico-mais-vendidos-completo.component';

describe('HistoricoMaisVendidosCompletoComponent', () => {
  let component: HistoricoMaisVendidosCompletoComponent;
  let fixture: ComponentFixture<HistoricoMaisVendidosCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMaisVendidosCompletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoMaisVendidosCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
