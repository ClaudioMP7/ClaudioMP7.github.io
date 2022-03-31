import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router'
import { MaterialExampleModule } from '../material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { InputClearableComponent } from './components/input-clearable/input-clearable.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { IforgotCardComponent } from './components/iforgot-card/iforgot-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContainerComponent } from './components/container/container.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';




const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'recovery', component: IforgotCardComponent},
  {path: 'panel', component: ContainerComponent},
  {path: 'perfil',  component: PerfilComponent},
  {path: 'usuarios', component: UsuariosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginCardComponent,
    LoginComponent,
    InputClearableComponent,
    InputPasswordComponent,
    IforgotCardComponent,
    NavbarComponent,
    ContainerComponent,
    UsuariosComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent,InputClearableComponent, IforgotCardComponent]
})
export class AppModule { }
