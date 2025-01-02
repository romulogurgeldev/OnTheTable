import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditPromocaoComponent } from './forms-edit-promocao.component';

describe('FormsEditPromocaoComponent', () => {
  let component: FormsEditPromocaoComponent;
  let fixture: ComponentFixture<FormsEditPromocaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditPromocaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditPromocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
