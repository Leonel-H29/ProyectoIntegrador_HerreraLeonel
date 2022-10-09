import { Proyectos } from './../../model/proyectos';
import { PersonaService } from './../../service/persona.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css']
})
export class NewProyectosComponent implements OnInit {
  Nproyecto : string = '';
  NDescripcion: string = '';
  NfechaInicio: Date = new Date();
  NfechaFin: Date = new Date();
  NUrlP : string = '';
  NPersona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');


  constructor(
    private ProyServ : ProyectosService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  }

}
