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

  public GetRedes(id: number): Observable<Redes> {
    return this.httpClient.get<Redes>(this.proyURL + 'get/' + id);
  }

  public SaveRed(red: Redes): Observable<any> {
    return this.httpClient.post<any>(this.proyURL + 'create', red);
  }

  public UpdateRed(id: number, red: Redes): Observable<any> {
    return this.httpClient.put<any>(this.proyURL + 'update/' + id, red);
  }

  public DeleteRedes(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyURL + 'delete/' + id);
  }
}
