import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ISpots } from './spots'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpotsService {

    private _url: string = "http://localhost:3000/spots";

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        const body = res;
        return body || {};
      }

    getSpots(): Observable<any>{
        return this.http.get<any>(this._url).pipe(
            map(this.extractData)
        );
    }
}