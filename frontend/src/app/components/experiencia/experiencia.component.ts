import { Component, OnInit } from '@angular/core';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  expe: Experiencialab[] = [];
  constructor(
    private expService: ExperiencialabService,
    private tokenService: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.CargarExperiencias();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  CargarExperiencias(): void {
    this.expService.ListaExp().subscribe((data) => {
      this.expe = data;
    });
  }
}
