import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import { persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css'],
})
export class EditPersonaComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
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
  IsLoadding = false;
  selected: string = 'option1';

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public imgService: ImageService,
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
      this.persService
        .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
        .subscribe((data) => (this.hasPermission = data));
    }
  }

  uploadImage($event: any) {
    //const id = this.activatedRouter.snapshot.params[];
    //const name = 'perfil_' + this.generaCadenaAleatoria();
    const name = 'perfil_' + this.idPersonaLogged;
    this.imgService.uploadImage($event, name);
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
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
  }

  onUpdate() {
    if (this.Persona.usuario != null) {
      this.IsLoadding = true;
      if (this.selected == 'option1') {
        this.Persona.foto_perfil_url = this.imgService.url;
      }
      this.persService
        .EditPersona(this.idPersonaLogged, this.Persona)
        .subscribe(
          (data) => {
            //console.log('Persona actualizada: ', data);
            //alert('Datos Actualizados');
            Swal.fire('Datos Actualizados', 'Press Ok', 'success');
            this.router.navigate(['perfil/' + this.idPersonaLogged]);
          },
          (err) => {
            this.IsLoadding = false;
            //alert('Fallo la operacion');
            Swal.fire(
              'Error al modificar el registro',
              'Vuelva a intentarlo',
              'error'
            );
            console.log(err);
          }
        );
    }
  }
}
