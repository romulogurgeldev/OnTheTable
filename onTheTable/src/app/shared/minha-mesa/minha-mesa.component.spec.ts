import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaMesaComponent } from './minha-mesa.component';

describe('MinhaMesaComponent', () => {
  let component: MinhaMesaComponent;
  let fixture: ComponentFixture<MinhaMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhaMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
