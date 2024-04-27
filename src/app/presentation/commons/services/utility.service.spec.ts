/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';
import { ProductFinancialModel } from '../../../domain/models/product-financial';

describe('Service: Utility', () => {
  let mockProduct: ProductFinancialModel;
  beforeEach(() => {
    // Simula un objeto ProductFinancialModel
    mockProduct = {
      id:"1",
      name:"prueba",
      description:"desc",
      logo:"",
      dataRelease:new Date(),
      dataRevision:new Date()
    };
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should ...', inject([UtilityService], (service: UtilityService) => {
    expect(service).toBeTruthy();
  })); 

  it('debería establecer el item seleccionado correctamente', inject([UtilityService], (service: UtilityService)=> {
    service.setItemSelected(mockProduct);
    expect(service.itemSelected).toEqual(mockProduct);
  }));
 

});
