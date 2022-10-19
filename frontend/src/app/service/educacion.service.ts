import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  eduURL = 'https://backend-portafolioap.herokuapp.com/'; //'http://localhost:8080/educacion/';

  constructor(private httpClient: HttpClient) {}

  public ListaEdu(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.eduURL + 'list');
  }

  public ListaEduByPersona(id: number): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.eduURL + 'list/' + id);
  }

  public GetEducacion(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(this.eduURL + id);
  }

  public SaveEducacion(edu: Educacion): Observable<any> {
    return this.httpClient.post<any>(this.eduURL + 'create', edu);
  }

  public UpdateEducacion(id: number, edu: Educacion): Observable<any> {
    return this.httpClient.put<any>(this.eduURL + 'update/' + id, edu);
  }

  public DeleteEducacion(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.eduURL + 'delete/' + id);
  }
}
