import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/catch';
import { throwError } from "rxjs";

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
 
    if (!request.headers.has('Authorization')) {
      request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
    }
 
 
    return next.handle(request)
    
    .catch(error => {
      if (error instanceof HttpErrorResponse && error.status == 401) {
          this.router.navigateByUrl('/unauthorized', {replaceUrl: true});

          return new EmptyObservable();
      }
      else
          return throwError(error);
  });
  }
 
}