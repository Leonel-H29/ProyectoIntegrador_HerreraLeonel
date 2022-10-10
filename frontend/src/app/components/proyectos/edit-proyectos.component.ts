import { PersonaService } from './../../service/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from './../../service/proyectos.service';
import { Proyectos } from './../../model/proyectos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css'],
})
export class EditProyectosComponent implements OnInit {
  project: Proyectos = null;
  constructor(
    private proyService: ProyectosService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['idproy'];
    this.proyService.GetProyecto(id).subscribe(
      (data) => {
        this.project = data;
        this.getPersona();
        console.log('project: ', this.project);
      },
      (err) => {
        console.log('project: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
    //this.getPersona();
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['idproy'];
    //this.getPersona();
    this.proyService.UpdateProyecto(id, this.project).subscribe(
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
        this.project.persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
  }
}
