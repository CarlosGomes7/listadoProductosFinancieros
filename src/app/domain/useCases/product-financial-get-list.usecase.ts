import { Observable } from "rxjs";
import { UseCase } from "../base/use-case";
import { ProductFinancialRepository } from "../repositories/product-financial-repositories";
import { ProductFinancialModel } from "../models/product-financial";


export class ProductFinancialGetListUseCase implements UseCase<{},ProductFinancialModel[]> {
    
    constructor(private productFinancialRepository: ProductFinancialRepository) {}
    
    excute(): Observable<ProductFinancialModel[]> {
        return this.productFinancialRepository.getListProduct()
    }

}