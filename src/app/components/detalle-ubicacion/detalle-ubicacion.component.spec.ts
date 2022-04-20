import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUbicacionComponent } from './detalle-ubicacion.component';

describe('DetalleUbicacionComponent', () => {
  let component: DetalleUbicacionComponent;
  let fixture: ComponentFixture<DetalleUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
