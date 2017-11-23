import { TestBed, inject } from '@angular/core/testing';

import { UploaddpService } from './uploaddp.service';

describe('UploaddpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploaddpService]
    });
  });

  it('should be created', inject([UploaddpService], (service: UploaddpService) => {
    expect(service).toBeTruthy();
  }));
});
