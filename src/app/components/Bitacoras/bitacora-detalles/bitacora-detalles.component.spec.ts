import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraDetallesComponent } from './bitacora-detalles.component';

describe('BitacoraDetallesComponent', () => {
  let component: BitacoraDetallesComponent;
  let fixture: ComponentFixture<BitacoraDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
