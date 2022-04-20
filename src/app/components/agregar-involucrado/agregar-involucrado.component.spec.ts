import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInvolucradoComponent } from './agregar-involucrado.component';

describe('AgregarInvolucradoComponent', () => {
  let component: AgregarInvolucradoComponent;
  let fixture: ComponentFixture<AgregarInvolucradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarInvolucradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInvolucradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
