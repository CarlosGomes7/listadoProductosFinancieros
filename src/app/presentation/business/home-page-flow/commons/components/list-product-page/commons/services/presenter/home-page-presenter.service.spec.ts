/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomePagePresenterService } from './home-page-presenter.service';

describe('Service: HomePagePresenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomePagePresenterService]
    });
  });

  it('should ...', inject([HomePagePresenterService], (service: HomePagePresenterService) => {
    expect(service).toBeTruthy();
  }));
});
