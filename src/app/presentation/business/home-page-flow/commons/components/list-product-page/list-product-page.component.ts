import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomePagePresenterService } from './commons/services/presenter/home-page-presenter.service';
import { UtilityService } from '../../../../../commons/services/utility.service';
import { ProductFinancialGetListUseCase } from '../../../../../../domain/useCases/product-financial-get-list.usecase';
import { ProductFinancialModel } from '../../../../../../domain/models/product-financial';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { ListProductFinancialTableComponent } from '../../../../../commons/components/list-product-financial-table/list-product-financial-table.component';
import { ProductFinancialDeleteUseCase } from '../../../../../../domain/useCases/product-financial-delete.usecase';

const IMPORTS = [DataModule,FormsModule,ReactiveFormsModule, ListProductFinancialTableComponent];
@Component({
  selector: 'app-list-product-page',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './list-product-page.component.html',
  styleUrl: './list-product-page.component.scss'
})

export class ListProductPageComponent implements OnInit  {
  registros: ProductFinancialModel[] = [];
  registrosHard:ProductFinancialModel[] = [];
  opciones: string[] = ['5', '10', '20'];
  opcionSeleccionada: string = '5';
  formSearchRegister!: FormGroup;
  
public getListProduct$ = inject(ProductFinancialGetListUseCase);
public deleteProduct$ = inject(ProductFinancialDeleteUseCase);


  constructor(
    private router: Router,
    private fb: FormBuilder,
    public hppresenter: HomePagePresenterService,
    private utility: UtilityService) {}

  ngOnInit() {
    this.utility.showLoaderSpin();
    this.getRegistros();
    this.initForm();
  }

  initForm(){
    this.formSearchRegister = this.fb.group({
      searchName: ['']
    }); 
  }
  
  getRegistros(){
    this.getListProduct$.excute().subscribe(
      (resp:ProductFinancialModel[])=>{
        this.registros = resp.map((productoF:ProductFinancialModel) => ({ ...productoF }));
        this.registrosHard = this.registros.map((productoF:ProductFinancialModel) => ({ ...productoF }));
        this.utility.closeLoaderSpin();
      },
      error=>{
        this.utility.closeLoaderSpin();
        this.router.navigate(['/error']);  
      })
  } 

  limitProduct(){
    const limit = this.registrosHard.length;    
    if (this.opcionSeleccionada == '5' && 5 <= limit){
      this.registros = this.registrosHard.slice(0,5);
    }else if(this.opcionSeleccionada == '10' && 10 <= limit){
      this.registros = this.registrosHard.slice(0,10);
    }else if(this.opcionSeleccionada == '20' && 20 <= limit){
      this.registros = this.registrosHard.slice(0,20);
    }else{
      this.registros = this.registrosHard.slice(0,5);
    }
  }

  deleteItems(id:string){
    this.utility.showLoaderSpin();
    this.deleteProduct$.excute({'id':id}).subscribe(
      resp=>{     
        this.getRegistros();
        this.utility.closeLoaderSpin();
    },
    error=>{
      console.error(error);
      if (error.status==200) {
        this.getRegistros();
      }else{
        this.router.navigate(['/error']);
      }
      this.utility.closeLoaderSpin();
    });
  }

  updateItems(item:ProductFinancialModel){
    this.router.navigate(['/dashboard/editar']);
    this.utility.setItemSelected(item);
  }

  filtrarDatos() {    
    setTimeout(() => {
      const value =  this.formSearchRegister.controls['searchName'].value.toLowerCase();
      let arraySearch = this.registrosHard.filter((e:ProductFinancialModel) =>e.name.toLowerCase().includes(value));
      this.registros = arraySearch.map((objeto:any) => ({ ...objeto }));
    }, 1000);
  }

  navigateToAdd() {
    this.router.navigate(['/dashboard/agregar']);    
  }

}
