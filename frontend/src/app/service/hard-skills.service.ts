import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardSkills } from '../model/hard-skills';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  hsURL = environment.URL + 'hardskill/';
  /*
  hsURL = [
    'https://backend-portafolioap.herokuapp.com/hardskill/',
    'http://localhost:8080/hardskill/',
  ];
  */
  constructor(private httpClient: HttpClient) {}

  public ListaHardSkills(): Observable<HardSkills[]> {
    return this.httpClient.get<HardSkills[]>(this.hsURL + 'list');
  }

  public ListaHardSkillsByPersona(id: number): Observable<HardSkills[]> {
    return this.httpClient.get<HardSkills[]>(this.hsURL + 'list/' + id);
  }

  public GetHardSkills(id: number): Observable<HardSkills> {
    return this.httpClient.get<HardSkills>(this.hsURL + 'get/' + id);
  }

  public SaveHardSkills(skill: HardSkills): Observable<any> {
    return this.httpClient.post<any>(this.hsURL + 'create', skill);
  }

  public UpdateHardSkills(id: number, skill: HardSkills): Observable<any> {
    return this.httpClient.put<any>(this.hsURL + 'update/' + id, skill);
  }

  public DeleteHardSkills(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.hsURL + 'delete/' + id);
  }
}
