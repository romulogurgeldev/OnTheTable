import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditMesaComponent } from './forms-edit-mesa.component';

describe('FormsEditMesaComponent', () => {
  let component: FormsEditMesaComponent;
  let fixture: ComponentFixture<FormsEditMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
