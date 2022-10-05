import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  expURL = 'http://localhost:8080/educacion/';

  constructor(private httpClient: HttpClient) {}

  public ListaExp(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.expURL + 'list');
  }

  public GetEducacion(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(this.expURL + id);
  }

  public SaveEducacion(expe: Educacion): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'create', expe);
  }

  public UpdateEducacion(id: number, expe: Educacion): Observable<any> {
    return this.httpClient.put<any>(this.expURL + 'update/' + id, expe);
  }

  public DeleteEducacion(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expURL + 'delete/' + id);
  }
}
