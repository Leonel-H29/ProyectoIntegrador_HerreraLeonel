import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { debounce, debounceTime, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLogged = false;
  listPersona: persona[] = new Array<persona>();
  usuario: string = '';
  searchTerm: string = '';

  //listFiltered: any = [];
  constructor(
    public personaService: PersonaService,
    private tokenService: TokenService,
    private router: Router,
    private imgServ: ImageService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.usuario = this.tokenService.getUsername();
      this.onMainPage();
    } else {
      this.isLogged = false;
      this.login();
    }
  }

  onMainPage(): void {
    this.personaService.getListPersonas().subscribe(
      (data) => {
        this.listPersona = data;
        console.log(this.listPersona);
        this.listPersona.forEach((per) => {
          per.foto_perfil_url = this.imgServ.fetchImage(per.foto_perfil_url);
        });
      },
      (err) => {
        //this.listPersona = [];
        console.error('No se ha podido traer la lista: ', err);
      }
    );
  }

  handleSearch(value: string) {
    this.searchTerm = value;
  }

  login() {
    this.router.navigate(['/login']);
  }
}
