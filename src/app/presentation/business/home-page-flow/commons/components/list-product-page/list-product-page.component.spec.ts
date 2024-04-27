import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductPageComponent } from './list-product-page.component';
import { ListProductFinancialTableComponent } from '../../../../../commons/components/list-product-financial-table/list-product-financial-table.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { ProductFinancialDeleteUseCase } from '../../../../../../domain/useCases/product-financial-delete.usecase';
import { ProductFinancialGetListUseCase } from '../../../../../../domain/useCases/product-financial-get-list.usecase';
import { UtilityService } from '../../../../../commons/services/utility.service';
import { HomePagePresenterService } from './commons/services/presenter/home-page-presenter.service';
import { Observable, of, throwError } from 'rxjs';
import { ProductFinancialModel } from '../../../../../../domain/models/product-financial';

describe('ListProductPageComponent', () => {
  let component: ListProductPageComponent;
  let fixture: ComponentFixture<ListProductPageComponent>;

  // Mocking UtilityService
  class MockUtilityService {
    showLoaderSpin() {}
    closeLoaderSpin() {}
  }

  // Mocking getListProductUseCase
  class MockgetListProductUseCase {
    excute(body: any): Observable<any> {
      return of({});
    }
  }

  // Mocking getListProductUseCase
  class MockProductFinancialDeleteUseCase {
    excute(body: any): Observable<any> {
      return of({});
    }
  }

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const utilityServiceSpyObj = jasmine.createSpyObj('UtilityService', ['showLoaderSpin', 'closeLoaderSpin']);

    await TestBed.configureTestingModule({
      imports: [ListProductPageComponent, DataModule,FormsModule,ReactiveFormsModule, ListProductFinancialTableComponent],
      providers: [
        FormBuilder,
        { provide: HomePagePresenterService, useValue: {} },
        { provide: ProductFinancialGetListUseCase, useClass: MockgetListProductUseCase},
        { provide: ProductFinancialDeleteUseCase, useClass: MockProductFinancialDeleteUseCase},
        { provide: UtilityService, useClass: MockUtilityService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getListProduct$', () => {
    const mockProductList:ProductFinancialModel[] = [
      {
          "id": "007",
          "name": "James",
          "description": "agente secreto",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
          "id": "001",
          "name": "Carlos joao",
          "description": "test prueba 1 ",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
          "id": "002",
          "name": "prueba loading",
          "description": "jejejeje esta quedando bonito",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
          "id": "005",
          "name": "Carlos Gomes",
          "description": "2222222222",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      }
  ];
    spyOn(component.getListProduct$,'excute').and.returnValue(of(mockProductList));

    component.ngOnInit()
    expect(component.getListProduct$.excute).toHaveBeenCalledWith();
  });

  it('debería establecer registros en registrosHard.slice(0,5) si la opción seleccionada es "5" y hay al menos 5 registros', () => {
    component.opcionSeleccionada = '5';
    component.registrosHard = [
      {
          "id": "007",
          "name": "James",
          "description": "agente secreto",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
          "id": "001",
          "name": "Carlos joao",
          "description": "test prueba 1 ",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
        "id": "001",
        "name": "Carlos joao",
        "description": "test prueba 1 ",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
        "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
    },
      {
          "id": "002",
          "name": "prueba loading",
          "description": "jejejeje esta quedando bonito",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      },
      {
          "id": "005",
          "name": "Carlos Gomes",
          "description": "2222222222",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
          "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
      }
  ];

    component.limitProduct();

    expect(component.registros).toEqual(component.registrosHard.slice(0, 5));
  });

  it('debería establecer registros en registrosHard.slice(0,10) si la opción seleccionada es "10" y hay al menos 11 registros', () => {
    component.opcionSeleccionada = '10';
    component.registrosHard = [ {
      "id": "007",
      "name": "James",
      "description": "agente secreto",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
      "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
  },
  {
      "id": "001",
      "name": "Carlos joao",
      "description": "test prueba 1 ",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
      "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
  },
  {
    "id": "001",
    "name": "Carlos joao",
    "description": "test prueba 1 ",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
    "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
  {
      "id": "002",
      "name": "prueba loading",
      "description": "jejejeje esta quedando bonito",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
      "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
  },
  {
      "id": "005",
      "name": "Carlos Gomes",
      "description": "2222222222",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
      "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
  }, {
    "id": "007",
    "name": "James",
    "description": "agente secreto",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
    "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
{
    "id": "001",
    "name": "Carlos joao",
    "description": "test prueba 1 ",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
    "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
{
  "id": "002",
  "name": "prueba loading",
  "description": "jejejeje esta quedando bonito",
  "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
  "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
{
  "id": "001",
  "name": "Carlos joao",
  "description": "test prueba 1 ",
  "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
  "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
{
    "id": "002",
    "name": "prueba loading",
    "description": "jejejeje esta quedando bonito",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
    "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
},
{
    "id": "005",
    "name": "Carlos Gomes",
    "description": "2222222222",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "dataRelease": new Date("2024-04-30T00:00:00.000+00:00"),
    "dataRevision": new Date("2025-04-30T00:00:00.000+00:00")
    }];

    component.limitProduct();

    expect(component.registros).toEqual(component.registrosHard.slice(0, 10));
  });
  
  it('should deleted product', () => {
    const error = { status: 200 };
    spyOn(component.deleteProduct$,'excute').and.returnValue(throwError(error));

    component.deleteItems("001");
    expect(component.deleteProduct$.excute).toHaveBeenCalled();
  });

});
