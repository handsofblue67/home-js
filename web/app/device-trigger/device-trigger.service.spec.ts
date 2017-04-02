import { TestBed, inject } from '@angular/core/testing';

import { DeviceTriggerService } from './device-trigger.service';

describe('DeviceTriggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceTriggerService]
    });
  });

  it('should ...', inject([DeviceTriggerService], (service: DeviceTriggerService) => {
    expect(service).toBeTruthy();
  }));
});
