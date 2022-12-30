import { TokenService } from 'src/app/service/token.service';
import { Educacion } from 'src/app/model/educacion';
import { persona } from 'src/app/model/persona.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css'],
})
export class NewEducacionComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
  NNombreInst: string = '';
  NFechaInicio: Date = new Date();
  NFechaFin: Date = new Date();
  NDescripcion: string = '';
  NPersona: persona = new persona(
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
  IsLoadding = false;

  constructor(
    private EduServ: EducacionService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
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

  OnCreate() {
    this.IsLoadding = true;
    const educ = new Educacion(
      this.NNombreInst,
      this.NFechaInicio,
      this.NFechaFin,
      this.NDescripcion,
      this.NPersona
    );
    this.EduServ.SaveEducacion(educ).subscribe(
      (data) => {
        //alert('Educacion añadida');
        Swal.fire('Educacion añadida', 'Press Ok', 'success');
        this.router.navigate(['perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        this.IsLoadding = false;
        //alert('Fallo la operacion');
        console.log(err);
        Swal.fire('Fallo la operacion', 'Vuelva a intentarlo', 'error');
        this.router.navigate(['createedu/' + this.idPersonaLogged]);
        //this.router.navigate(['']);
      }
    );
  }

  getPersona(): void {
    this.PersServ.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        //alert('No se pudo encontrar a la persona');
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al perfil',
          'error'
        );
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
      }
    );
    this.PersServ.hasPermissions(
      this.idPersonaLogged,
      this.tokenService.getUsername()
    ).subscribe((data) => (this.hasPermission = data));
    /*
    console.log(
      'Educacion: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
