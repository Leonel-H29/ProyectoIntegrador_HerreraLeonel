import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  Persona: persona = new persona(
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    new Date(),
    '',
    '',
    new NewUser()
  );

  OpcionesSett = [
    {
      text: 'Editar Cuenta',
      value: '/editaccount/',
    },
    {
      text: 'Editar Datos',
      value: '/editper/',
    },
  ];
  constructor(
    private PersServ: PersonaService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.getPersona();
  }

  getPersona(): void {
    this.PersServ.getPersonaByUsername(
      this.tokenService.getUsername()
    ).subscribe(
      (data) => {
        this.Persona = data;
        /*
        if (data.idpersona == this.Persona.idpersona) {
          this.hasPermission = true;
        }
        */
        //return 'false';
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
  }
}
