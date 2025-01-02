import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspacosComponent } from './lista-espacos.component';

describe('ListaEspacosComponent', () => {
  let component: ListaEspacosComponent;
  let fixture: ComponentFixture<ListaEspacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspacosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
