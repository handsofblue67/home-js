/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DextersLabService } from './dexters-lab.service';

describe('DextersLabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DextersLabService]
    });
  });

  it('should ...', inject([DextersLabService], (service: DextersLabService) => {
    expect(service).toBeTruthy();
  }));
});
