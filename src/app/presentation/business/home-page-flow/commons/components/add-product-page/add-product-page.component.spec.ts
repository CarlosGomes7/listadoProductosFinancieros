import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPageComponent } from './add-product-page.component';
import { Observable, of } from 'rxjs';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { ProductFinancialAddUseCase } from '../../../../../../domain/useCases/product-financial-add.usecase';
import { ProductFinancialValidationIDUseCase } from '../../../../../../domain/useCases/product-financial-validationID.usecase';
import { UtilityService } from '../../../../../commons/services/utility.service';


// Mocking UtilityService
class MockUtilityService {
  showLoaderSpin() {}
  closeLoaderSpin() {}
}

// Mocking ProductFinancialAddUseCase
class MockProductFinancialAddUseCase {
  excute(body: any): Observable<any> {
    // Mock implementation, you can customize this as needed for your test cases
    return of({});
  }
}

// Mocking ProductFinancialValidationIDUseCase
class MockProductFinancialValidationIDUseCase {
  excute(id: any): Observable<boolean> {
    // Mock implementation, you can customize this as needed for your test cases
    return of(true);
  }
}

describe('AddProductPageComponent', () => {
  let component: AddProductPageComponent;
  let fixture: ComponentFixture<AddProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductPageComponent, DataModule, ReactiveFormsModule, NgClass],
      providers: [
        { provide: UtilityService, useClass: MockUtilityService },
        { provide: ProductFinancialAddUseCase, useClass: MockProductFinancialAddUseCase },
        { provide: ProductFinancialValidationIDUseCase, useClass: MockProductFinancialValidationIDUseCase }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('formAddItems should be initialized with default values', () => {
    expect(component.formAddItems).toBeDefined();
    expect(component.formAddItems.get('id')).toBeTruthy();
    expect(component.formAddItems.get('descripcion')).toBeTruthy();
    expect(component.formAddItems.get('fechaLiberacion')).toBeTruthy();
    expect(component.formAddItems.get('nombre')).toBeTruthy();
    expect(component.formAddItems.get('logotipo')).toBeTruthy();
    expect(component.formAddItems.get('fechaRevision')).toBeTruthy();
  });

  it('should disable id input and call utility service when validateId() is called with valid id', () => {
    spyOn(component.utility, 'showLoaderSpin');
    spyOn(component.utility, 'closeLoaderSpin');
    spyOn(component.formAddItems.controls['id'], 'disable');
    spyOn(component.validationID$, 'excute').and.returnValue(of(true));

    component.formAddItems.controls['id'].setValue('validId');
    component.validateId();

    expect(component.utility.showLoaderSpin).toHaveBeenCalled();
    expect(component.formAddItems.controls['id'].disable).toHaveBeenCalled();
    expect(component.validationID$.excute).toHaveBeenCalledWith({ id: 'validId' });
    expect(component.inputIdValid).toBeTrue();
    expect(component.utility.closeLoaderSpin).toHaveBeenCalled();
  });

  it('should enable id input and set error when validateId() is called with invalid id', () => {
    spyOn(component.utility, 'showLoaderSpin');
    spyOn(component.utility, 'closeLoaderSpin');
    spyOn(component.formAddItems.controls['id'], 'enable');
    spyOn(component.formAddItems.controls['id'], 'setErrors');
    spyOn(component.validationID$, 'excute').and.returnValue(of(false));

    component.formAddItems.controls['id'].setValue('invalidId');
    component.validateId();

    expect(component.utility.showLoaderSpin).toHaveBeenCalled();
    expect(component.formAddItems.controls['id'].enable).toHaveBeenCalled();
    expect(component.validationID$.excute).toHaveBeenCalledWith({ id: 'invalidId' });
    expect(component.inputIdValid).toBeFalse();
    expect(component.formAddItems.controls['id'].setErrors).toHaveBeenCalled();
    expect(component.utility.closeLoaderSpin).toHaveBeenCalled();
  });


  it('should valid the date Release', () => {
    const valueInput = '2024-08-27'; 
    component.formAddItems.controls['fechaLiberacion'].setValue(valueInput);

    // Ejecuta la función
    component.validationDateRelease();

    // Verifica que los errores se establezcan correctamente
    if (new Date(valueInput) >= new Date()) {
      expect(component.formAddItems.controls['fechaLiberacion'].errors).toBeNull();
    } else {
      expect(component.formAddItems.controls['fechaLiberacion'].hasError('incorrect')).toBeTrue();
    }
  });


});
