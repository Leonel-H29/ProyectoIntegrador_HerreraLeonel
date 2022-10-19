import { Observable } from 'rxjs';
import { NewUser } from './../../../model/new-user';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { AuthService } from 'src/app/service/auth.service';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
  /*
  Persona: persona = new persona(
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
  */
  idusuario: number = 0;
  username: string = '';
  correo: string = '';
  password: string = '';
  confirm_correo: string = '';
  confirm_password: string = '';

  NuevoUsuario: NewUser = null;

  isLogged = false;
  hasPermission = false;

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute,

    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    //this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onUpdate() {
    if (this.correo != this.confirm_correo) {
      alert('Los correos deben coincidir');
      this.router.navigate(['/editaccount']);
    } else if (this.password != this.confirm_password) {
      alert('Las contraseñas deben coincidir');
      this.router.navigate(['/editaccount']);
    } else {
      /*Se crea primero la cuenta de usuario*/
      this.SaveUser();
    }
  }

  SaveUser() {
    const NUser = new NewUser();
    NUser.username = this.username;
    NUser.correo = this.correo;
    NUser.password = this.password;

    if (
      NUser.username == null ||
      NUser.correo == null ||
      NUser.password == null
    ) {
      alert('No puede haber campos vacios');
      this.router.navigate(['/editaccount/' + this.idPersonaLogged]);
    }

    this.authService.editUser(this.idusuario, NUser).subscribe(
      (data) => {
        console.log('Usuario Actualizado: ', data);
        alert('Usuario Actualizado - Inicio Sesion nuevamente');
        //this.router.navigate(['/perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        alert('Fallo la operacion en Usuario');
        console.log(err);
      }
    );
    //this.onLogOut();
  }
  /*
  onLogOut(): void {
    this.tokenService.Logout();
    window.location.reload();
  }
  */

  getUsuario(): void {
    this.authService.getByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.idusuario = data.idusuario;
        this.username = data.username;
        this.correo = JSON.stringify(data.correo);
        this.password = JSON.stringify(data.password);

        //this.username = JSON.stringify(data.username);
        //this.correo = JSON.stringify(data.correo);
        //this.password = JSON.stringify(data.password);
        //console.log('Get user: ', usuario, email, password);
        //console.log('Get user: ', usuario);
        console.log(
          'Get user: ',
          this.idusuario,
          this.username,
          this.correo,
          this.password
        );
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );

    this.hasPermissions();
  }

  hasPermissions(): void {
    this.persService
      .getPersonaByUsername(this.tokenService.getUsername())
      .subscribe(
        (data) => {
          if (data.idpersona == this.idPersonaLogged) {
            this.hasPermission = true;
          }
          //return 'false';
        },
        (err) => {
          alert('No se pudo encontrar a la persona');
        }
      );
  }
}
