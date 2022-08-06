import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  URL = 'http://localhost:8080/personas/';
  URLApi = 'list';

  constructor(private http: HttpClient) {}

  public getListPersonas(): Observable<persona[]> {
    return this.http.get<persona[]>(this.URL + this.URLApi);
  }

  public getPersona(id: any): Observable<any> {
    return this.http.get(this.URL + id);
  }
}
