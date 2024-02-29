import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guitares } from '../models/guitares.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuitaresService {

  private url : string = "https://localhost:7206/api/"

  constructor(private _client : HttpClient){} 

  getAllGuitare(): Observable<Guitares[]>{
    return this._client.get<Guitares[]>(this.url + "Guitare/GetAll")
  }
}
