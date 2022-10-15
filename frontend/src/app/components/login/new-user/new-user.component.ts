import { NewUser } from './../../../model/new-user';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { AuthService } from 'src/app/service/auth.service';
import { persona } from 'src/app/model/persona.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  descripcion: string = '';
  provincia: string = '';
  pais: string = '';
  codigo_postal: number;
  fecha_nacimiento: Date = new Date();
  telefono: string = '';
  foto_perfil_url: string = '';
  username: string = '';
  correo: string = '';
  password: string = '';
  confirm_correo: string = '';
  confirm_password: string = '';
  //NuevaC: NewAccount = null;
  //NuevoUsuario: NewUser = null;
  //Persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreate() {
    if (this.correo != this.confirm_correo) {
      alert('Los correos deben coincidir');
      this.router.navigate(['/createaccount']);
    } else if (this.password != this.confirm_password) {
      alert('Las contraseñas deben coincidir');
      this.router.navigate(['/createaccount']);
    } else {
      const NUser = new NewUser();
      NUser.username = this.username;
      NUser.correo = this.correo;
      NUser.password = this.password;
      this.authService.newUser(NUser).subscribe(
        (data) => {
          console.log('Usuario Creado');
        },
        (err) => {
          alert('Fallo la operacion en Usuario');
          console.log(err);
        }
      );
    }
  }
}
