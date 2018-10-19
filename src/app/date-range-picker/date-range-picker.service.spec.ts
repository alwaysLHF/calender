import { TestBed, inject } from '@angular/core/testing';

import { DateRangePickerService } from './date-range-picker.service';

describe('DateRangePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateRangePickerService]
    });
  });

  it('should be created', inject([DateRangePickerService], (service: DateRangePickerService) => {
    expect(service).toBeTruthy();
  }));
});
