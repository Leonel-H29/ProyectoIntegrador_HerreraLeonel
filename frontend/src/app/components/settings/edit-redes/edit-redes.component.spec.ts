import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRedesComponent } from './edit-redes.component';

describe('EditRedesComponent', () => {
  let component: EditRedesComponent;
  let fixture: ComponentFixture<EditRedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRedesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
