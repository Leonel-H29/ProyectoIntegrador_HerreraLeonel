import { TipoEmpleo } from 'src/app/model/tipo-empleo';
import { PersonaService } from 'src/app/service/persona.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { TipoEmpleoService } from 'src/app/service/tipo-empleo.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css'],
})
export class EditExperienciaComponent implements OnInit {
  expLab: Experiencialab = null;
  ListaTiposEmpleos: TipoEmpleo[];
  constructor(
    private expService: ExperiencialabService,
    private TipoEmpServ: TipoEmpleoService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['idexp'];
    this.getTiposEmpleos();
    this.expService.GetExperiencia(id).subscribe(
      (data) => {
        this.expLab = data;
        this.getPersona();
        console.log('expLab: ', this.expLab);
      },
      (err) => {
        console.log('expLab: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['idexp'];
    this.expService.UpdateExperiencia(id, this.expLab).subscribe(
      (data) => {
        alert('Registro modificado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar el registro');
        this.router.navigate(['']);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        this.expLab.persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
  }

  getTiposEmpleos(): void {
    this.TipoEmpServ.ListaTipoEmpleo().subscribe((data) => {
      this.ListaTiposEmpleos = data;
      console.log('Tipo de empleos: ', this.ListaTiposEmpleos);
    });
  }
}
