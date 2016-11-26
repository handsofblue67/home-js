/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoodDispenserService } from './food-dispenser.service';

describe('FoodDispenserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodDispenserService]
    });
  });

  it('should ...', inject([FoodDispenserService], (service: FoodDispenserService) => {
    expect(service).toBeTruthy();
  }));
});
