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
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ListaBitacorasComponent } from './components/Bitacoras/lista-bitacoras/lista-bitacoras.component';
import { BitacoraDetallesComponent } from './components/Bitacoras/bitacora-detalles/bitacora-detalles.component';
import { CrearBitacoraComponent } from './components/Bitacoras/crear-bitacora/crear-bitacora.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { UbicacionesComponent } from './components/ubicaciones/ubicaciones.component';
import { CrearEspecialidadComponent } from './components/crear-especialidad/crear-especialidad.component';
import { CrearUbicacionComponent } from './components/crear-ubicacion/crear-ubicacion.component';
import { DetalleEspecialidadComponent } from './components/detalle-especialidad/detalle-especialidad.component';
import { DetalleUbicacionComponent } from './components/detalle-ubicacion/detalle-ubicacion.component';
import { ListaObrasComponent } from './components/Obras/lista-obras/lista-obras.component';
import { CrearObraComponent } from './components/Obras/crear-obra/crear-obra.component';
import { DetalleObraComponent } from './components/Obras/detalle-obra/detalle-obra.component';
import { TestComponent } from './components/test/test.component';
import { InvolucradosComponent } from './components/involucrados/involucrados.component';
import { AgregarInvolucradoComponent } from './components/agregar-involucrado/agregar-involucrado.component';
import { ListadoNotasComponent } from './components/Notas/listado-notas/listado-notas.component';
import { CrearNotaComponent } from './components/Notas/crear-nota/crear-nota.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: IforgotCardComponent},
  {path: 'perfil',  component: PerfilComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'crearUsuario', component: CrearUsuarioComponent},
  {path: 'cambiarPassword', component: CambiarPasswordComponent},
  {path: 'bitacoras', component:ListaBitacorasComponent},
  {path: 'crear-bitacora', component: CrearBitacoraComponent},
  {path: 'detalle-bitacora', component: BitacoraDetallesComponent},
  {path: 'especialidades', component: EspecialidadesComponent},
  {path: 'ubicaciones', component: UbicacionesComponent},
  {path: 'obras', component: ListaObrasComponent},
  {path: 'crearObra', component: CrearObraComponent},
  {path: 'test', component: TestComponent},
  {path: 'agregar-involucrados', component: AgregarInvolucradoComponent}
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
    UsuariosComponent,
    PerfilComponent,
    CrearUsuarioComponent,
    CambiarPasswordComponent,
    UserDetailsComponent,
    ListaBitacorasComponent,
    BitacoraDetallesComponent,
    CrearBitacoraComponent,
    EspecialidadesComponent,
    UbicacionesComponent,
    CrearEspecialidadComponent,
    CrearUbicacionComponent,
    DetalleEspecialidadComponent,
    DetalleUbicacionComponent,
    ListaObrasComponent,
    CrearObraComponent,
    DetalleObraComponent,
    TestComponent,
    InvolucradosComponent,
    AgregarInvolucradoComponent,
    ListadoNotasComponent,
    CrearNotaComponent,
    PruebaComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
