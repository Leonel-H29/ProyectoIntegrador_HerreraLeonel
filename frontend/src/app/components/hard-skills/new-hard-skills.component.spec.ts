import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHardSkillsComponent } from './new-hard-skills.component';

describe('NewHardSkillsComponent', () => {
  let component: NewHardSkillsComponent;
  let fixture: ComponentFixture<NewHardSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHardSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
