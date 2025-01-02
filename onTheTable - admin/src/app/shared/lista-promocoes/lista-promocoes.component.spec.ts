import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPromocoesComponent } from './lista-promocoes.component';

describe('ListaPromocoesComponent', () => {
  let component: ListaPromocoesComponent;
  let fixture: ComponentFixture<ListaPromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPromocoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
