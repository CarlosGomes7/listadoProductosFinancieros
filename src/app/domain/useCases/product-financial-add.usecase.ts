import { Observable } from "rxjs";
import { UseCase } from "../base/use-case";
import { ProductFinancialRepository } from "../repositories/product-financial-repositories";
import { ProductFinancialModel } from "../models/product-financial";


export class ProductFinancialAddUseCase implements UseCase<{
    id:string,
    name:string,
    description:string,
    logo:string,
    date_release:Date,
    date_revision:string},
    ProductFinancialModel> {
    
    constructor(private productFinancialRepository: ProductFinancialRepository) {}
    
    excute(params: {
        id:string,
        name:string,
        description:string,
        logo:string,
        date_release:Date,
        date_revision:string} ): Observable<ProductFinancialModel> {
        return this.productFinancialRepository.addProduct(params)
    }

}