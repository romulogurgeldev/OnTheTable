import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMaisVendidosComponent } from './historico-mais-vendidos.component';

describe('HistoricoMaisVendidosComponent', () => {
  let component: HistoricoMaisVendidosComponent;
  let fixture: ComponentFixture<HistoricoMaisVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMaisVendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
