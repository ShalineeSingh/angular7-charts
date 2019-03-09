import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowUsageComponent } from './workflow-usage.component';

describe('WorkflowUsageComponent', () => {
  let component: WorkflowUsageComponent;
  let fixture: ComponentFixture<WorkflowUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
