import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  expe: Experiencialab[] = [];
  experienciaAeliminar: Experiencialab;
  Persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');
  //idPersona: number = 0;

  constructor(
    private expService: ExperiencialabService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.getPersona();
    //console.log('Id Persona: ', this.idPersonaLogged);
    //console.log('Persona: ', this.Persona);
    this.CargarExperiencias();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  CargarExperiencias(): void {
    this.expService.ListaExp().subscribe(
      (data) => {
        data.forEach((element) => {
          console.log(element);
          if (element.persona.idpersona == this.Persona.idpersona) {
            this.expe.push(element);
          }
        });
        //this.expe = data;
        //console.log('Experiencia: ', this.expe);
      },
      (err) => {
        alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteExperiencia(id?: number) {
    if (id != undefined) {
      this.expService.DeleteExperiencia(id).subscribe(
        (data) => {
          this.CargarExperiencias();
        },
        (err) => {
          alert('No se ha podido eliminar la experiencia');
        }
      );
    }
  }

  getExperienciaAEliminar(experiencia: Experiencialab): void {
    this.experienciaAeliminar = experiencia;
  }

  getPersona(): void {
    this.idPersonaLogged = this.activatedRouter.snapshot.params['id'];
    this.GetidPersona.emit(this.idPersonaLogged);

    this.PersServ.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        this.router.navigate(['']);
      }
    );
  }
}
