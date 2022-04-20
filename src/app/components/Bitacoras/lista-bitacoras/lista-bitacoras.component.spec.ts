import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBitacorasComponent } from './lista-bitacoras.component';

describe('ListaBitacorasComponent', () => {
  let component: ListaBitacorasComponent;
  let fixture: ComponentFixture<ListaBitacorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBitacorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
