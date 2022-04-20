import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UsuariosService, Rol, responseRol } from '../../Services/usuarios.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  value = '';
  user: User={
    idUsuario:'',
    nombre:'',
    apellidos:'',
    correo:'',
    celular:'',
    password:'',
    nombreRol:''
  };

  public optionRoles = 'Rol del usuario'

  rolesResponse!: responseRol;
  listaRoles!: Rol[];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private UsuariosService:UsuariosService, private router:Router, private _snackBar: MatSnackBar) { }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }

  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(){
    this.UsuariosService.getRoles().subscribe(
      res=>{
        this.rolesResponse = <any>res;
        this.listaRoles = this.rolesResponse.data!;
      },
      err=>{
        console.log(err)
      }
    );
  }

  crearUsuario(){
    delete this.user.idUsuario;
    this.UsuariosService.addUser(this.user).subscribe(
      res=>{
        console.log(res)
        this.openSnackBar("Usuario Agregado", "Ok");
      },
      err=>console.log(err)
    );
  }

}
