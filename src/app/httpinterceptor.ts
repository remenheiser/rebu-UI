import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
 
@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
 
    if (!request.headers.has('Authorization')) {
      request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
    }
 
 
    return next.handle(request);
 
  }
 
}