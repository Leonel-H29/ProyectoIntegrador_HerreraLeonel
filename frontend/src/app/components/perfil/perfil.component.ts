import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit, AfterViewInit {
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

  constructor(
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.PersServ.getPersona(id).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        this.router.navigate(['']);
      }
    );
  }
}
