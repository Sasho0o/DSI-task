/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateEmployeeResolver } from './update-employee.resolver';

describe('Service: UpdateEmployeeResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateEmployeeResolver]
    });
  });

  it('should ...', inject([UpdateEmployeeResolver], (service: UpdateEmployeeResolver) => {
    expect(service).toBeTruthy();
  }));
});
