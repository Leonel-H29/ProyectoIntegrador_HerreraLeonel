import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEducacionComponent } from './new-educacion.component';

describe('NewEducacionComponent', () => {
  let component: NewEducacionComponent;
  let fixture: ComponentFixture<NewEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
