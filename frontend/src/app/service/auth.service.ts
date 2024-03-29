import { TokenService } from './token.service';
import { PersonaService } from './persona.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { LoginUser } from '../model/login-user';
import { NewUser } from '../model/new-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = environment.URL + 'auth/';
  /*
  authURL = [
    'https://backend-portafolioap.herokuapp.com/auth/',
    'http://localhost:8080/auth/',
  ];
  */

  constructor(private httpClient: HttpClient, private token: TokenService) {}
  //Funcion para crear un nuevo usuario
  public newUser(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }
  //Funcion para editar un usuario
  public editUser(id: number, newUser: NewUser): Observable<any> {
    return this.httpClient.put<any>(this.authURL + 'edit/' + id, newUser);
  }
  //Funcion para poder iniciar sesion
  public Login(loginUser: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUser);
  }
  //Funcion para obtener los datos del usuario por el username
  public getByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(this.authURL + 'username/' + username);
  }

  //Funcion para obtener los datos del usuario por el correo
  public getByCorreo(correo: string): Observable<any> {
    return this.httpClient.get<any>(this.authURL + 'correo/' + correo);
  }

  //Funcion para obtener los datos del usuario por el id de la persona
  public getByPersona(id: number): Observable<any> {
    return this.httpClient.get<any>(this.authURL + 'persona/' + id);
  }
  //Funcion para eliminar la cuenta del usuario
  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.authURL + 'delete/' + id);
  }

  //Funcion para recuperar la contraseña
  public retrievePassword(id: number, User: NewUser): Observable<any> {
    return this.httpClient.put<any>(this.authURL + 'editpass/' + id, User);
  }
}
