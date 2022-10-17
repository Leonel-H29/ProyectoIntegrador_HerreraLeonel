import { TokenService } from './../../service/token.service';
import { Proyectos } from './../../model/proyectos';
import { PersonaService } from './../../service/persona.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css'],
})
export class NewProyectosComponent implements OnInit {
  Nproyecto: string = '';
  NDescripcion: string = '';
  NfechaInicio: Date = new Date();
  NfechaFin: Date = new Date();
  NUrlP: string = '';
  NPersona: persona = new persona(
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

  isLogged = false;
  hasPermission = false;

  constructor(
    private ProyServ: ProyectosService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.getPersona();
  }

  OnCreate() {
    const proj = new Proyectos(
      this.Nproyecto,
      this.NDescripcion,
      this.NfechaInicio,
      this.NfechaFin,
      this.NUrlP,
      this.NPersona
    );
    this.ProyServ.SaveProyecto(proj).subscribe(
      (data) => {
        alert('Proyecto añadido');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo la operacion');
        console.log(err);
        //this.router.navigate(['']);
      }
    );
  }

  getPersona(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    //this.Persona = this.PersServ.getPersona(id);
    this.PersServ.getPersona(id).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
    this.hasPermissions();
  }

  hasPermissions(): void {
    this.PersServ.getPersonaByUsername(
      this.tokenService.getUsername()
    ).subscribe(
      (data) => {
        console.log(data.idpersona, this.NPersona.idpersona);
        if (data.idpersona == this.NPersona.idpersona) {
          this.hasPermission = true;
        }
        //return 'false';
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
  }
}
