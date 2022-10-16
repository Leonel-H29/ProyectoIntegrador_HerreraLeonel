import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  URL = 'http://localhost:8080/personas/';
  URLApi = 'list';

  constructor(
    private http: HttpClient,
    private user: AuthService,
    private token: TokenService
  ) {}

  public getListPersonas(): Observable<persona[]> {
    return this.http.get<persona[]>(this.URL + this.URLApi);
  }

  public getPersona(id: number): Observable<persona> {
    //let usuario = this.user.getByUsername(this.token.getUsername());
    //let listPersona = this.getListPersonas();
    return this.http.get<persona>(this.URL + id);
  }

  public SavePersona(per: persona): Observable<any> {
    return this.http.post<any>(this.URL + 'new', per);
  }

  public getPersonaByUsername(name: string): Observable<persona> {
    return this.http.get<persona>(this.URL + 'user/' + name);
  }
}
