import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditCepComponent } from './forms-edit-cep.component';

describe('FormsEditCepComponent', () => {
  let component: FormsEditCepComponent;
  let fixture: ComponentFixture<FormsEditCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditCepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
