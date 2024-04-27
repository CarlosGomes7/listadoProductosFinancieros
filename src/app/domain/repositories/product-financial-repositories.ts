import { Observable } from "rxjs";
import { ProductFinancialModel } from "../models/product-financial";

export abstract class ProductFinancialRepository {
    abstract addProduct(params: {
        id:string,
        name:string,
        description:string,
        logo:string,
        date_release:Date,
        date_revision:string}) : Observable<ProductFinancialModel>;

    abstract getListProduct() : Observable<ProductFinancialModel[]>;

    abstract validationId(id:string):Observable<boolean>;

    abstract deleteProduct(id:string):Observable<boolean>;

    abstract updateProduct(params: {
        id:string,
        name:string,
        description:string,
        logo:string,
        date_release:Date,
        date_revision:string}) : Observable<ProductFinancialModel>;
}
