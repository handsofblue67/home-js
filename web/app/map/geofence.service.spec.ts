/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeofenceService } from './geofence.service';

describe('Service: Geofence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeofenceService]
    });
  });

  it('should ...', inject([GeofenceService], (service: GeofenceService) => {
    expect(service).toBeTruthy();
  }));
});
