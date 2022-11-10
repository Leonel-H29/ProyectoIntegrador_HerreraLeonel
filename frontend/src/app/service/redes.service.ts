import { Redes } from './../model/red';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RedesService {
  proyURL = environment.URL + 'redes/';
  constructor(private httpClient: HttpClient) {}

  public ListaRedes(): Observable<Redes[]> {
    return this.httpClient.get<Redes[]>(this.proyURL + 'list');
  }

  public ListaRedesByPersona(id: number): Observable<Redes[]> {
    return this.httpClient.get<Redes[]>(this.proyURL + 'list/' + id);
  }

  public GetProyecto(id: number): Observable<Redes> {
    return this.httpClient.get<Redes>(this.proyURL + 'get/' + id);
  }

  public SaveProyecto(expe: Redes): Observable<any> {
    return this.httpClient.post<any>(this.proyURL + 'create', expe);
  }

  public UpdateProyecto(id: number, proy: Redes): Observable<any> {
    return this.httpClient.put<any>(this.proyURL + 'update/' + id, proy);
  }

  public DeleteProyecto(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyURL + 'delete/' + id);
  }
}
