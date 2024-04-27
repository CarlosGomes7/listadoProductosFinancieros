import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductFinancialTableComponent } from './list-product-financial-table.component';
import { ProductFinancialModel } from '../../../../domain/models/product-financial';
import { DatePipe } from '@angular/common';

describe('ListProductFinancial', () => {
  let component: ListProductFinancialTableComponent;
  let fixture: ComponentFixture<ListProductFinancialTableComponent>;
  let mockProduct: ProductFinancialModel;

  beforeEach(async () => {
    // Simula un objeto ProductFinancialModel
    mockProduct = {
      id:"1",
      name:"prueba",
      description:"desc",
      logo:"",
      dataRelease:new Date(),
      dataRevision:new Date()
    };
    await TestBed.configureTestingModule({
      imports: [ListProductFinancialTableComponent,DatePipe]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProductFinancialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set itemSelected and flagShowMenu to true', () => {    
    component.onClickShowModal(mockProduct);
    // Verifica si itemSelected es igual al producto simulado
    expect(component.itemSeleted).toEqual(mockProduct);
    // Verifica si flagShowMenu se establece en true después de llamar a la función
    expect(component.flagShowMenu).toBeTrue();
  });

  it('should set flagShowMenu to false', () => {
    component.onClickHideMenu();
    expect(component.flagShowMenu).toBeFalse();
  });

  it('should call onClickHideMenu', () => {
    spyOn(component, 'onClickHideMenu').and.returnValue();
    component.updateItems(mockProduct);
    expect(component.onClickHideMenu).toHaveBeenCalledTimes(1);
  });


  it('should call onClickHideMenu', () => {
    const mockId = "001";
    spyOn(component, 'onClickHideMenu').and.returnValue();
    component.deleteItems(mockId);
    expect(component.onClickHideMenu).toHaveBeenCalledTimes(1);
});

});
