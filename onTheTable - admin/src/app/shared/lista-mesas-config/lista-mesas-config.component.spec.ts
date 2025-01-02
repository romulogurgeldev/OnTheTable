import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMesasConfigComponent } from './lista-mesas-config.component';

describe('ListaMesasComponent', () => {
  let component: ListaMesasConfigComponent;
  let fixture: ComponentFixture<ListaMesasConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMesasConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMesasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
