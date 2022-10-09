import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProyectosComponent } from './new-proyectos.component';

describe('NewProyectosComponent', () => {
  let component: NewProyectosComponent;
  let fixture: ComponentFixture<NewProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
