import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprojectComponent } from './testproject.component';

describe('TestprojectComponent', () => {
  let component: TestprojectComponent;
  let fixture: ComponentFixture<TestprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
