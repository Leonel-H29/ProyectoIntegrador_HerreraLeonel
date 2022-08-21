import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';

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
  idTipo: number = 0;
  idPersona: number = 0;

  constructor(
    private Expeserv: ExperiencialabService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  OnCreate() {
    const expe = new Experiencialab(
      this.nombreE,
      this.fechaInicio,
      this.fechaFin,
      this.descripcion,
      this.idPersona,
      this.idTipo
    );
    this.Expeserv.SaveExperiencia(expe).subscribe(
      (data) => {
        alert('Experiencia añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo la operacion');
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }
}
