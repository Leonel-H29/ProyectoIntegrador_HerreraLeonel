import { Observable } from 'rxjs';
import { NewUser } from './../../../model/new-user';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { AuthService } from 'src/app/service/auth.service';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];

  idusuario: number = 0;
  //username: string = '';
  //correo: string = '';
  password: string = '';
  confirm_correo: string = '';
  confirm_password: string = '';

  NuevoUsuario: NewUser = new NewUser();

  isLogged = false;
  hasPermission = false;
  IsLoadding = false;

  showPassword = false;
  typeInputPass = 'password';

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private changeDet: ChangeDetectorRef,
    private tokenService: TokenService
  ) {}

  ngAfterViewInit(): void {
    //this.getUsuario();
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getUsuario();

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.persService
        .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
        .subscribe((data) => (this.hasPermission = data));
    }
    /*
    console.log(
      'Usuario: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  onUpdate() {
    this.IsLoadding = true;
    if (this.NuevoUsuario.correo != this.confirm_correo) {
      //alert('Los correos deben coincidir');
      Swal.fire(
        'Error al modificar el registro',
        'Los correos deben coincidir',
        'error'
      );
      this.IsLoadding = false;
      this.router.navigate(['/editaccount/' + this.idPersonaLogged]);
    } else if (this.password != this.confirm_password) {
      this.IsLoadding = false;
      //alert('Las contraseñas deben coincidir');
      Swal.fire(
        'Error al modificar el registro',
        'Las contraseñas deben coincidir',
        'error'
      );
      this.router.navigate(['/editaccount' + this.idPersonaLogged]);
    } else {
      /*Se crea primero la cuenta de usuario*/
      this.SaveUser();
    }
  }

  SaveUser() {
    const changeUser = new NewUser();
    changeUser.username = this.NuevoUsuario.username;
    changeUser.correo = this.NuevoUsuario.correo;
    changeUser.password = this.password;
    this.authService.editUser(this.idusuario, changeUser).subscribe(
      (data) => {
        //console.log('Usuario Actualizado: ', data);
        //alert('Usuario Actualizado - Inicio Sesion nuevamente');
        Swal.fire('Usuario Actualizado', 'Press Ok', 'success');
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        this.IsLoadding = false;
        Swal.fire(
          'Fallo la operacion en Usuario',
          'Vuelva a intentarlo',
          'error'
        );
        //alert('Fallo la operacion en Usuario');
        console.log(err);
      }
    );
  }

  getUsuario(): void {
    this.authService.getByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.idusuario = data.idusuario;
        this.NuevoUsuario = data;
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
  showPass() {
    if (!this.showPassword) {
      this.showPassword = true;
      this.typeInputPass = 'text';
    }
  }

  hiddenPass() {
    if (this.showPassword) {
      this.showPassword = false;
      this.typeInputPass = 'password';
    }
  }
}
