import { TokenService } from './../../service/token.service';
import { persona } from './../../model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from './../../service/persona.service';
import { EducacionService } from './../../service/educacion.service';
import { Educacion } from './../../model/educacion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit {
  educacion: Educacion = null;
  constructor(
    private educServ: EducacionService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['idedu'];
    this.educServ.GetEducacion(id).subscribe(
      (data) => {
        this.educacion = data;
        this.getPersona();
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
        this.educacion.persona = data;
        //console.log(this.educacion);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
  }
  /*
  hasPermissions() : boolean {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        data.i forEach(element =>{

        })
        //this.personaLogged= data;

      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );

    return
  }
  */
}
