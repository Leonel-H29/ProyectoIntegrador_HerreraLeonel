import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHardSkillsComponent } from './edit-hard-skills.component';

describe('EditHardSkillsComponent', () => {
  let component: EditHardSkillsComponent;
  let fixture: ComponentFixture<EditHardSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHardSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
