import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRestauranteComponent } from './lista-restaurante.component';

describe('ListaRestauranteComponent', () => {
  let component: ListaRestauranteComponent;
  let fixture: ComponentFixture<ListaRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
