import { TestBed, inject } from '@angular/core/testing';

import { UploadedService } from './uploaded.service';

describe('UploadedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadedService]
    });
  });

  it('should be created', inject([UploadedService], (service: UploadedService) => {
    expect(service).toBeTruthy();
  }));
});
