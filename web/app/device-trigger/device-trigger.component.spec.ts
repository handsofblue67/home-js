import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTriggerComponent } from './device-trigger.component';

describe('DeviceTriggerComponent', () => {
  let component: DeviceTriggerComponent;
  let fixture: ComponentFixture<DeviceTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
