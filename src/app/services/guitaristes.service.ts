import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guitaristes } from '../models/guitaristes.model';


@Injectable({
  providedIn: 'root'
})
export class GuitaristesService {

  private url : string = "https://localhost:7206/api/"
  constructor(private _client : HttpClient) { }

  getAll() : Observable<Guitaristes[]>{
    return this._client.get<Guitaristes[]>(this.url + "Guitariste/GetAll")
  }

  Insert(guitariste: Guitaristes): Observable<any> {
    console.log(guitariste);
    
    return this._client.post<any>(this.url + "Guitariste/Insert", guitariste);
  }
}
