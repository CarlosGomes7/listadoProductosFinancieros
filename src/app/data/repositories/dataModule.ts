import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ProductFinancialImplementationRepository } from "./productFinancial/user-implementation.repository";
import { ProductFinancialRepository } from "../../domain/repositories/product-financial-repositories";
import { ProductFinancialAddUseCase } from "../../domain/useCases/product-financial-add.usecase";
import { ProductFinancialGetListUseCase } from "../../domain/useCases/product-financial-get-list.usecase";
import { ProductFinancialValidationIDUseCase } from "../../domain/useCases/product-financial-validationID.usecase";
import { ProductFinancialDeleteUseCase } from "../../domain/useCases/product-financial-delete.usecase";
import { ProductFinancialUpdateUseCase } from "../../domain/useCases/product-financial-update.usecase";


const productFinancialAddUseCaseFactory = (productFinancialRepository: ProductFinancialRepository)=> {
    return new ProductFinancialAddUseCase(productFinancialRepository)
}
export const productFinancialAddUseCaseProvider = {
    provide: ProductFinancialAddUseCase,
    useFactory: productFinancialAddUseCaseFactory,
    deps:[ProductFinancialRepository]
}

const ProductFinancialGetListUseCaseFactory = (productFinancialRepository: ProductFinancialRepository)=>{
  return new ProductFinancialGetListUseCase(productFinancialRepository)
}
export const ProductFinancialGetListUseCaseProvider = {
  provide: ProductFinancialGetListUseCase,
  useFactory:ProductFinancialGetListUseCaseFactory,
  deps:[ProductFinancialRepository]
} 

const ProductFinancialValidationIDUseCaseFactory = (productFinancialRepository: ProductFinancialRepository) =>{
  return new ProductFinancialValidationIDUseCase(productFinancialRepository)
}
export const ProductFinancialValidationIDCaseProvider = {
  provide: ProductFinancialValidationIDUseCase,
  useFactory:ProductFinancialValidationIDUseCaseFactory,
  deps:[ProductFinancialRepository]
}

const ProductFinancialDeleteUseCaseFactory = (productFinancialRepository: ProductFinancialRepository)=>{
  return new ProductFinancialDeleteUseCase(productFinancialRepository)
}
export const ProductFinancialDeleteUseCaseUseCaseProvider = {
  provide:ProductFinancialDeleteUseCase,
  useFactory:ProductFinancialDeleteUseCaseFactory,
  deps:[ProductFinancialRepository]
}

const ProductFinancialUpdateUseCaseFactory = (productFinancialRepository: ProductFinancialRepository)=>{
  return new ProductFinancialUpdateUseCase(productFinancialRepository);
}
export const ProductFinancialUpdateUseCaseProvider = {
  provide:ProductFinancialUpdateUseCase,
  useFactory:ProductFinancialUpdateUseCaseFactory,
  deps:[ProductFinancialRepository]
}



@NgModule({
  providers:[
    productFinancialAddUseCaseProvider,
    ProductFinancialGetListUseCaseProvider,
    ProductFinancialValidationIDCaseProvider,
    ProductFinancialDeleteUseCaseUseCaseProvider,
    ProductFinancialUpdateUseCaseProvider,
    { provide: ProductFinancialRepository, useClass: ProductFinancialImplementationRepository}
  ],

  imports:[
    CommonModule,
    HttpClientModule,]  
})

export class DataModule {}