import { Observable } from "rxjs";
import { UseCase } from "../base/use-case";
import { ProductFinancialRepository } from "../repositories/product-financial-repositories";

export class ProductFinancialValidationIDUseCase implements UseCase<{id:string},boolean>{

    constructor(private productFinancialRepository: ProductFinancialRepository) {
    }

    excute(param:{id:string}): Observable<boolean> {
        return this.productFinancialRepository.validationId(param.id);
    }

}