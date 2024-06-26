import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { ProductFinancialRepository } from "../../../domain/repositories/product-financial-repositories";
import { ProductFinancialImplementationRepositoryMapper } from "./mappers/product-financial-repository.mapper";
import { ProductFinancialModel } from "../../../domain/models/product-financial";
import { ProductFinancialEntity } from "./entities/product-financial.entity";
import { environment } from "../../../presentation/environments/environment";
import { PRODUCT_FINANCIAL } from "./enum/product-financial";

@Injectable()

export class ProductFinancialImplementationRepository extends ProductFinancialRepository {
   
            
    headers = new HttpHeaders({
        'authorid': 477,
        'Content-Type': 'application/json'
    });

    productFinancialMapper = new ProductFinancialImplementationRepositoryMapper();
    
    constructor(private http: HttpClient){
        super();
    }

    override addProduct(params: { id: string; name: string; description: string; logo: string; date_release: Date; date_revision: string; }): Observable<ProductFinancialModel> {
        const apiUrl = `${environment.API_BASE}${PRODUCT_FINANCIAL.ADD}`;
        return this.http
            .post<ProductFinancialEntity>(apiUrl,params,{headers:this.headers})
            .pipe(map((resp:ProductFinancialEntity)=> {
                return this.productFinancialMapper.mapFrom(resp);
            })
        )
    }

    override getListProduct(): Observable<ProductFinancialModel[]> {
        const apiUrl = `${environment.API_BASE}${PRODUCT_FINANCIAL.LIST}`;
        return this.http
            .get<ProductFinancialEntity[]>(apiUrl, {headers:this.headers})
            .pipe(
                map((resp:ProductFinancialEntity[])=>{
                    return resp.map((item: ProductFinancialEntity) => this.productFinancialMapper.mapFrom(item));
                })                
            )
    }   

    override validationId(id: string): Observable<boolean> {
        const apiUrl = `${environment.API_BASE}${PRODUCT_FINANCIAL.VALIDATION_ID}?id=${id}`;
        return this.http
            .get<boolean>(apiUrl, {headers:this.headers})
    }

    override deleteProduct(id: string): Observable<boolean> {
        const apiUrl = `${environment.API_BASE}${PRODUCT_FINANCIAL.DELETE}?id=${id}`;
        return this.http
            .delete<boolean>(apiUrl, {headers:this.headers})
    }

    override updateProduct(params: { id: string; name: string; description: string; logo: string; date_release: Date; date_revision: string; }): Observable<ProductFinancialModel> {        
        const apiUrl = `${environment.API_BASE}${PRODUCT_FINANCIAL.UPDATE}`;
        return this.http
            .put<ProductFinancialEntity>(apiUrl,params,{headers:this.headers})
            .pipe(map((resp:ProductFinancialEntity)=> {
                return this.productFinancialMapper.mapFrom(resp);
            })
        )
    }
    
        
}