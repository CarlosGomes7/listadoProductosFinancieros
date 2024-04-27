import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductPageComponent } from './update-product-page.component';
import { Observable, of } from 'rxjs';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { UtilityService } from '../../../../../commons/services/utility.service';
import { ProductFinancialUpdateUseCase } from '../../../../../../domain/useCases/product-financial-update.usecase';

// Mocking UtilityService
class MockUtilityService {
  showLoaderSpin() {}
  closeLoaderSpin() {}
  getItemSelected() {}
}

// Mocking ProductFinancialUpdateUseCase
class MockProductFinancialUpdateUseCase {
  excute(body: any): Observable<any> {
    // Mock implementation, you can customize this as needed for your test cases
    return of({});
  }
}

describe('UpdateProductPageComponent', () => {
  let component: UpdateProductPageComponent;
  let fixture: ComponentFixture<UpdateProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductPageComponent,DataModule, ReactiveFormsModule, NgClass],
      providers: [
        { provide: UtilityService, useClass: MockUtilityService },
        { provide: ProductFinancialUpdateUseCase, useClass: MockProductFinancialUpdateUseCase }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formAddItems should be initialized with default values', () => {
    expect(component.formUpdateItems).toBeDefined();
    expect(component.formUpdateItems.get('id')).toBeTruthy();
    expect(component.formUpdateItems.get('descripcion')).toBeTruthy();
    expect(component.formUpdateItems.get('fechaLiberacion')).toBeTruthy();
    expect(component.formUpdateItems.get('nombre')).toBeTruthy();
    expect(component.formUpdateItems.get('logotipo')).toBeTruthy();
    expect(component.formUpdateItems.get('fechaRevision')).toBeTruthy();
  });

  it('should set errors to null if dateRelease is greater than or equal to dateNow', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    component.formUpdateItems.controls['fechaLiberacion'].setValue(futureDate.toISOString());

    component.validationDateRelease();

    expect(component.formUpdateItems.controls['fechaLiberacion'].errors).toBeNull();
  });

  it('should set errors if dateRelease is less than dateNow', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    component.formUpdateItems.controls['fechaLiberacion'].setValue(pastDate.toISOString().slice(0,10));

    component.validationDateRelease();

    expect(component.formUpdateItems.controls['fechaLiberacion'].errors).toEqual({ 'incorrect': true });
  });


});
