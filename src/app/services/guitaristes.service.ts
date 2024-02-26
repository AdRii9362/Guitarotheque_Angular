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

  getAllGuitariste() : Observable<Guitaristes[]>{
    return this._client.get<Guitaristes[]>(this.url + "Guitariste/GetAll")
  }

  insertGuitariste(guitariste: Guitaristes): Observable<any> {
    console.log(guitariste);
    
    return this._client.post<any>(this.url + "Guitariste/Insert", guitariste);
  }

  deleteGuitariste(selectedGuitaristeId: number): Observable<any> {
    
    return this._client.delete<any>(this.url + "Guitariste/"+ selectedGuitaristeId);

}

updateGuitariste(selectedGuitaristeId:number,guitariste: Guitaristes): Observable<any>{
  console.log(guitariste);

  return this._client.put<any>(this.url + "Guitariste/" + selectedGuitaristeId, guitariste);
  
}
}
