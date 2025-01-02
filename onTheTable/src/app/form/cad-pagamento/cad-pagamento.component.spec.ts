import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPagamentoComponent } from './cad-pagamento.component';

describe('CadPagamentoComponent', () => {
  let component: CadPagamentoComponent;
  let fixture: ComponentFixture<CadPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
