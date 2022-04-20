import { Component, OnInit } from '@angular/core';
import { User, UsuariosService, ListUsersResponse } from '../../Services/usuarios.service';
import { Involucrado, BitacorasService } from 'src/app/Services/bitacoras.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-involucrado',
  templateUrl: './agregar-involucrado.component.html',
  styleUrls: ['./agregar-involucrado.component.css']
})
export class AgregarInvolucradoComponent implements OnInit {
  permisos: FormGroup;
  usuariosResponse!:ListUsersResponse;
  listaUsuarios!: User[]
  involucrado:Involucrado={
    idBitacora:'',
    idUsuario:'',
    notificaciones:'',
    firma:''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( private _snackBar: MatSnackBar, private bitacorasService:BitacorasService , private usuariosService:UsuariosService, private fb:FormBuilder) {
    
    this.involucrado.idBitacora = sessionStorage.getItem("idBitacora")!
    this.permisos = fb.group({
      notificaciones:false,
      firma:false
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuariosResponse = <any>res;
        this.listaUsuarios = this.usuariosResponse.data!;
        console.log(this.listaUsuarios)
      },
      err=>{
        console.log(err)
      }
    );
  }

  agregarInvolucrado(){
    this.permisos.value.notificaciones ? this.involucrado.notificaciones = "1":this.involucrado.notificaciones = "0";
    this.permisos.value.firma ? this.involucrado.firma = "1":this.involucrado.firma = "0";
    this.bitacorasService.addInvolucrado(this.involucrado).subscribe(
      res=>{
        this.openSnackBar("Involucrado Agregado", "Ok");
      },
      err=>console.log(err)
    )
    
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }
}
