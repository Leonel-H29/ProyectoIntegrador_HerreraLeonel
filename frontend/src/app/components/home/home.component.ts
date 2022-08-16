import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLogged = false;
  listPersona: persona[] = new Array<persona>();
  usuario: string = '';
  constructor(
    public personaService: PersonaService,
    private tokenService: TokenService,
    private router: Router
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
      },
      (err) => {
        //this.listPersona = [];
        console.error('No se ha podido traer la lista: ', err);
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }
}
