
import { Mapper } from "../../../../../base/utils/mapper";
import { ProductFinancialModel } from "../../../../domain/models/product-financial";
import { ProductFinancialEntity } from "../entities/product-financial.entity";

export class ProductFinancialImplementationRepositoryMapper extends Mapper<ProductFinancialEntity,ProductFinancialModel>{

    override mapFrom(param: ProductFinancialEntity): ProductFinancialModel {
        return {
            id:param.id,
            name:param.name,
            description:param.description,
            logo:param.logo,
            dataRelease:param.date_release,
            dataRevision:param.date_revision
        }
    }
    override mapTo(param: ProductFinancialModel): ProductFinancialEntity {
        return {            
            id:param.id,
            name:param.name,
            description:param.description,
            logo:param.logo,
            date_release:param.dataRelease,
            date_revision:param.dataRevision
        }
    }

}