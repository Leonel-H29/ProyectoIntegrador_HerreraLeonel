import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencialab } from 'src/app/model/experiencialab';
import { persona } from 'src/app/model/persona.model';
import { TipoEmpleo } from 'src/app/model/tipo-empleo';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TipoEmpleoService } from 'src/app/service/tipo-empleo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit {
  nombreE: string = '';
  descripcion: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  //idTipo: number = 0;
  //idPersona: number = 0;
  NTipo: TipoEmpleo = new TipoEmpleo('');
  NPersona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');

  ListaTiposEmpleos: TipoEmpleo[];
  //Persona: persona;

  constructor(
    private Expeserv: ExperiencialabService,
    private TipoEmpServ: TipoEmpleoService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPersona();
    this.getTiposEmpleos();
    //this.OnCreate();
  }

  OnCreate() {
    const expe = new Experiencialab(
      this.nombreE,
      this.fechaInicio,
      this.fechaFin,
      this.descripcion,
      //this.idPersona,
      //this.idTipo
      this.NPersona,
      this.NTipo
    );
    this.Expeserv.SaveExperiencia(expe).subscribe(
      (data) => {
        alert('Experiencia añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo la operacion');
        console.log(err);
        //this.router.navigate(['']);
      }
    );
  }

  getTiposEmpleos(): void {
    this.TipoEmpServ.ListaTipoEmpleo().subscribe((data) => {
      this.ListaTiposEmpleos = data;
      console.log('Experiencia: ', this.ListaTiposEmpleos);
    });
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
