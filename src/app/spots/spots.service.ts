import { Injectable } from '@angular/core';
import { ISpots } from './spots'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SpotsService {

    private _url: string = "/api/location/spots";

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