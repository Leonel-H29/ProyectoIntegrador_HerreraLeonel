import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { EditHardSkillsComponent } from './components/hard-skills/edit-hard-skills.component';
import { EditProyectosComponent } from './components/proyectos/edit-proyectos.component';
import { NewProyectosComponent } from './components/proyectos/new-proyectos.component';
import { NewEducacionComponent } from './components/educacion/new-educacion.component';
import { NewHardSkillsComponent } from './components/hard-skills/new-hard-skills.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'createexp/:id', component: NewExperienciaComponent },
  { path: 'editexp/:id', component: EditExperienciaComponent },
  { path: 'createhs/:id', component: NewHardSkillsComponent },
  { path: 'createedu/:id', component: NewEducacionComponent },
  { path: 'createproy/:id', component: NewProyectosComponent },
  { path: 'editproy/:idper/:idproy', component: EditProyectosComponent },
  { path: 'ediths/:idper/:idhs', component: EditHardSkillsComponent },
  { path: 'editedu/:idper/:idedu', component: EditEducacionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
