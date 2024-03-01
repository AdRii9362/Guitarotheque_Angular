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

  insertGuitare(guitare: Guitares): Observable<any> {
    console.log(guitare);
    
    return this._client.post<any>(this.url + "Guitare/Insert", guitare);
  }

  deleteGuitare(selectDeleteGuitareId: number): Observable<any> {
    
    return this._client.delete<any>(this.url + "Guitare/"+ selectDeleteGuitareId);
  }

  updateGuitare(selectedGuitareId:number,guitare: Guitares): Observable<any>{
    console.log(guitare);
  
    return this._client.put<any>(this.url + "Guitare/" + selectedGuitareId, guitare);
    
  }

  updateImgGuitares(selectedGuitareId: number, form: FormData) {
    
    return this._client.put<any>(this.url + "Guitare/" + selectedGuitareId + "/UpdateImgGuitares", form);
}
}


  


