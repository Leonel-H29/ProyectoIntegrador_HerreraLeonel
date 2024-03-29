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
import { EducacionService } from 'src/app/service/educacion.service';
import { Educacion } from 'src/app/model/educacion';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit, AfterViewInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  educ: Educacion[] = [];
  educacionAeliminar: Educacion;
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
  constructor(
    private eduService: EducacionService,
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
    this.CargarEducaciones();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.PersServ.hasPermissions(
        this.idPersonaLogged,
        this.tokenService.getUsername()
      ).subscribe((data) => (this.hasPermission = data));
    }
    /*
    console.log(
      'Educacion: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  CargarEducaciones(): void {
    this.eduService.ListaEduByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.educ = data;
        //console.log('Educacion: ', this.educ);
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

  DeleteEducacion(id?: number) {
    if (id != undefined) {
      this.eduService.DeleteEducacion(id).subscribe(
        (data) => {
          Swal.fire('Se elimino la educacion', 'Press Ok', 'success');
          //alert('Se elimino la educacion');
          window.location.reload();
          this.router.navigate(['/perfil/' + this.idPersonaLogged]);

          //this.CargarEducaciones();
        },
        (err) => {
          //alert('No se ha podido eliminar la educacion');
          Swal.fire(
            'No se ha podido eliminar la experiencia',
            'Volver a intertarlo',
            'error'
          );
        }
      );
    }
  }

  getEducacionAEliminar(educacion: Educacion): void {
    this.educacionAeliminar = educacion;
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
