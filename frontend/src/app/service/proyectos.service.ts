import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  proyURL = 'http://localhost:8080/proyecto/';
  constructor(private httpClient: HttpClient) { }

  public ListaProyectos(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(this.proyURL + 'list');
  }

  public GetProyecto(id: number): Observable<Proyectos> {
    return this.httpClient.get<Proyectos>(this.proyURL + id);
  }

  public SaveProyecto(expe: Proyectos): Observable<any> {
    return this.httpClient.post<any>(this.proyURL + 'create', expe);
  }

  public UpdateProyecto(id: number, expe: Proyectos): Observable<any> {
    return this.httpClient.put<any>(this.proyURL + 'update/' + id, expe);
  }

  public DeleteProyecto(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyURL + 'delete/' + id);
  }
}
