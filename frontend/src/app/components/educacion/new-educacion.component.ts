import { Educacion } from 'src/app/model/educacion';
import { persona } from 'src/app/model/persona.model';
import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {
  NNombreInst: string = '';
  NFechaInicio : Date = new Date();
  NFechaFin : Date = new Date();
  NDescripcion: string = '';
  NPersona : persona = new persona('', '', '', '', '', 0, new Date(), '', '');

  constructor(
    private EduServ: EducacionService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPersona();
  }

  OnCreate() {
    const educ = new Educacion(
      this.NNombreInst,
      this.NFechaInicio,
      this.NFechaFin,
      this.NDescripcion,
      this.NPersona
    );
    this.EduServ.SaveEducacion(educ).subscribe(
      (data) => {
        alert('Educacion añadida');
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
  }

}
