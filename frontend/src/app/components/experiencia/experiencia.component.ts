import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit, AfterViewInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  expe: Experiencialab[] = [];
  experienciaAeliminar: Experiencialab;
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
  //idPersona: number = 0;

  constructor(
    private expService: ExperiencialabService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router,
    private changeDet: ChangeDetectorRef
  ) {}

  isLogged = false;
  hasPermission = false;

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    this.CargarExperiencias();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.PersServ.hasPermissions(
        this.idPersonaLogged,
        this.tokenService.getUsername()
      ).subscribe((data) => (this.hasPermission = data));
    }
    /*
    console.log(
      'Experencia: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  CargarExperiencias(): void {
    this.expService.ListaExpByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.expe = data;
        //console.log('Experiencia: ', this.expe);
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

  DeleteExperiencia(id?: number) {
    if (id != undefined) {
      this.expService.DeleteExperiencia(id).subscribe(
        (data) => {
          Swal.fire('Se elimino la experiencia', 'Press Ok', 'success');
          //alert('Se elimino la experiencia');
          window.location.reload();
          this.router.navigate(['/perfil/' + this.idPersonaLogged]);

          //this.CargarExperiencias();
        },
        (err) => {
          //alert('No se ha podido eliminar la experiencia');
          Swal.fire(
            'No se ha podido eliminar la experiencia',
            'Volver a intertarlo',
            'error'
          );
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
}
