import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ISpots } from './chosen-spot'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})




export class ChosenSpotService {

    

    private _url: string = "http://localhost:3000/chosen-spot/";
 
    
    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        const body = res;
        return body || {};
      }

    getSpots(id): Observable<any>{
        console.log("Here: " + this._url+id);
        return this.http.get<any>(this._url+id).pipe(
            map(this.extractData)
        );
    }
    
}