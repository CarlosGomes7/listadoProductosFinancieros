import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataModule } from '../../../../../../data/repositories/dataModule';
import { Router } from '@angular/router';
import { ProductFinancialAddUseCase } from '../../../../../../domain/useCases/product-financial-add.usecase';
import { ProductFinancialValidationIDUseCase } from '../../../../../../domain/useCases/product-financial-validationID.usecase';
import { UtilityService } from '../../../../../commons/services/utility.service';

const IMPORTS = [DataModule, ReactiveFormsModule, NgClass];

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.scss'
})

export class AddProductPageComponent implements OnInit {
  formAddItems!: FormGroup;
  dateRevision: Date = new Date();
  public addProduct$ = inject(ProductFinancialAddUseCase);
  public validationID$ = inject(ProductFinancialValidationIDUseCase);
  inputIdValid:boolean=false;

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    public utility: UtilityService) {    
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formAddItems = this.fb.group({
      id: ['', 
        [ Validators.maxLength(10),
          Validators.minLength(3),
          Validators.required
        ]
      ],
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
  }
  
  validateId(){   
    if (this.formAddItems.get('id')?.valid) {
      this.utility.showLoaderSpin();
      this.formAddItems.controls['id'].disable();
      const id = {'id':this.formAddItems.get('id')?.value}

      this.validationID$.excute(id).subscribe(
        resp=>{
          if (resp) {
            this.formAddItems.disable();
            this.inputIdValid = true;
            
          }else{
            this.inputIdValid = false;
            this.formAddItems.controls['id'].setErrors(null);
            this.formAddItems.enable();
          }
          this.formAddItems.controls['id'].enable();
          this.utility.closeLoaderSpin();
        },
        error =>{
          this.formAddItems.controls['id'].enable();
          this.formAddItems.controls['id'].setErrors({'incorrect': true});
          this.utility.closeLoaderSpin();
        }
      );
    }
  }

  validationDateRelease(){
    const valueInput = this.formAddItems.controls['fechaLiberacion'].value;    
    const dateRelease = new Date(valueInput);
    const dateNow = new Date(); 

      dateRelease.setHours(0,0,0,0)
      dateRelease.setDate(dateRelease.getDate() + 1);
      dateNow.setHours(0,0,0,0)

        if (dateRelease >= dateNow) {
          this.formAddItems.controls['fechaLiberacion'].setErrors(null);
          this.addDateReviewForInput(dateRelease)
        }else{
          this.formAddItems.controls['fechaLiberacion'].setErrors({'incorrect': true});
        }
  }

  addDateReviewForInput(_dateRelease:Date){
    _dateRelease.setFullYear(_dateRelease.getFullYear()+1);
    this.dateRevision = _dateRelease;
    this.formAddItems.controls['fechaRevision'].setValue(_dateRelease.toLocaleDateString());
  }

  clearForm(){
    this.formAddItems.reset();
  }

  onSubmit() {
    this.utility.showLoaderSpin();
    if (this.formAddItems.valid) {
      const dateRevision = this.dateRevision.toISOString().slice(0,10);

      const body = {
        id: this.formAddItems.value.id,
        name: this.formAddItems.value.nombre,
        description: this.formAddItems.value.descripcion,
        logo: this.formAddItems.value.logotipo,
        date_release: this.formAddItems.value.fechaLiberacion,
        date_revision: dateRevision
      }
      this.addProduct$.excute(body).subscribe(resp=>{
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

