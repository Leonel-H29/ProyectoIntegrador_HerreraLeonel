import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzquierdoComponent } from './izquierdo.component';

describe('IzquierdoComponent', () => {
  let component: IzquierdoComponent;
  let fixture: ComponentFixture<IzquierdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzquierdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzquierdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
