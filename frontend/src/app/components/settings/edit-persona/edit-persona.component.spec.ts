import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonaComponent } from './edit-persona.component';

describe('EditPersonaComponent', () => {
  let component: EditPersonaComponent;
  let fixture: ComponentFixture<EditPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
