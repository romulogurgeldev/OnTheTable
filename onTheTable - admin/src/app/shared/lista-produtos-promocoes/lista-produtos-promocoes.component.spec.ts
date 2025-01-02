import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdutosPromocoesComponent } from './lista-produtos-promocoes.component';

describe('ListaProdutosPromocoesComponent', () => {
  let component: ListaProdutosPromocoesComponent;
  let fixture: ComponentFixture<ListaProdutosPromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProdutosPromocoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProdutosPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
