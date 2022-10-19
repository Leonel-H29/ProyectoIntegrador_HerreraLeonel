import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencialab } from '../model/experiencialab';

@Injectable({
  providedIn: 'root',
})
export class ExperiencialabService {
  expURL = 'https://backend-portafolioap.herokuapp.com/explab/'; //'http://localhost:8080/explab/';

  constructor(private httpClient: HttpClient) {}

  public ListaExp(): Observable<Experiencialab[]> {
    return this.httpClient.get<Experiencialab[]>(this.expURL + 'list');
  }

  public ListaExpByPersona(id: number): Observable<Experiencialab[]> {
    return this.httpClient.get<Experiencialab[]>(this.expURL + 'list/' + id);
  }

  public GetExperiencia(id: number): Observable<Experiencialab> {
    return this.httpClient.get<Experiencialab>(this.expURL + id);
  }

  public SaveExperiencia(expe: Experiencialab): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'create', expe);
  }

  public UpdateExperiencia(id: number, expe: Experiencialab): Observable<any> {
    return this.httpClient.put<any>(this.expURL + 'update/' + id, expe);
  }

  public DeleteExperiencia(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expURL + 'delete/' + id);
  }
}
