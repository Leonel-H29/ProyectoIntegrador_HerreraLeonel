import { TokenService } from './../../service/token.service';
import { persona } from './../../model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from './../../service/persona.service';
import { EducacionService } from './../../service/educacion.service';
import { Educacion } from './../../model/educacion';
import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/model/new-user';
@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit {
  educacion: Educacion = null;
  Persona: persona = new persona(
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
  constructor(
    private educServ: EducacionService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {}

  isLogged = false;
  hasPermission = false;

  ngOnInit(): void {
    this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.hasPermissions();
    const id = this.activatedRouter.snapshot.params['idedu'];

    this.educServ.GetEducacion(id).subscribe(
      (data) => {
        this.educacion = data;
        this.educacion.persona = this.Persona;

        console.log('educacion: ', this.educacion);
      },
      (err) => {
        console.log('educacion: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );

    //this.getPersona();
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['idedu'];
    //this.getPersona();
    this.educServ.UpdateEducacion(id, this.educacion).subscribe(
      (data) => {
        alert('Registro modificado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar el registro');
        //this.router.navigate(['']);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.educacion);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
  }
  hasPermissions(): void {
    this.persService
      .getPersonaByUsername(this.tokenService.getUsername())
      .subscribe(
        (data) => {
          if (data.idpersona == this.Persona.idpersona) {
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
