import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationMapComponent } from './communication-map.component';

describe('CommunicationMapComponent', () => {
  let component: CommunicationMapComponent;
  let fixture: ComponentFixture<CommunicationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
