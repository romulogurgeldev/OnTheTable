import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasConfigComponent } from './mesas-config.component';

describe('MesasConfigComponent', () => {
  let component: MesasConfigComponent;
  let fixture: ComponentFixture<MesasConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
