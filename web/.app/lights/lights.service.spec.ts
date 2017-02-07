/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { LightsService } from './lights.service'

describe('Service: Lights', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightsService]
    });
  });

  it('should ...', inject([LightsService], (service: LightsService) => {
    expect(service).toBeTruthy()
  }))
})
