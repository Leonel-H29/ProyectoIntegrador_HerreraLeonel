import { TokenService } from './../../service/token.service';
import { Proyectos } from './../../model/proyectos';
import { PersonaService } from './../../service/persona.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css'],
})
export class NewProyectosComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];

  Nproyecto: string = '';
  NDescripcion: string = '';
  NfechaInicio: Date = new Date();
  NfechaFin: Date = new Date();
  NUrlP: string = '';
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
    private ProyServ: ProyectosService,
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
  }

  OnCreate() {
    this.IsLoadding = true;

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
        //alert('Proyecto añadido');
        Swal.fire('Proyecto añadido', 'Press Ok', 'success');
        this.router.navigate(['perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        this.IsLoadding = false;
        //alert('Fallo la operacion');
        Swal.fire('Fallo la operacion', 'Vuelva a intentarlo', 'error');
        const ruta = 'createproy/' + this.idPersonaLogged;
        console.log(err);
        this.router.navigate([ruta]);
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
      'Proyectos: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
