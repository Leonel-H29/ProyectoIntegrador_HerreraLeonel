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
import { EditProyectosComponent } from './components/proyectos/edit-proyectos.component';
import { EditHardSkillsComponent } from './components/hard-skills/edit-hard-skills.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditUserComponent } from './components/settings/edit-user/edit-user.component';
import { NewUserComponent } from './components/login/new-user/new-user.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AsideComponent } from './components/aside/aside.component';
import { EditPersonaComponent } from './components/settings/edit-persona/edit-persona.component';
import { AboutOfComponent } from './components/home/about-of/about-of.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from './components/settings/delete-user/delete-user.component';
import { RetrievePassComponent } from './components/login/retrieve-pass/retrieve-pass.component';
import { RedesComponent } from './components/header/derecho/redes/redes.component';
import { EditRedesComponent } from './components/settings/edit-redes/edit-redes.component';

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
    EditProyectosComponent,
    EditHardSkillsComponent,
    EditEducacionComponent,
    SettingsComponent,
    EditUserComponent,
    NewUserComponent,
    AsideComponent,
    EditPersonaComponent,
    AboutOfComponent,
    DeleteUserComponent,
    RetrievePassComponent,
    RedesComponent,
    EditRedesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
