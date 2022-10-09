import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FooterComponent } from './components/footer/footer.component';
import { DerechoComponent } from './components/header/derecho/derecho.component';
import { IzquierdoComponent } from './components/header/izquierdo/izquierdo.component';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NewHardSkillsComponent } from './components/hard-skills/new-hard-skills.component';
import { NewEducacionComponent } from './components/educacion/new-educacion.component';
import { NewProyectosComponent } from './components/proyectos/new-proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    FooterComponent,
    DerechoComponent,
    IzquierdoComponent,
    HardSkillsComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    NewExperienciaComponent,
    EditExperienciaComponent,
    NewHardSkillsComponent,
    NewEducacionComponent,
    NewProyectosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
