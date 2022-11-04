import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-derecho',
  templateUrl: './derecho.component.html',
  styleUrls: ['./derecho.component.css'],
})
export class DerechoComponent implements OnInit {
  isLogged = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) this.isLogged = true;
    else this.isLogged = false;
  }

  onLogOut(): void {
    this.tokenService.Logout();
    window.location.reload();
  }
}
