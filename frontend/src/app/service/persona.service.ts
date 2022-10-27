import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { NewUser } from '../model/new-user';
import { persona } from '../model/persona.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  //URL = 'https://backend-portafolioap.herokuapp.com/personas/';
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
    return this.http.get<persona>(this.URL + 'get/' + id);
  }

  public SavePersona(per: persona): Observable<any> {
    return this.http.post<any>(this.URL + 'new', per);
  }

  public EditPersona(id: number, per: persona): Observable<any> {
    return this.http.put<any>(this.URL + 'edit/' + id, per);
  }

  public getPersonaByUsername(name: string): Observable<persona> {
    return this.http.get<persona>(this.URL + 'user/' + name);
  }

  public hasPermissions(id: Number, name: string): Observable<boolean> {
    /*
    return this.getPersonaByUsername(this.token.getUsername()).pipe(
      //filter((data) => data.idpersona == id),
      map((data) => data.idpersona == id)
    );
    */

    //.subscribe((data) => console.log(data));
    return this.http.get<boolean>(this.URL + 'user/' + id + '/' + name);
  }
}
