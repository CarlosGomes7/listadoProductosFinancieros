import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { Router } from '@angular/router';
import { ProductFinancialModel } from '../../../../../../domain/models/product-financial';
import { ProductFinancialUpdateUseCase } from '../../../../../../domain/useCases/product-financial-update.usecase';
import { UtilityService } from '../../../../../commons/services/utility.service';

const IMPORTS = [DataModule, ReactiveFormsModule, NgClass];


@Component({
  selector: 'app-update-product-page',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './update-product-page.component.html',
  styleUrl: './update-product-page.component.scss'
})
export class UpdateProductPageComponent implements OnInit{
  formUpdateItems!: FormGroup;
  dateRevision: Date = new Date();

  private updateProduct$ = inject(ProductFinancialUpdateUseCase);

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private utility: UtilityService) {    
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formUpdateItems = this.fb.group({
      id: [''],
      descripcion: ['', 
        [ Validators.maxLength(200),
          Validators.minLength(10),
          Validators.required
        ]
      ],
      fechaLiberacion: ['', 
        [
          Validators.required
        ]
      ],
      nombre: ['', 
        [ Validators.maxLength(100),
          Validators.minLength(5),
          Validators.required
        ]
      ],
      logotipo: ['',Validators.required],
      fechaRevision: ['']
    }); 
    this.formUpdateItems.controls['id'].disable();
    this.setValueForm();
  }

  setValueForm() {
    const itemSelected = this.utility.getItemSelected();
    if (itemSelected == undefined) {
      this.router.navigate(['/dashboard']);
    }else{
      const value = {
        id: itemSelected.id,
        descripcion: itemSelected.description,
        fechaLiberacion: itemSelected.dataRelease.slice(0,10),
        nombre:itemSelected.name,
        logotipo:itemSelected.logo,
        fechaRevision: itemSelected.dataRevision.slice(0,10)
      };  
      this.formUpdateItems.patchValue(value);
    }
  }

  
  validationDateRelease(){
    const valueInput = this.formUpdateItems.controls['fechaLiberacion'].value;    
    const dateRelease = new Date(valueInput);
    const dateNow = new Date(); 

      dateRelease.setHours(0,0,0,0)
      dateRelease.setDate(dateRelease.getDate() + 1);
      dateNow.setHours(0,0,0,0)

        if (dateRelease >= dateNow) {
          this.formUpdateItems.controls['fechaLiberacion'].setErrors(null);
          this.addDateReviewForInput(dateRelease)
        }else{
          this.formUpdateItems.controls['fechaLiberacion'].setErrors({'incorrect': true});
        }
  }

  addDateReviewForInput(_dateRelease:Date){
    _dateRelease.setFullYear(_dateRelease.getFullYear()+1);
    this.dateRevision = _dateRelease;
    this.formUpdateItems.controls['fechaRevision'].setValue(_dateRelease.toLocaleDateString());
  }

  clearForm(){
    this.formUpdateItems.reset();
  }

  onSubmit() {
    this.utility.showLoaderSpin();
    if (this.formUpdateItems.valid) {
      const dateRevision = this.dateRevision.toISOString().slice(0,10);
      const itemSelected = this.utility.getItemSelected();
      const body = {
        id: itemSelected.id,
        name: this.formUpdateItems.value.nombre,
        description: this.formUpdateItems.value.descripcion,
        logo: this.formUpdateItems.value.logotipo,
        date_release: this.formUpdateItems.value.fechaLiberacion,
        date_revision: dateRevision
      }
      this.updateProduct$.excute(body).subscribe(resp=>{
        this.router.navigate(['/dashboard']);
        this.utility.closeLoaderSpin();
      },error=>{
        console.log(error);
        this.router.navigate(['/error']);
        this.utility.closeLoaderSpin();
      });
    }
  }
}
