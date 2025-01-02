import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditComplementosComponent } from './forms-edit-complementos.component';

describe('FormsEditComplementosComponent', () => {
  let component: FormsEditComplementosComponent;
  let fixture: ComponentFixture<FormsEditComplementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditComplementosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditComplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
