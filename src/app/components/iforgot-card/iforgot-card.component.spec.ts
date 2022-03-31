import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IforgotCardComponent } from './iforgot-card.component';

describe('IforgotCardComponent', () => {
  let component: IforgotCardComponent;
  let fixture: ComponentFixture<IforgotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IforgotCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IforgotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
