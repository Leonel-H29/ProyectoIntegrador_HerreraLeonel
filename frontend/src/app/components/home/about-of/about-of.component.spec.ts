import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOfComponent } from './about-of.component';

describe('AboutOfComponent', () => {
  let component: AboutOfComponent;
  let fixture: ComponentFixture<AboutOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
