import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTimelinesComponent } from './api-timelines.component';

describe('ApiTimelinesComponent', () => {
  let component: ApiTimelinesComponent;
  let fixture: ComponentFixture<ApiTimelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTimelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
