import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditCategoriaComponent } from './forms-edit-categoria.component';

describe('FormsEditCategoriaComponent', () => {
  let component: FormsEditCategoriaComponent;
  let fixture: ComponentFixture<FormsEditCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
