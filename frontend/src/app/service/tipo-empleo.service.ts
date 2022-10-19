import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoEmpleo } from '../model/tipo-empleo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoEmpleoService {
  expURL = 'https://backend-portafolioap.herokuapp.com/tipoemp/'; //'http://localhost:8080/tipoemp/';

  constructor(private httpClient: HttpClient) {}

  public ListaTipoEmpleo(): Observable<TipoEmpleo[]> {
    return this.httpClient.get<TipoEmpleo[]>(this.expURL + 'list');
  }

  public GetTipoEmpleo(id: number): Observable<TipoEmpleo> {
    return this.httpClient.get<TipoEmpleo>(this.expURL + id);
  }

  public SaveTipoEmpleo(expe: TipoEmpleo): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'create', expe);
  }

  public UpdateTipoEmpleo(id: number, expe: TipoEmpleo): Observable<any> {
    return this.httpClient.put<any>(this.expURL + 'update/' + id, expe);
  }

  public DeleteTipoEmpleo(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expURL + 'delete/' + id);
  }
}
