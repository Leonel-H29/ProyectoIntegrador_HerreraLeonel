import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  proy: Proyectos[] = [];
  ProyectosAeliminar: Proyectos;
  Persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');

  constructor(
    private proyService: ProyectosService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router
  ) { }

  isLogged = false;

  ngOnInit(): void {
    this.getPersona();
    ///console.log('Id Persona: ', this.idPersonaLogged);
    //console.log('Persona: ', this.Persona);
    this.CargarProyectos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  CargarProyectos(): void {
    this.proyService.ListaProyectos().subscribe(
      (data) => {
        /*
        data.forEach((element) => {
          console.log(element);
          if (element.Proyectos.idProyectos == this.Proyectos.idProyectos) {
            this.expe.push(element);
          }
        });
        */
        this.proy = data;
        console.log('Proyectos: ', this.proy);
      },
      (err) => {
        alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteProyectos(id?: number) {
    if (id != undefined) {
      this.proyService.DeleteProyecto(id).subscribe(
        (data) => {
          this.CargarProyectos();
        },
        (err) => {
          alert('No se ha podido eliminar la Proyectos');
        }
      );
    }
  }

  getProyectosAEliminar(Proyectos: Proyectos): void {
    this.ProyectosAeliminar = Proyectos;
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
