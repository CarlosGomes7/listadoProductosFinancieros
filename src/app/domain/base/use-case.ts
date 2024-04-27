import { Observable } from "rxjs";


export interface UseCase<S,T>{
    excute(param: S): Observable<T>;
}