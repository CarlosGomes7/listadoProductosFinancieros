import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, retry, throwError } from "rxjs";

@Injectable()
export class handleErrorInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'YOUR_AUTH_TOKEN_HERE';

      // Clone the request and add the authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });


    return handler.handle(authReq)
    .pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              // Handle HTTP errors
              if (err.status === 401) {
                console.error('Unauthorized request:', err);
              } else if(req.method=="DELETE" && err.status==200) {
                console.log("delete");
                return throwError(() => err); 
              }
            } else {
              // Handle non-HTTP errors
              console.error('An error occurred:', err);
            }
      
            // Re-throw the error to propagate it further
            return throwError(() => err); 
          })          
        )


  }


}





// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { catchError, of, retry, throwError } from 'rxjs';

// export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
//   const authToken = 'YOUR_AUTH_TOKEN_HERE';

//   console.log(req);

  

//   // Clone the request and add the authorization header
//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${authToken}`
//     }
//   });

  
//   return next(authReq).pipe(   
//     catchError( err => {
//       if (err instanceof HttpErrorResponse) {
//         // Handle HTTP errors
//         if (err.status === 401) {
//           console.error('Unauthorized request:', err);
//         } else if(req.method=="DELETE" && err.status==200) {
//           console.log("delete");
//           return of()
//         }
//       } else {
//         // Handle non-HTTP errors
//         console.error('An error occurred:', err);
//       }

//       // Re-throw the error to propagate it further
//       return throwError(() => err); 
//     }),
//     // retry(2)
    
//   )

  
// };
