import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit, AfterViewInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  proy: Proyectos[] = [];
  ProyectosAmostrar: Proyectos;
  ProyectosAeliminar: Proyectos;
  Persona: persona = new persona(
    '',
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

  isLogged = false;
  hasPermission = false;

  constructor(
    private proyService: ProyectosService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    this.CargarProyectos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.PersServ.hasPermissions(
        this.idPersonaLogged,
        this.tokenService.getUsername()
      ).subscribe((data) => (this.hasPermission = data));
    }
    /*
    console.log(
      'Proyectos: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  CargarProyectos(): void {
    this.proyService.ListaProyectosByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.proy = data;
        //console.log('Proyectos: ', this.proy);
      },
      (err) => {
        Swal.fire(
          'Se encontro un error en la lista',
          'Volver al inicio',
          'error'
        );
        //alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteProyectos(id?: number) {
    if (id != undefined) {
      this.proyService.DeleteProyecto(id).subscribe(
        (data) => {
          //alert('Se elimino el proyecto');
          Swal.fire('Se elimino el proyecto', 'Press Ok', 'success');
          window.location.reload();
          this.router.navigate(['/perfil/' + this.idPersonaLogged]);

          //this.CargarProyectos();
        },
        (err) => {
          //alert('No se ha podido eliminar el Proyecto');
          Swal.fire(
            'No se ha podido eliminar el Proyecto',
            'Volver a intertarlo',
            'error'
          );
        }
      );
    }
  }

  getProyectosAEliminar(Proyectos: Proyectos): void {
    this.ProyectosAeliminar = Proyectos;
  }

  getProyectosAMostrar(Proyectos: Proyectos): void {
    this.ProyectosAmostrar = Proyectos;
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
        //alert('No se pudo encontrar a la persona');
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al inicio',
          'error'
        );
        this.router.navigate(['']);
      }
    );
  }

  goPage(url: string) {
    window.location.replace(url);
  }
}
