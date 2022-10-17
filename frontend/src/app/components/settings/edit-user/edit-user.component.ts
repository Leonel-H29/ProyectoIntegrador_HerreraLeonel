import { ImageService } from './../../../service/image.service';
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
    public imgService: ImageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onUpdate() {
    if (this.NuevoUsuario.correo != this.confirm_correo) {
      alert('Los correos deben coincidir');
      this.router.navigate(['/editaccount']);
    } else if (this.NuevoUsuario.password != this.confirm_password) {
      alert('Las contraseñas deben coincidir');
      this.router.navigate(['/editaccount']);
    } else {
      /*Se crea primero la cuenta de usuario*/
      this.SaveUser();
    }
  }

  SaveUser() {
    if (this.NuevoUsuario.username != null) {
      this.authService
        .editUser(this.NuevoUsuario.username, this.NuevoUsuario)
        .subscribe(
          (data) => {
            console.log('Usuario Actualizado: ', data);
            /*Se cargan los datos de la persona*/
            this.authService
              .getByUsername(this.NuevoUsuario.username)
              .subscribe((element) => {
                this.SavePersona(element);
              });
          },
          (err) => {
            alert('Fallo la operacion en Usuario');
            console.log(err);
          }
        );
    } else {
    }
  }

  SavePersona(user: NewUser) {
    if (user != null) {
      this.Persona.usuario = user;

      this.persService
        .EditPersona(this.idPersonaLogged, this.Persona)
        .subscribe(
          (data) => {
            console.log('Persona actualizada: ', data);
            alert('Usuario Actualizado');
            this.router.navigate(['/']);
          },
          (err) => {
            alert('Fallo la operacion en Persona');
            console.log(err);
          }
        );
    }
  }
  public generaCadenaAleatoria(): string {
    const n = 20;
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  uploadImage($event: any) {
    //const id = this.activatedRouter.snapshot.params[];
    const name = 'perfil_' + this.generaCadenaAleatoria();
    this.imgService.uploadImage($event, name);
  }

  getUsuario(): void {
    this.authService.getByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.NuevoUsuario.username = data;
        console.log('Get user: ', this.NuevoUsuario);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
    this.hasPermissions();
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        //this.expLab.persona = data;
        this.Persona = data;
        //console.log(this.project);
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
          if (data.idpersona == this.Persona.idpersona) {
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
