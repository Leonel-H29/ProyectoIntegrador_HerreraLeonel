import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  IsLogged = false;
  IsLoginFail = false;
  IsLoadding = false;
  showPassword = false;
  typeInputPass = 'password';
  loginUser!: LoginUser;
  username!: string;
  password!: string;
  roles: string[] = [];
  errorMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.IsLogged = true;
      this.IsLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.IsLoadding = true;
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.Login(this.loginUser).subscribe(
      (data) => {
        this.IsLogged = true;
        this.IsLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['']);
      },
      (err) => {
        this.IsLoadding = false;
        this.IsLogged = false;
        this.IsLoginFail = true;
        this.errorMsj = err.error.mensaje;
        alert(this.errorMsj);
        console.log(this.errorMsj);
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
